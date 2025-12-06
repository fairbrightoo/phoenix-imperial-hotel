import sequelize from './config/database';

const addColumns = async () => {
    try {
        await sequelize.query("ALTER TABLE bookings ADD COLUMN guest_name VARCHAR(255) NULL;");
        console.log("Added guest_name");
    } catch (e: any) { console.log("guest_name might already exist or error:", e.message); }

    try {
        await sequelize.query("ALTER TABLE bookings ADD COLUMN guest_email VARCHAR(255) NULL;");
        console.log("Added guest_email");
    } catch (e: any) { console.log("guest_email might already exist or error:", e.message); }

    try {
        await sequelize.query("ALTER TABLE bookings ADD COLUMN guest_phone VARCHAR(255) NULL;");
        console.log("Added guest_phone");
    } catch (e: any) { console.log("guest_phone might already exist or error:", e.message); }

    process.exit(0);
};

addColumns();
