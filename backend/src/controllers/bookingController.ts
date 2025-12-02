import { Request, Response } from 'express';
import fs from 'fs';
import { Booking } from '../models/Booking';

export const getBookings = async (req: Request, res: Response): Promise<void> => {
    try {
        const { branchId, userId } = req.query;
        const whereClause: any = {};
        if (branchId) whereClause.branch_id = branchId;
        if (userId) whereClause.user_id = userId;

        const bookings = await Booking.findAll({
            where: whereClause,
            include: [{
                model: (await import('../models/User')).User,
                attributes: ['name', 'email', 'phone']
            }]
        });
        res.json(bookings);
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getBookingById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByPk(id, {
            include: [{
                model: (await import('../models/User')).User,
                attributes: ['name', 'email', 'phone']
            }]
        });
        if (!booking) {
            res.status(404).json({ message: 'Booking not found' });
            return;
        }
        res.json(booking);
    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



import { emailService } from '../services/EmailService';
import { Room } from '../models/Room';

export const createBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const { payment_status, payment_reference, ...bookingData } = req.body;

        // Determine initial status based on payment
        // If paid (Paystack), status is confirmed. If pending (Pay at Hotel), status is pending.
        const initialStatus = payment_status === 'paid' ? 'confirmed' : 'pending';

        // Check availability if the booking is going to be confirmed immediately
        // OR even if pending? User said "only confirmed blocks".
        // BUT if I create a confirmed booking, I must check availability.
        // If I create a pending booking, I don't strictly need to check, but it's good practice to warn?
        // User said: "only when the status of a room is 'comfirmed' that it becomes unavailble".
        // So pending bookings don't count against the limit.
        // However, if *this* booking is confirmed, we must check if there is space.

        if (initialStatus === 'confirmed') {
            const room = await Room.findByPk(bookingData.room_id);
            if (!room) {
                res.status(404).json({ message: 'Room not found' });
                return;
            }

            const { Op } = require('sequelize');
            const confirmedBookingsCount = await Booking.count({
                where: {
                    room_id: bookingData.room_id,
                    status: 'confirmed',
                    [Op.or]: [
                        {
                            check_in: {
                                [Op.lt]: bookingData.check_out
                            },
                            check_out: {
                                [Op.gt]: bookingData.check_in
                            }
                        }
                    ]
                }
            });

            if (confirmedBookingsCount >= room.total_quantity) {
                res.status(400).json({ message: 'Room is not available for the selected dates' });
                return;
            }
        }

        const booking = await Booking.create({
            ...bookingData,
            status: initialStatus,
            payment_status: payment_status || 'pending',
            payment_reference: payment_reference || null,
            guest_name: bookingData.guest_name || null,
            guest_email: bookingData.guest_email || null,
            guest_phone: bookingData.guest_phone || null
        });

        // Fetch room details for email
        const room = await Room.findByPk(booking.room_id);
        const bookingDetails = {
            id: booking.id,
            checkIn: booking.check_in,
            checkOut: booking.check_out,
            totalPrice: booking.total_price,
            roomName: room?.name || 'Room'
        };

        // Get user email (either from logged in user or guest info if we had it, 
        // but currently booking model links to user_id. We might need to fetch user or pass email in body)
        // Assuming req.body might have guest email or we fetch user.
        // For now, let's assume we need to fetch the user to get the email if not provided.
        // However, the frontend passes user_id. Let's fetch the user.
        // Actually, let's look at how we can get the email. 
        // The frontend sends user_id. We can fetch the user.
        // OR, we can pass the email in the request body from the frontend for convenience.
        // Let's fetch the user to be safe and consistent.

        // Wait, the frontend sends `user_id`.
        const user = await import('../models/User').then(m => m.User.findByPk(booking.user_id));

        if (user && user.email) {
            if (initialStatus === 'confirmed') {
                await emailService.sendBookingConfirmationEmail(user.email, bookingDetails);
            } else {
                await emailService.sendBookingReceivedEmail(user.email, bookingDetails);
            }
        }

        res.status(201).json(booking);
    } catch (error: any) {
        console.error('Create booking error:', error);
        fs.writeFileSync('backend_error.log', `Create Booking Error: ${JSON.stringify(error, Object.getOwnPropertyNames(error), 2)}`);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Check previous status to see if it changed to confirmed
        const previousBooking = await Booking.findByPk(id);

        if (status === 'confirmed' && previousBooking?.status !== 'confirmed') {
            const room = await Room.findByPk(previousBooking?.room_id);
            if (room) {
                const { Op } = require('sequelize');
                const confirmedBookingsCount = await Booking.count({
                    where: {
                        room_id: room.id,
                        status: 'confirmed',
                        id: { [Op.ne]: id }, // Exclude current booking
                        [Op.or]: [
                            {
                                check_in: {
                                    [Op.lt]: previousBooking?.check_out
                                },
                                check_out: {
                                    [Op.gt]: previousBooking?.check_in
                                }
                            }
                        ]
                    }
                });

                if (confirmedBookingsCount >= room.total_quantity) {
                    res.status(400).json({ message: 'Cannot confirm booking: Room is fully booked for these dates' });
                    return;
                }
            }
        }

        const [updated] = await Booking.update(req.body, { where: { id } });

        if (updated) {
            const updatedBooking = await Booking.findByPk(id);

            // Trigger email if status changed to confirmed
            if (previousBooking?.status !== 'confirmed' && updatedBooking?.status === 'confirmed') {
                const room = await Room.findByPk(updatedBooking.room_id);
                const user = await import('../models/User').then(m => m.User.findByPk(updatedBooking.user_id));

                if (user && user.email) {
                    const bookingDetails = {
                        id: updatedBooking.id,
                        checkIn: updatedBooking.check_in,
                        checkOut: updatedBooking.check_out,
                        totalPrice: updatedBooking.total_price,
                        roomName: room?.name || 'Room'
                    };
                    await emailService.sendBookingConfirmationEmail(user.email, bookingDetails);
                }
            }

            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        console.error('Update booking error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deleted = await Booking.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        console.error('Delete booking error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
