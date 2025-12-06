import { Request, Response } from 'express';
import { Room } from '../models/Room';

import { Booking } from '../models/Booking';
import { Op } from 'sequelize';

export const getRooms = async (req: Request, res: Response): Promise<void> => {
    try {
        const { branchId, checkIn, checkOut, category } = req.query;
        const whereClause: any = {};
        if (branchId) whereClause.branch_id = branchId;
        if (category) whereClause.category = category;

        let rooms = await Room.findAll({ where: whereClause });

        // Parse images if needed (workaround for Sequelize/DB type issue)
        rooms.forEach(room => {
            if (typeof room.images === 'string') {
                try {
                    room.images = JSON.parse(room.images);
                } catch (e) {
                    console.error(`Failed to parse images for room ${room.id}:`, e);
                    room.images = [];
                }
            }
        });

        // Calculate availability (default to today->tomorrow if dates not provided)
        const queryCheckIn = checkIn || new Date().toISOString().split('T')[0];
        const queryCheckOut = checkOut || new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
        const availableRooms = [];
        for (const room of rooms) {
            const confirmedBookingsCount = await Booking.count({
                where: {
                    room_id: room.id,
                    status: {
                        [Op.or]: ['confirmed', 'pending']
                    },
                    [Op.or]: [
                        {
                            check_in: {
                                [Op.lt]: queryCheckOut
                            },
                            check_out: {
                                [Op.gt]: queryCheckIn
                            }
                        }
                    ]
                }
            });

            // Always return the room with calculated availability
            const roomData = room.toJSON();
            const availableQty = Math.max(0, room.total_quantity - confirmedBookingsCount);
            (roomData as any).available_quantity = availableQty;

            if (availableQty === 0) {
                // Find the earliest check-out date among the conflicting bookings
                const nextBooking = await Booking.findOne({
                    where: {
                        room_id: room.id,
                        status: {
                            [Op.or]: ['confirmed', 'pending']
                        },
                        [Op.or]: [
                            {
                                check_in: { [Op.lt]: queryCheckOut },
                                check_out: { [Op.gt]: queryCheckIn }
                            }
                        ]
                    },
                    order: [['check_out', 'ASC']],
                    attributes: ['check_out']
                });

                if (nextBooking) {
                    (roomData as any).next_available_date = nextBooking.check_out;
                }
            }

            availableRooms.push(roomData);
        }
        res.json(availableRooms);
    } catch (error) {
        console.error('Get rooms error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getRoomById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const room = await Room.findByPk(id);
        if (!room) {
            res.status(404).json({ message: 'Room not found' });
            return;
        }
        res.json(room);
    } catch (error) {
        console.error('Get room error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const room = await Room.create(req.body);
        res.status(201).json(room);
    } catch (error) {
        console.error('Create room error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const room = await Room.findByPk(id);

        if (!room) {
            res.status(404).json({ message: 'Room not found' });
            return;
        }

        await room.update(req.body);

        // Reload to ensure we get the latest data (especially for JSON fields)
        await room.reload();

        // Manual parse check
        if (typeof room.images === 'string') {
            try {
                room.images = JSON.parse(room.images);
            } catch (e) {
                room.images = [];
            }
        } else if (Array.isArray(room.images) && room.images.length > 0 && typeof room.images[0] === 'string' && room.images[0].startsWith('[')) {
            // Handle double serialization inside array
            try {
                room.images = JSON.parse(room.images[0]);
            } catch (e) {
                // keep as is
            }
        }

        res.json(room);
    } catch (error) {
        console.error('Update room error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deleted = await Room.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        console.error('Delete room error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
