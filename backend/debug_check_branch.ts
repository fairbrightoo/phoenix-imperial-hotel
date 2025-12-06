
import { Branch } from './src/models/Branch';
import sequelize from './src/config/database';

async function checkBranch() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const branches = await Branch.findAll();
        const enugu = branches.find(b => b.name.includes('Enugu') || b.city.includes('Enugu'));

        if (enugu) {
            console.log('Found Enugu Branch:');
            console.log(JSON.stringify(enugu.toJSON(), null, 2));
        } else {
            console.log('Enugu branch not found.');
            branches.forEach(b => console.log(`- ${b.name} (${b.city})`));
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

checkBranch();
