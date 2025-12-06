import axios from 'axios';
import { Room } from './src/models/Room';
import sequelize from './src/config/database';
import fs from 'fs';
import path from 'path';

const log = (msg: string) => {
    console.log(msg);
    fs.appendFileSync('debug_output.txt', msg + '\n');
};

const testImageServe = async () => {
    try {
        if (fs.existsSync('debug_output.txt')) fs.unlinkSync('debug_output.txt');

        await sequelize.authenticate();
        log('DB Connected');

        const room = await Room.findOne({ where: { name: 'Phoenix Deluxe' } });
        if (!room) {
            log('Room not found');
            return;
        }

        let images = room.images;
        log(`Room Images Type: ${typeof images}`);
        log(`Room Images Value (Raw): ${JSON.stringify(images)}`);

        // Force parse if string
        if (typeof images === 'string') {
            try {
                // If it's a string, it might be "[\"/path\"]" (stringified array)
                // or just "/path" (if bad data)
                const parsed = JSON.parse(images);
                log(`Parsed result: ${JSON.stringify(parsed)}`);

                if (Array.isArray(parsed)) {
                    images = parsed;
                } else {
                    // unexpected
                    log('Parsed string is not an array');
                }
            } catch (e) {
                log('Failed to parse string');
            }
        }

        if (!Array.isArray(images) || images.length === 0) {
            log('Images is acceptable array or empty');
            return;
        }

        let firstImage = images[0];
        log(`First Image (Initial): ${firstImage}`);

        // Double check for double-serialization inside array
        // e.g. ["[\"/path\"]"]
        if (typeof firstImage === 'string' && firstImage.startsWith('[')) {
            try {
                const inner = JSON.parse(firstImage);
                if (Array.isArray(inner) && inner.length > 0) {
                    firstImage = inner[0];
                    log(`Double parsed first image: ${firstImage}`);
                }
            } catch (e) {
                // ignore
            }
        }

        if (typeof firstImage !== 'string') {
            log('First image is not a string path');
            return;
        }

        // Clean path
        const cleanPath = firstImage.replace(/[\[\]"]/g, '');
        log(`Clean URI: ${cleanPath}`);

        const url = `http://localhost:5000${cleanPath}`;
        log(`Testing HTTP GET: ${url}`);

        try {
            const response = await axios.get(url);
            log(`HTTP Response Status: ${response.status}`);
            log(`HTTP Content-Type: ${response.headers['content-type']}`);
            log('SUCCESS: Image is serving via HTTP');
        } catch (error: any) {
            log(`HTTP Request Failed: ${error.message}`);
            if (error.response) {
                log(`Response status: ${error.response.status}`);
            }
        }

    } catch (error) {
        log(`Result Error: ${error}`);
    } finally {
        process.exit();
    }
};

testImageServe();
