import { Room } from './src/models/Room';
import sequelize from './src/config/database';

const testUpdate = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connected');

        // Find a room
        const room = await Room.findOne();
        if (!room) {
            console.log('No rooms found');
            return;
        }

        console.log('Original images:', room.images);

        const newImages = ['/uploads/test-image-' + Date.now() + '.jpg'];

        // Simulate update using save()
        room.images = newImages;
        await room.save();
        console.log('Saved using room.save()');

        // Verify
        const updatedRoom = await Room.findByPk(room.id);
        console.log('Updated images:', updatedRoom?.images);

        if (JSON.stringify(updatedRoom?.images) === JSON.stringify(newImages)) {
            console.log('Update SUCCESS');
        } else {
            console.log('Update FAILED');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
};

testUpdate();
