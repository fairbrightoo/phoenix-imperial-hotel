import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, MapPin, Phone, Mail, Globe, DollarSign } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Branch } from './types';
import { ImageUpload } from '../ui/ImageUpload';
import api from '../../services/api';
import { useAlert } from '../ui/AlertContext';

const branchSchema = z.object({
    name: z.string().min(1, 'Branch name is required'),
    city: z.string().min(1, 'City is required'),
    address: z.string().min(1, 'Address is required'),
    phone: z.string().min(1, 'Phone number is required'),
    email: z.string().email('Invalid email address'),
    timezone: z.string().min(1, 'Timezone is required'),
    currency: z.string().min(1, 'Currency is required'),
    status: z.enum(['active', 'inactive']).optional(),
    description: z.string().optional(),
    amenities: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    policies: z.object({
        checkIn: z.string().optional(),
        checkOut: z.string().optional(),
        cancellation: z.string().optional()
    }).optional()
});

export type BranchFormData = z.infer<typeof branchSchema>;

interface BranchFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: BranchFormData) => void;
    initialData?: any; // Using any temporarily to bypass strict type check against old Branch type
    title: string;
    mode?: 'create' | 'edit_basic' | 'edit_config';
}


export const BranchFormModal: React.FC<BranchFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    title,
    mode = 'create'
}) => {
    const { showAlert } = useAlert();
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<BranchFormData>({
        resolver: zodResolver(branchSchema) as any,
        defaultValues: initialData || {
            name: '',
            city: '',
            address: '',
            phone: '',
            email: '',
            timezone: 'Africa/Lagos',
            currency: 'NGN',
            description: '',
            amenities: [],
            policies: { checkIn: '14:00', checkOut: '11:00', cancellation: 'Flexible' }
        }
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFormSubmit = async (data: BranchFormData) => {
        try {
            console.log('Submitting branch data:', data);
            let finalImages = data.images || [];

            if (selectedFile) {
                const formData = new FormData();
                formData.append('image', selectedFile);

                const uploadResponse = await api.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // For now, we just replace/set the first image
                finalImages = [uploadResponse.data.url];
            }

            onSubmit({
                ...data,
                images: finalImages
            });
        } catch (error) {
            console.error('Upload failed:', error);
            showAlert('Failed to process image upload', 'error');
        }
    };

    const onInvalid = (errors: any) => {
        console.error('Form validation failed:', errors);
        const errorFields = Object.keys(errors).join(', ');
        showAlert(`Please fix errors in: ${errorFields}`, 'error');
    };

    // Helper to safe parse
    const safeParse = (data: any, fallback: any) => {
        if (data === null || data === undefined) return fallback;
        if (typeof data === 'string') {
            try {
                const parsed = JSON.parse(data);
                // Handle double stringification
                if (typeof parsed === 'string') return JSON.parse(parsed);
                return parsed;
            } catch (e) {
                return fallback;
            }
        }
        return data;
    };

    React.useEffect(() => {
        if (isOpen && initialData) {
            reset({
                ...initialData,
                status: initialData.status || 'active',
                description: initialData.description || '',
                amenities: safeParse(initialData.amenities, []),
                policies: safeParse(initialData.policies, { checkIn: '14:00', checkOut: '11:00', cancellation: 'Flexible' }),
                images: safeParse(initialData.images, [])
            });
        } else if (isOpen && !initialData) {
            reset({
                name: '',
                city: '',
                address: '',
                phone: '',
                email: '',
                timezone: 'Africa/Lagos',
                currency: 'NGN',
                description: '',
                amenities: [],
                policies: { checkIn: '14:00', checkOut: '11:00', cancellation: 'Flexible' }
            });
        }
    }, [isOpen, initialData, reset]);

    if (!isOpen) return null;

    const showBasic = mode === 'create' || mode === 'edit_basic';
    const showConfig = mode === 'create' || mode === 'edit_config';

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-zinc-900 rounded-lg border border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                >
                    <div className="flex items-center justify-between p-6 border-b border-zinc-800 sticky top-0 bg-zinc-900 z-10">
                        <h2 className="text-xl font-serif text-white">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-zinc-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(handleFormSubmit, onInvalid)} className="p-6 space-y-8">
                        {showBasic && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-white border-b border-zinc-800 pb-2">Basic Information</h3>
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
                                        <ImageUpload
                                            label="Branch Image"
                                            defaultUrl={initialData?.images?.[0]}
                                            onFileSelect={setSelectedFile}
                                            onUrlChange={(url) => {
                                                // Update the form value when URL is manually entered
                                                // We treat it as a single image array for now
                                                // This might need more complex logic if we support multiple images later
                                            }}
                                        />
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

                                    {initialData && (
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-2">
                                                <Building2 size={14} />
                                                Status
                                            </label>
                                            <select
                                                {...register('status')}
                                                className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {showConfig && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-white border-b border-zinc-800 pb-2">Configuration & Settings</h3>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                                        Description
                                    </label>
                                    <textarea
                                        {...register('description')}
                                        rows={4}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                        placeholder="Describe the branch..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                                        Amenities (Comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Pool, Gym, Spa, WiFi"
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                        onChange={(e) => {
                                            const amenities = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                            setValue('amenities', amenities);
                                        }}
                                        defaultValue={initialData?.amenities?.join(', ')}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                                            Check-In Time
                                        </label>
                                        <input
                                            type="time"
                                            {...register('policies.checkIn')}
                                            className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                                            Check-Out Time
                                        </label>
                                        <input
                                            type="time"
                                            {...register('policies.checkOut')}
                                            className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                                        Cancellation Policy
                                    </label>
                                    <input
                                        {...register('policies.cancellation')}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                        placeholder="e.g. Free cancellation up to 24 hours before check-in"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800 sticky bottom-0 bg-zinc-900 z-10">
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
