import { Room } from './src/models/Room';
import sequelize from './src/config/database';

const fixPaths = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB Connected');

        const rooms = await Room.findAll();
        for (const room of rooms) {
            let changed = false;
            const newImages = room.images.map(img => {
                if (img.includes('\\')) {
                    console.log(`Fixing path for room ${room.name}: ${img}`);
                    changed = true;
                    return img.replace(/\\/g, '/');
                }
                return img;
            });

            if (changed) {
                room.images = newImages;
                await room.save();
                console.log(`Updated room ${room.name}`);
            }
        }
        console.log('Done');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
};

fixPaths();
