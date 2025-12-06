import sequelize from './config/database';
import { Room } from './models/Room';

const checkRoomImage = async () => {
    try {
        const room = await Room.findOne({ where: { name: 'Phoenix Deluxe' } });
        if (room) {
            console.log('Room found:', room.name);
            console.log('Images:', room.images);
        } else {
            console.log('Room "Phoenix Deluxe" not found.');
        }
    } catch (error) {
        console.error('Error fetching room:', error);
    } finally {
        await sequelize.close();
    }
};

checkRoomImage();
