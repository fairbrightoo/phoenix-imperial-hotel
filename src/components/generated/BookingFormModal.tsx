import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, CreditCard, BedDouble } from 'lucide-react';
import { Room } from './types';

const bookingSchema = z.object({
    guestName: z.string().min(1, 'Guest name is required'),
    guestEmail: z.string().email('Invalid email address'),
    roomId: z.string().min(1, 'Room selection is required'),
    checkIn: z.string().min(1, 'Check-in date is required'),
    checkOut: z.string().min(1, 'Check-out date is required'),
    adults: z.coerce.number().min(1, 'At least 1 adult required'),
    children: z.coerce.number().min(0, 'Cannot be negative'),
    status: z.enum(['confirmed', 'pending', 'cancelled', 'completed']),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: BookingFormData) => void;
    rooms: Room[];
}

export const BookingFormModal: React.FC<BookingFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    rooms
}) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema) as any,
        defaultValues: {
            guestName: '',
            guestEmail: '',
            roomId: '',
            checkIn: '',
            checkOut: '',
            adults: 1,
            children: 0,
            status: 'confirmed',
        },
    });

    const selectedRoomId = watch('roomId');
    const checkInDate = watch('checkIn');
    const checkOutDate = watch('checkOut');

    // Calculate total price
    const selectedRoom = rooms.find(r => r.id === selectedRoomId);
    const totalPrice = React.useMemo(() => {
        if (!selectedRoom || !checkInDate || !checkOutDate) return 0;

        const start = new Date(checkInDate);
        const end = new Date(checkOutDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? diffDays * selectedRoom.price : 0;
    }, [selectedRoom, checkInDate, checkOutDate]);

    useEffect(() => {
        if (isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
                >
                    <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
                        <h2 className="text-xl font-serif text-white">Create New Booking</h2>
                        <button
                            onClick={onClose}
                            className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-full"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                        {/* Guest Details */}
                        <div className="space-y-4">
                            <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-medium flex items-center gap-2">
                                <User size={16} /> Guest Details
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-1">Guest Name</label>
                                    <input
                                        {...register('guestName')}
                                        className="w-full bg-zinc-800 border border-zinc-700 text-white rounded px-3 py-2 focus:outline-none focus:border-amber-500"
                                        placeholder="John Doe"
                                    />
                                    {errors.guestName && <p className="text-red-400 text-xs mt-1">{errors.guestName.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-1">Email Address</label>
                                    <input
                                        {...register('guestEmail')}
                                        type="email"
                                        className="w-full bg-zinc-800 border border-zinc-700 text-white rounded px-3 py-2 focus:outline-none focus:border-amber-500"
                                        placeholder="john@example.com"
                                    />
                                    {errors.guestEmail && <p className="text-red-400 text-xs mt-1">{errors.guestEmail.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Room & Dates */}
                        <div className="space-y-4">
                            <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-medium flex items-center gap-2">
                                <BedDouble size={16} /> Room & Dates
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-1">Select Room</label>
                                    <select
                                        {...register('roomId')}
                                        className="w-full bg-zinc-800 border border-zinc-700 text-white rounded px-3 py-2 focus:outline-none focus:border-amber-500"
                                    >
                                        <option value="">Select a room...</option>
                                        {rooms.map(room => (
                                            <option key={room.id} value={room.id}>
                                                {room.name} ({room.type}) - ₦{room.price.toLocaleString()}/night
                                            </option>
                                        ))}
                                    </select>
                                    {errors.roomId && <p className="text-red-400 text-xs mt-1">{errors.roomId.message}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-1">Check In</label>
                                        <input
                                            {...register('checkIn')}
                                            type="date"
                                            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded px-3 py-2 focus:outline-none focus:border-amber-500"
                                        />
                                        {errors.checkIn && <p className="text-red-400 text-xs mt-1">{errors.checkIn.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-1">Check Out</label>
                                        <input
                                            {...register('checkOut')}
                                            type="date"
                                            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded px-3 py-2 focus:outline-none focus:border-amber-500"
                                        />
                                        {errors.checkOut && <p className="text-red-400 text-xs mt-1">{errors.checkOut.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Guests & Status */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-medium flex items-center gap-2">
                                    <User size={16} /> Occupancy
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-1">Adults</label>
                                        <input
                                            {...register('adults')}
                                            type="number"
                                            min="1"
                                            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded px-3 py-2 focus:outline-none focus:border-amber-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-1">Children</label>
                                        <input
                                            {...register('children')}
                                            type="number"
                                            min="0"
                                            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded px-3 py-2 focus:outline-none focus:border-amber-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-medium flex items-center gap-2">
                                    <CreditCard size={16} /> Payment & Status
                                </h3>
                                <div>
                                    <label className="block text-sm text-zinc-400 mb-1">Booking Status</label>
                                    <select
                                        {...register('status')}
                                        className="w-full bg-zinc-800 border border-zinc-700 text-white rounded px-3 py-2 focus:outline-none focus:border-amber-500"
                                    >
                                        <option value="confirmed">Confirmed</option>
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Total Price Summary */}
                        <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-800 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-zinc-400">Estimated Total</p>
                                <p className="text-xs text-zinc-500">Based on {selectedRoom?.price.toLocaleString() || 0} x nights</p>
                            </div>
                            <p className="text-2xl font-serif text-amber-500">₦{totalPrice.toLocaleString()}</p>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded transition-colors text-sm font-medium disabled:opacity-50"
                            >
                                {isSubmitting ? 'Creating...' : 'Create Booking'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
