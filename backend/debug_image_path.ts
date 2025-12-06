import { Room } from './src/models/Room';
import sequelize from './src/config/database';
import fs from 'fs';
import path from 'path';

const debugImage = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB Connected');

        const room = await Room.findOne({ where: { name: 'Phoenix Deluxe' } });
        if (!room) {
            console.log('Room "Phoenix Deluxe" not found');
            return;
        }

        console.log('Room ID:', room.id);
        console.log('Images (Raw):', room.getDataValue('images'));
        console.log('Images (JSON):', JSON.stringify(room.images, null, 2));

        if (room.images && room.images.length > 0) {
            const imagePath = room.images[0];
            console.log('Checking file for path:', JSON.stringify(imagePath));

            // Assuming path starts with /uploads/
            const filename = path.basename(imagePath);
            const localPath = path.join(__dirname, 'uploads', filename);

            console.log('Looking for file at:', localPath);
            if (fs.existsSync(localPath)) {
                console.log('FILE EXISTS');
                const stats = fs.statSync(localPath);
                console.log('File size:', stats.size);
            } else {
                console.log('FILE DOES NOT EXIST');

                // List files in uploads to see what's there
                console.log('Files in uploads directory:');
                const uploadsDir = path.join(__dirname, 'uploads');
                if (fs.existsSync(uploadsDir)) {
                    const files = fs.readdirSync(uploadsDir);
                    files.forEach(f => console.log(' -', f));
                } else {
                    console.log('Uploads directory does not exist!');
                }
            }
        } else {
            console.log('No images array in DB');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
};

debugImage();
