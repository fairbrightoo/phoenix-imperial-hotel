import { Branch } from './models/Branch';
import { User } from './models/User';
import sequelize from './config/database';

async function debugData() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const branches = await Branch.findAll();
        const emptyBranchIds = branches.filter(b => b.id === '');
        console.log(`Total Branches: ${branches.length}`);
        if (emptyBranchIds.length > 0) {
            console.error('CRITICAL: Found branches with empty ID:', emptyBranchIds.length);
            emptyBranchIds.forEach(b => console.log('Empty Branch:', b.toJSON()));
        } else {
            console.log('No branches with empty ID found.');
        }

        const users = await User.findAll();
        const emptyUserIds = users.filter(u => u.id === '');
        console.log(`Total Users: ${users.length}`);
        if (emptyUserIds.length > 0) {
            console.error('CRITICAL: Found users with empty ID:', emptyUserIds.length);
            emptyUserIds.forEach(u => console.log('Empty User:', u.toJSON()));
        } else {
            console.log('No users with empty ID found.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

debugData();
