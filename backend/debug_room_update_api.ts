import axios from 'axios';
import { Room } from './src/models/Room';
import sequelize from './src/config/database';

const testApiUpdate = async () => {
    try {
        await sequelize.authenticate();

        // Get a room ID
        const room = await Room.findOne();
        if (!room) {
            console.log('No room found');
            return;
        }

        console.log('Testing update for room:', room.id);
        console.log('Current images:', room.images);

        const newImageUrl = `/uploads/debug-api-${Date.now()}.jpg`;
        const payload = {
            ...room.toJSON(),
            images: [newImageUrl]
        };

        // Send PUT request
        try {
            const response = await axios.put(`http://localhost:5000/api/rooms/${room.id}`, payload);
            console.log('API Response Status:', response.status);
            console.log('API Response Images:', response.data.images);

            if (response.data.images && response.data.images[0] === newImageUrl) {
                console.log('SUCCESS: API returned updated image');
            } else {
                console.log('FAILURE: API did not return updated image');
            }

        } catch (apiError: any) {
            console.error('API Error:', apiError.message);
            if (apiError.response) {
                console.error('API Response Data:', apiError.response.data);
            }
        }

        // Verify in DB
        const reloadedRoom = await Room.findByPk(room.id);
        console.log('DB Images after update:', reloadedRoom?.images);

    } catch (error) {
        console.error('Script Error:', error);
    }
};

testApiUpdate();
