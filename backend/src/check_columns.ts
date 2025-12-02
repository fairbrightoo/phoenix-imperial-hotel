import sequelize from './config/database';

const checkColumns = async () => {
    try {
        const table = await sequelize.getQueryInterface().describeTable('bookings');
        console.log('Columns:', Object.keys(table));
    } catch (e) {
        console.error('Error:', e);
    }
    process.exit(0);
};

checkColumns();
