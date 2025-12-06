import sequelize from './src/config/database';
import { User } from './src/models/User';

const checkStatus = async () => {
    try {
        console.log('Testing database connection...');
        await sequelize.authenticate();
        console.log('Database connection successful.');

        console.log('Checking for admin user...');
        const user = await User.findOne({
            where: { email: 'abuja.admin@phoeniximperial.com' }
        });

        if (user) {
            console.log('User found:', user.toJSON());
            console.log('User status:', user.status);
        } else {
            console.log('User NOT found.');
        }

        process.exit(0);
    } catch (error: any) {
        console.error('Check failed:', error.message);
        if (error.original) {
            console.error('Original error:', error.original);
        }
        process.exit(1);
    }
};

checkStatus();
