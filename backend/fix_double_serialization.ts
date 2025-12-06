import { Room } from './src/models/Room';
import sequelize from './src/config/database';

const fixSerialization = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB Connected');

        const rooms = await Room.findAll();
        for (const room of rooms) {
            let images = room.images;
            let changed = false;

            console.log(`Checking room ${room.name} (${room.id})`);
            console.log(`Current images type: ${typeof images}`);
            console.log(`Current images value: ${JSON.stringify(images)}`);

            // If it's a string, try to parse it
            if (typeof images === 'string') {
                try {
                    const parsed = JSON.parse(images);
                    console.log('Parsed successfully:', parsed);

                    if (Array.isArray(parsed)) {
                        // Check if it's STILL a string inside (triple serialization??)
                        // e.g. ["[\"/path\"]"]
                        if (parsed.length > 0 && typeof parsed[0] === 'string' && parsed[0].startsWith('[')) {
                            try {
                                const doubleParsed = JSON.parse(parsed[0]);
                                if (Array.isArray(doubleParsed)) {
                                    console.log('Double parsed!', doubleParsed);
                                    room.images = doubleParsed;
                                    changed = true;
                                } else {
                                    room.images = parsed;
                                    changed = true;
                                }
                            } catch (e) {
                                room.images = parsed;
                                changed = true;
                            }
                        } else {
                            room.images = parsed;
                            changed = true;
                        }
                    } else {
                        console.log('Parsed value is not an array');
                    }
                } catch (e) {
                    console.error('Failed to parse JSON string:', e);
                }
            } else if (Array.isArray(images)) {
                // Check if it contains a string that looks like a path but has brackets?
                // No, standard array is fine.
                console.log('Already an array');
            }

            if (changed) {
                // Use direct update
                await Room.update({ images: room.images }, { where: { id: room.id } });
                console.log(`Updated room ${room.name} via Room.update`);

                // Verify immediate read
                const check = await Room.findByPk(room.id);
                console.log(`Verification - Type: ${typeof check?.images}, Value: ${JSON.stringify(check?.images)}`);
            }
        }
        console.log('Done');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
};

fixSerialization();
