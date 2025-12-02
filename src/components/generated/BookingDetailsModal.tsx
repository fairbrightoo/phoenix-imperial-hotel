import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, CreditCard, Clock, MessageSquare, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Booking, Room } from './types';

interface BookingDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking | null;
    room: Room | undefined;
    onUpdate?: (bookingId: string, data: Partial<Booking>) => void;
    onCancel: (bookingId: string) => void;
    readOnly?: boolean;
}

export const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
    isOpen,
    onClose,
    booking,
    room,
    onUpdate,
    onCancel,
    readOnly = false
}) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editData, setEditData] = React.useState<Partial<Booking>>({});

    React.useEffect(() => {
        if (booking) {
            setEditData(booking);
        }
    }, [booking]);

    const handleSave = () => {
        if (booking && onUpdate) {
            onUpdate(booking.id, editData);
            setIsEditing(false);
        }
    };

    const handleCancelBooking = () => {
        if (booking) {
            if (window.confirm('Are you sure you want to cancel this booking?')) {
                onCancel(booking.id);
                onClose();
            }
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'text-green-500 bg-green-500';
            case 'pending': return 'text-amber-500 bg-amber-500';
            case 'cancelled': return 'text-red-500 bg-red-500';
            case 'completed': return 'text-blue-500 bg-blue-500';
            default: return 'text-zinc-500 bg-zinc-500';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'confirmed': return <CheckCircle size={16} />;
            case 'pending': return <Clock size={16} />;
            case 'cancelled': return <XCircle size={16} />;
            case 'completed': return <CheckCircle size={16} />;
            default: return <AlertCircle size={16} />;
        }
    };

    return createPortal(
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 modal-backdrop print:hidden"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 0 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden print:hidden"
                        >
                            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
                                <div>
                                    <h2 className="text-xl font-serif text-white">Booking Details</h2>
                                    <p className="text-zinc-500 text-sm">ID: #{booking?.id.slice(-8)}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-full"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 space-y-8 max-h-[80vh] overflow-y-auto">
                                {/* Status Section */}
                                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg border border-zinc-800">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${getStatusColor(isEditing ? (editData.status || booking?.status || 'pending') : (booking?.status || 'pending'))} bg-opacity-10`}>
                                            {getStatusIcon(isEditing ? (editData.status || booking?.status || 'pending') : (booking?.status || 'pending'))}
                                        </div>
                                        <div>
                                            <p className="text-sm text-zinc-400">Status</p>
                                            {isEditing ? (
                                                <select
                                                    value={editData.status}
                                                    onChange={(e) => setEditData({ ...editData, status: e.target.value as any })}
                                                    className="bg-zinc-900 border border-zinc-700 text-white rounded px-2 py-1 text-sm focus:outline-none focus:border-amber-500"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            ) : (
                                                <p className="text-white font-medium capitalize">{booking?.status}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-zinc-400">Total Amount</p>
                                        <p className="text-xl font-serif text-amber-500">₦{booking?.totalPrice.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Guest Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-medium flex items-center gap-2">
                                            <User size={16} /> Guest Information
                                        </h3>
                                        <div className="bg-zinc-800/30 p-4 rounded-lg space-y-3">
                                            <div>
                                                <p className="text-xs text-zinc-500">Guest Name</p>
                                                <p className="text-white">{booking?.guestName || `User #${booking?.userId.slice(-4)}`}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-zinc-500">Email</p>
                                                <p className="text-white">{booking?.guestEmail || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-zinc-500">Phone</p>
                                                <p className="text-white">{booking?.guestPhone || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-zinc-500">Guests</p>
                                                <p className="text-white">{booking?.guests.adults} Adults, {booking?.guests.children} Children</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stay Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-medium flex items-center gap-2">
                                            <Calendar size={16} /> Stay Details
                                        </h3>
                                        <div className="bg-zinc-800/30 p-4 rounded-lg space-y-3">
                                            <div>
                                                <p className="text-xs text-zinc-500">Room</p>
                                                <p className="text-white">{room?.name || 'Unknown Room'}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-xs text-zinc-500">Check In</p>
                                                    {isEditing ? (
                                                        <input
                                                            type="date"
                                                            value={editData.checkIn}
                                                            onChange={(e) => setEditData({ ...editData, checkIn: e.target.value })}
                                                            className="bg-zinc-900 border border-zinc-700 text-white rounded px-2 py-1 text-sm w-full focus:outline-none focus:border-amber-500"
                                                        />
                                                    ) : (
                                                        <p className="text-white">{booking?.checkIn}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-xs text-zinc-500">Check Out</p>
                                                    {isEditing ? (
                                                        <input
                                                            type="date"
                                                            value={editData.checkOut}
                                                            onChange={(e) => setEditData({ ...editData, checkOut: e.target.value })}
                                                            className="bg-zinc-900 border border-zinc-700 text-white rounded px-2 py-1 text-sm w-full focus:outline-none focus:border-amber-500"
                                                        />
                                                    ) : (
                                                        <p className="text-white">{booking?.checkOut}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Special Requests */}
                                <div className="space-y-4">
                                    <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-medium flex items-center gap-2">
                                        <MessageSquare size={16} /> Special Requests
                                    </h3>
                                    <div className="bg-zinc-800/30 p-4 rounded-lg border border-zinc-800/50">
                                        {isEditing ? (
                                            <textarea
                                                value={editData.specialRequests || ''}
                                                onChange={(e) => setEditData({ ...editData, specialRequests: e.target.value })}
                                                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500 min-h-[80px]"
                                                placeholder="No special requests"
                                            />
                                        ) : (
                                            <p className="text-zinc-300 italic">"{booking?.specialRequests || 'No special requests'}"</p>
                                        )}
                                    </div>
                                </div>

                                {/* Payment Info (Mock) */}
                                <div className="space-y-4">
                                    <h3 className="text-sm uppercase tracking-wider text-zinc-500 font-medium flex items-center gap-2">
                                        <CreditCard size={16} /> Payment Information
                                    </h3>
                                    <div className="bg-zinc-800/30 p-4 rounded-lg flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-zinc-500">Payment Method</p>
                                            <p className="text-white">Credit Card (**** 4242)</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-zinc-500">Date</p>
                                            <p className="text-white">{booking?.createdAt}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-zinc-800 bg-zinc-950 flex justify-between gap-3">
                                <div>
                                    {!isEditing && booking?.status !== 'cancelled' && (
                                        <button
                                            onClick={handleCancelBooking}
                                            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors text-sm font-medium border border-red-500/20"
                                        >
                                            Cancel Booking
                                        </button>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    {isEditing ? (
                                        <>
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors text-sm font-medium"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded transition-colors text-sm font-medium"
                                            >
                                                Save Changes
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={onClose}
                                                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors text-sm font-medium"
                                            >
                                                Close
                                            </button>
                                            {!readOnly && booking?.status !== 'cancelled' && (
                                                <button
                                                    onClick={() => setIsEditing(true)}
                                                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors text-sm font-medium border border-zinc-700"
                                                >
                                                    Edit Details
                                                </button>
                                            )}
                                            <button
                                                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded transition-colors text-sm font-medium"
                                                onClick={() => window.print()}
                                            >
                                                Print Receipt
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Dedicated Print View */}
            {isOpen && booking && (
                <div className="hidden print:block absolute top-0 left-0 w-full h-auto bg-white text-black p-0 z-[9999] dedicated-print-view">
                    <div className="w-full max-w-none p-8 space-y-8">
                        {/* Header */}
                        <div className="flex justify-between items-start border-b border-gray-200 pb-8">
                            <div>
                                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Phoenix Imperial</h1>
                                <p className="text-gray-500 text-sm">Luxury Hotel & Suites</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Receipt</h2>
                                <p className="text-gray-500 mt-1">#{booking.id.slice(-8)}</p>
                                <p className="text-gray-500 text-sm mt-1">{new Date().toLocaleDateString()}</p>
                            </div>
                        </div>

                        {/* Booking Details Grid */}
                        <div className="grid grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Guest Details</h3>
                                <div className="space-y-2">
                                    <p><span className="font-medium">Name:</span> User #{booking.userId.slice(-4)}</p>
                                    <p><span className="font-medium">Guests:</span> {booking.guests.adults} Adults, {booking.guests.children} Children</p>
                                    <p><span className="font-medium">Status:</span> <span className="capitalize">{booking.status}</span></p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Stay Information</h3>
                                <div className="space-y-2">
                                    <p><span className="font-medium">Room:</span> {room?.name || 'Unknown Room'}</p>
                                    <p><span className="font-medium">Check In:</span> {booking.checkIn}</p>
                                    <p><span className="font-medium">Check Out:</span> {booking.checkOut}</p>
                                </div>
                            </div>
                        </div>

                        {/* Special Requests */}
                        {booking.specialRequests && (
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Special Requests</h3>
                                <p className="text-gray-700 italic">"{booking.specialRequests}"</p>
                            </div>
                        )}

                        {/* Financials */}
                        <div>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 text-sm font-bold uppercase text-gray-500">Description</th>
                                        <th className="text-right py-3 text-sm font-bold uppercase text-gray-500">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="py-4 text-gray-900">Room Charges ({room?.name})</td>
                                        <td className="py-4 text-right text-gray-900">₦{booking.totalPrice.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr className="border-t-2 border-gray-900">
                                        <td className="py-4 text-lg font-bold text-gray-900">Total Paid</td>
                                        <td className="py-4 text-right text-lg font-bold text-gray-900">₦{booking.totalPrice.toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
                            <p>Thank you for choosing Phoenix Imperial. We hope you enjoy your stay.</p>
                            <p className="mt-2">For any inquiries, please contact support@phoeniximperial.com</p>
                        </div>
                    </div>
                </div>
            )}
        </>,
        document.body
    );
};
