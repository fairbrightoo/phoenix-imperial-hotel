
import sequelize from './src/config/database';
import { Branch } from './src/models/Branch';

const checkBranches = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const branches = await Branch.findAll();
        console.log(`Found ${branches.length} branches.`);
        branches.forEach(b => {
            console.log(`- ${b.name} (${b.id}) Status: ${b.status}`);
        });

    } catch (error) {
        console.error('Error checking branches:', error);
    } finally {
        await sequelize.close();
    }
};

checkBranches();
