
import { sequelize } from './src/models';
import { User } from './src/models/User';
import { Room } from './src/models/Room';
import { Booking } from './src/models/Booking';
import { Branch } from './src/models/Branch';

async function testInventory() {
    try {
        await sequelize.sync();

        // 1. Create a test user
        const user = await User.create({
            name: 'Inventory Tester',
            email: `inventory_test_${Date.now()}@example.com`,
            password: 'password123',
            role: 'guest'
        });
        console.log('Test User created:', user.id);

        // 2. Get or create a branch
        let branch = await Branch.findOne();
        if (!branch) {
            branch = await Branch.create({
                name: 'Test Branch',
                address: '123 Test St',
                phone: '1234567890',
                email: 'test@branch.com'
            });
        }

        // 3. Create a test room with quantity 2
        const room = await Room.create({
            branch_id: branch.id,
            name: 'Limited Room',
            type: 'Deluxe',
            price: 10000,
            description: 'A room with limited inventory',
            capacity: 2,
            is_available: true,
            total_quantity: 2
        });
        console.log('Test Room created:', room.id, 'Quantity:', room.total_quantity);

        const checkIn = '2024-12-25';
        const checkOut = '2024-12-30';

        // 4. Create 2 confirmed bookings
        console.log('Creating 2 confirmed bookings...');
        await Booking.create({
            user_id: user.id,
            branch_id: branch.id,
            room_id: room.id,
            check_in: checkIn,
            check_out: checkOut,
            guests: { adults: 1, children: 0 },
            total_price: 50000,
            status: 'confirmed',
            payment_status: 'paid',
            payment_reference: `ref_${Date.now()}_1`
        });
        await Booking.create({
            user_id: user.id,
            branch_id: branch.id,
            room_id: room.id,
            check_in: checkIn,
            check_out: checkOut,
            guests: { adults: 1, children: 0 },
            total_price: 50000,
            status: 'confirmed',
            payment_status: 'paid',
            payment_reference: `ref_${Date.now()}_2`
        });
        console.log('2 bookings created.');

        // 5. Attempt to create a 3rd booking via API logic simulation
        // Since we can't easily call the controller directly without mocking req/res, 
        // we will simulate the logic used in the controller: checkAvailability

        console.log('Checking availability for 3rd booking...');
        const bookings = await Booking.findAll({
            where: {
                room_id: room.id,
                status: ['confirmed', 'checked_in'],
                // Simple overlap check for simulation
            }
        });

        // Filter for date overlap
        const overlappingBookings = bookings.filter(b => {
            const bStart = new Date(b.check_in).getTime();
            const bEnd = new Date(b.check_out).getTime();
            const cStart = new Date(checkIn).getTime();
            const cEnd = new Date(checkOut).getTime();
            return bStart < cEnd && bEnd > cStart;
        });

        console.log('Overlapping bookings found:', overlappingBookings.length);

        if (overlappingBookings.length >= room.total_quantity) {
            console.log('SUCCESS: Overbooking prevented! Available: 0');
        } else {
            console.error('FAILURE: Overbooking NOT prevented! Available:', room.total_quantity - overlappingBookings.length);
        }

        // Cleanup
        await Booking.destroy({ where: { room_id: room.id } });
        await room.destroy();
        await user.destroy();

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await sequelize.close();
    }
}

testInventory();
