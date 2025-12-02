import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, MapPin, Phone, Mail, Globe, DollarSign } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Branch } from './types';

const branchSchema = z.object({
    name: z.string().min(1, 'Branch name is required'),
    city: z.string().min(1, 'City is required'),
    address: z.string().min(1, 'Address is required'),
    phone: z.string().min(1, 'Phone number is required'),
    email: z.string().email('Invalid email address'),
    timezone: z.string().min(1, 'Timezone is required'),
    currency: z.string().min(1, 'Currency is required'),
});

export type BranchFormData = z.infer<typeof branchSchema>;

interface BranchFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: BranchFormData) => void;
    initialData?: Branch | null;
    title: string;
}

export const BranchFormModal: React.FC<BranchFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    title
}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<BranchFormData>({
        resolver: zodResolver(branchSchema) as any,
        defaultValues: initialData || {
            name: '',
            city: '',
            address: '',
            phone: '',
            email: '',
            timezone: 'Africa/Lagos',
            currency: 'NGN'
        }
    });

    React.useEffect(() => {
        if (isOpen && initialData) {
            reset(initialData);
        } else if (isOpen && !initialData) {
            reset({
                name: '',
                city: '',
                address: '',
                phone: '',
                email: '',
                timezone: 'Africa/Lagos',
                currency: 'NGN'
            });
        }
    }, [isOpen, initialData, reset]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-zinc-900 rounded-lg border border-zinc-800 w-full max-w-2xl overflow-hidden shadow-2xl"
                >
                    <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                        <h2 className="text-xl font-serif text-white">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-zinc-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-2">
                                    <Building2 size={14} />
                                    Branch Name
                                </label>
                                <input
                                    {...register('name')}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder="e.g. Phoenix Imperial Abuja"
                                />
                                {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-2">
                                    <MapPin size={14} />
                                    City
                                </label>
                                <input
                                    {...register('city')}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder="e.g. Abuja"
                                />
                                {errors.city && <p className="text-red-400 text-xs">{errors.city.message}</p>}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-2">
                                    <MapPin size={14} />
                                    Address
                                </label>
                                <input
                                    {...register('address')}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder="Full address"
                                />
                                {errors.address && <p className="text-red-400 text-xs">{errors.address.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-2">
                                    <Phone size={14} />
                                    Phone
                                </label>
                                <input
                                    {...register('phone')}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder="+234..."
                                />
                                {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-2">
                                    <Mail size={14} />
                                    Email
                                </label>
                                <input
                                    {...register('email')}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder="admin@example.com"
                                />
                                {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-2">
                                    <Globe size={14} />
                                    Timezone
                                </label>
                                <select
                                    {...register('timezone')}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                >
                                    <option value="Africa/Lagos">Africa/Lagos</option>
                                    <option value="UTC">UTC</option>
                                </select>
                                {errors.timezone && <p className="text-red-400 text-xs">{errors.timezone.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-2">
                                    <DollarSign size={14} />
                                    Currency
                                </label>
                                <select
                                    {...register('currency')}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                >
                                    <option value="NGN">NGN (Naira)</option>
                                    <option value="USD">USD (Dollar)</option>
                                    <option value="EUR">EUR (Euro)</option>
                                </select>
                                {errors.currency && <p className="text-red-400 text-xs">{errors.currency.message}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded transition-colors font-medium"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
