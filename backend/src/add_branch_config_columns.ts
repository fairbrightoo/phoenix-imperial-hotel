import sequelize from './config/database';

async function addBranchConfigColumns() {
    try {
        const queryInterface = sequelize.getQueryInterface();

        // Add description column
        await queryInterface.addColumn('branches', 'description', {
            type: 'TEXT',
            allowNull: true
        });
        console.log('Added description column');

        // Add amenities column
        await queryInterface.addColumn('branches', 'amenities', {
            type: 'JSON',
            allowNull: true
        });
        console.log('Added amenities column');

        // Add images column
        await queryInterface.addColumn('branches', 'images', {
            type: 'JSON',
            allowNull: true
        });
        console.log('Added images column');

        // Add policies column
        await queryInterface.addColumn('branches', 'policies', {
            type: 'JSON',
            allowNull: true
        });
        console.log('Added policies column');

        console.log('All columns added successfully');
    } catch (error) {
        console.error('Error adding columns:', error);
    } finally {
        await sequelize.close();
    }
}

addBranchConfigColumns();
