
import { User } from './models/User';
import sequelize from './config/database';
import bcrypt from 'bcryptjs';

const addLagosAdmin = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password', salt);

        const [user, created] = await User.findOrCreate({
            where: { email: 'lagos.admin@phoeniximperial.com' },
            defaults: {
                id: 'admin-lagos',
                name: 'Lagos Manager',
                phone: '+234 809 765 4321',
                password_hash: hashedPassword,
                role: 'branch_admin',
                branch_id: 'lagos'
            }
        });

        if (created) {
            console.log('Lagos Admin user created successfully.');
        } else {
            console.log('Lagos Admin user already exists.');
        }

    } catch (error) {
        console.error('Error adding Lagos Admin:', error);
    } finally {
        await sequelize.close();
    }
};

addLagosAdmin();
