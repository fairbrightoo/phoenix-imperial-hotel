
import sequelize from './src/config/database';
import { User } from './src/models/User';
import bcrypt from 'bcryptjs';
import process from 'process';

const resetSuperAdminPassword = async () => {
    try {
        const newPassword = process.argv[2];

        if (!newPassword) {
            console.error('Usage: npm run reset-superadmin <new_password>');
            process.exit(1);
        }

        await sequelize.authenticate();
        console.log('Database connected.');

        const superAdmin = await User.findOne({ where: { role: 'super_admin' } });

        if (!superAdmin) {
            console.error('Super Admin user not found.');
            process.exit(1);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        superAdmin.password_hash = hashedPassword;
        await superAdmin.save();

        console.log(`Success: Password for super admin (${superAdmin.email}) has been reset.`);
    } catch (error) {
        console.error('Error resetting password:', error);
    } finally {
        await sequelize.close();
    }
};

resetSuperAdminPassword();
