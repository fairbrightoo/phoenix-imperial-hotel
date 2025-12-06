import sequelize from './config/database';
import { Branch } from './models/Branch';
import { Room } from './models/Room';
import { User } from './models/User';
import { Booking } from './models/Booking';
import bcrypt from 'bcryptjs';

export const seedDatabase = async () => {
    try {
        // Disable foreign key checks to allow dropping tables
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await sequelize.sync({ force: true }); // Reset database
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('Database synced');

        // Seed Branches
        await Branch.bulkCreate([
            {
                id: 'abuja',
                name: 'Phoenix Imperial Abuja',
                city: 'Abuja',
                address: '123 Central Business District, Abuja, Nigeria',
                phone: '+234 809 123 4567',
                email: 'abuja@phoeniximperial.com',
                timezone: 'Africa/Lagos',
                currency: 'NGN',
                status: 'active'
            },
            {
                id: 'lagos',
                name: 'Phoenix Imperial Lagos',
                city: 'Lagos',
                address: 'No 7 Ibiyemi Street off Osolo-Way Ajao Estate Lagos- Nigeria',
                phone: '+234(0)9055551103',
                email: 'lagos@phoeniximperial.com',
                timezone: 'Africa/Lagos',
                currency: 'NGN',
                status: 'active'
            }
        ]);
        console.log('Branches seeded');

        // Seed Rooms & Halls
        // Note: Using generic images for now, user can update later.
        const roomImages = ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop'];
        const hallImages = ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop'];

        const roomsData = [
            // Lagos Rooms
            {
                id: 'lagos-superior',
                branch_id: 'lagos',
                name: 'Superior Room',
                description: 'Comfortable superior room with modern amenities.',
                type: 'superior',
                price: 60000,
                max_guests: 2,
                size: '30m²',
                amenities: ['WiFi', 'AC', 'TV'],
                images: roomImages,
                is_available: true,
                rating: 4.5,
                total_quantity: 10,
                category: 'room'
            },
            {
                id: 'lagos-executive',
                branch_id: 'lagos',
                name: 'Executive Room',
                description: 'Spacious executive room for business travelers.',
                type: 'executive',
                price: 80000,
                max_guests: 2,
                size: '40m²',
                amenities: ['WiFi', 'AC', 'TV', 'Work Desk'],
                images: roomImages,
                is_available: true,
                rating: 4.7,
                total_quantity: 8,
                category: 'room'
            },
            {
                id: 'lagos-deluxe',
                branch_id: 'lagos',
                name: 'Phoenix Deluxe',
                description: 'Luxury deluxe room with premium furnishings.',
                type: 'deluxe',
                price: 90000,
                max_guests: 2,
                size: '50m²',
                amenities: ['WiFi', 'AC', 'TV', 'Mini Bar'],
                images: roomImages,
                is_available: true,
                rating: 4.8,
                total_quantity: 5,
                category: 'room'
            },
            {
                id: 'lagos-suite',
                branch_id: 'lagos',
                name: 'Phoenix Imperial Suite',
                description: 'Our finest suite for the ultimate experience.',
                type: 'suite',
                price: 120000,
                max_guests: 4,
                size: '80m²',
                amenities: ['WiFi', 'AC', 'TV', 'Living Area', 'Kitchenette'],
                images: roomImages,
                is_available: true,
                rating: 5.0,
                total_quantity: 2,
                category: 'room'
            },
            // Lagos Halls
            {
                id: 'lagos-toby-hall',
                branch_id: 'lagos',
                name: 'Toby Hall',
                description: 'Large event hall suitable for weddings and conferences.',
                type: 'hall',
                price: 500000,
                max_guests: 200,
                size: '300m²',
                amenities: ['Projector', 'Sound System', 'AC', 'Chairs', 'Tables'],
                images: hallImages,
                is_available: true,
                rating: 4.8,
                total_quantity: 1,
                category: 'hall'
            },
            {
                id: 'lagos-ikedi-hall',
                branch_id: 'lagos',
                name: 'Ikedi Hall',
                description: 'Medium-sized hall perfect for seminars and parties.',
                type: 'hall',
                price: 400000,
                max_guests: 100,
                size: '200m²',
                amenities: ['Projector', 'Sound System', 'AC', 'Chairs', 'Tables'],
                images: hallImages,
                is_available: true,
                rating: 4.7,
                total_quantity: 1,
                category: 'hall'
            },
            // Abuja Rooms (Replicating same structure for Abuja for consistency, though user didn't specify)
            {
                id: 'abuja-superior',
                branch_id: 'abuja',
                name: 'Superior Room',
                description: 'Comfortable superior room with modern amenities.',
                type: 'superior',
                price: 60000,
                max_guests: 2,
                size: '30m²',
                amenities: ['WiFi', 'AC', 'TV'],
                images: roomImages,
                is_available: true,
                rating: 4.5,
                total_quantity: 10,
                category: 'room'
            },
            {
                id: 'abuja-executive',
                branch_id: 'abuja',
                name: 'Executive Room',
                description: 'Spacious executive room for business travelers.',
                type: 'executive',
                price: 80000,
                max_guests: 2,
                size: '40m²',
                amenities: ['WiFi', 'AC', 'TV', 'Work Desk'],
                images: roomImages,
                is_available: true,
                rating: 4.7,
                total_quantity: 8,
                category: 'room'
            },
            {
                id: 'abuja-deluxe',
                branch_id: 'abuja',
                name: 'Phoenix Deluxe',
                description: 'Luxury deluxe room with premium furnishings.',
                type: 'deluxe',
                price: 90000,
                max_guests: 2,
                size: '50m²',
                amenities: ['WiFi', 'AC', 'TV', 'Mini Bar'],
                images: roomImages,
                is_available: true,
                rating: 4.8,
                total_quantity: 5,
                category: 'room'
            },
            {
                id: 'abuja-suite',
                branch_id: 'abuja',
                name: 'Phoenix Imperial Suite',
                description: 'Our finest suite for the ultimate experience.',
                type: 'suite',
                price: 120000,
                max_guests: 4,
                size: '80m²',
                amenities: ['WiFi', 'AC', 'TV', 'Living Area', 'Kitchenette'],
                images: roomImages,
                is_available: true,
                rating: 5.0,
                total_quantity: 2,
                category: 'room'
            }
        ];

        await Room.bulkCreate(roomsData as any);
        console.log('Rooms and Halls seeded');

        // Seed Users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password', salt);

        await User.bulkCreate([
            {
                id: 'user-1',
                name: 'John Doe',
                email: 'user@phoeniximperial.com',
                phone: '+234 800 000 0000',
                password_hash: hashedPassword,
                role: 'customer'
            },
            {
                id: 'admin-abuja',
                name: 'Abuja Manager',
                email: 'abuja.admin@phoeniximperial.com',
                phone: '+234 809 123 4567',
                password_hash: hashedPassword,
                role: 'branch_admin',
                branch_id: 'abuja'
            },
            {
                id: 'admin-lagos',
                name: 'Lagos Manager',
                email: 'lagos.admin@phoeniximperial.com',
                phone: '+234 809 765 4321',
                password_hash: hashedPassword,
                role: 'branch_admin',
                branch_id: 'lagos'
            },
            {
                id: 'super-admin',
                name: 'System Administrator',
                email: 'superadmin@phoeniximperial.com',
                phone: '+234 800 999 8888',
                password_hash: hashedPassword,
                role: 'super_admin'
            }
        ]);
        console.log('Users seeded');

        console.log('Database seeding completed successfully!');
        // process.exit(0); // REMOVED: Don't kill the server when running as a route
    } catch (error) {
        console.error('Seeding failed:', error);
        // process.exit(1); // REMOVED
        throw error; // Re-throw so controller catches it
    }
};

// Only run if called directly (CLI)
if (require.main === module) {
    seedDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
}
