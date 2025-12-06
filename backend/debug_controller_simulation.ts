
import sequelize from './src/config/database';
import { Branch } from './src/models/Branch';

// Helper from controller
const safeParseJSON = (data: any, fallback: any) => {
    if (typeof data === 'string') {
        try {
            const parsed = JSON.parse(data);
            if (typeof parsed === 'string') {
                return JSON.parse(parsed);
            }
            return parsed;
        } catch (e) {
            return fallback;
        }
    }
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'string' && data[0].startsWith('[')) {
        try {
            return JSON.parse(data[0]);
        } catch (e) {
            return data;
        }
    }
    return data;
};

const simulateGetAllBranches = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const branches = await Branch.findAll();

        const plainBranches = branches.map(b => {
            const branch = b.toJSON() as any;
            try {
                branch.images = safeParseJSON(branch.images, []);
                branch.amenities = safeParseJSON(branch.amenities, []);
                branch.policies = safeParseJSON(branch.policies, { checkIn: '14:00', checkOut: '11:00', cancellation: 'Flexible' });
            } catch (err) {
                console.error(`Error parsing branch ${branch.id}:`, err);
            }
            return branch;
        });

        console.log('Controller would return:', JSON.stringify(plainBranches, null, 2));

    } catch (error) {
        console.error('Simulation error:', error);
    } finally {
        await sequelize.close();
    }
};

simulateGetAllBranches();
