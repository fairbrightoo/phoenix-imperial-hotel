import sequelize from './src/config/database';

console.log('Checking DB connection...');
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        process.exit(0);
    })
    .catch(err => {
        console.error('Unable to connect to the database:');
        console.error(JSON.stringify(err, null, 2));
        if (err.original) {
            console.error('Original error:', err.original);
        }
        process.exit(1);
    });
