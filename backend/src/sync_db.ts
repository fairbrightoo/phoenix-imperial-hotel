import sequelize from './config/database';
import './models/User';
import './models/Branch';
import './models/Room';
import './models/Booking';

console.log('Starting sync...');
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced successfully');
    process.exit(0);
}).catch((err) => {
    console.error('Sync failed:', err);
    process.exit(1);
});
