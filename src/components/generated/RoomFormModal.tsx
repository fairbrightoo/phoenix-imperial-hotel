import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Upload, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageUpload } from '../ui/ImageUpload';
import api from '../../services/api';
import { useState } from 'react';
import { useAlert } from '../ui/AlertContext';

const roomSchema = z.object({
    name: z.string().min(1, 'Room name is required'),
    type: z.string().min(1, 'Room type is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.coerce.number().min(0, 'Price must be positive'),
    imageUrl: z.string().min(1, 'Image is required'),
    status: z.enum(['Available', 'Booked', 'Maintenance']),
    totalQuantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
});

export type RoomFormData = z.infer<typeof roomSchema>;

interface RoomFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: RoomFormData) => void;
    initialData?: RoomFormData | null;
    title: string;
    category: 'room' | 'hall';
}

export const RoomFormModal: React.FC<RoomFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    title,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<RoomFormData>({
        resolver: zodResolver(roomSchema) as any,
        defaultValues: {
            name: '',
            type: '',
            description: '',
            price: 0,
            imageUrl: '',
            status: 'Available',
            totalQuantity: 1,
        },
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { showAlert } = useAlert();

    const handleFormSubmit = async (data: RoomFormData) => {
        try {
            let finalImageUrl = data.imageUrl;

            if (selectedFile) {
                const formData = new FormData();
                formData.append('image', selectedFile);

                const uploadResponse = await api.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                finalImageUrl = uploadResponse.data.url;
            }

            onSubmit({
                ...data,
                imageUrl: finalImageUrl
            });
        } catch (error: any) {
            console.error('Upload failed:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to upload image. Please try again.';
            showAlert(errorMessage, 'error');
        }
    };

    useEffect(() => {
        if (isOpen && initialData) {
            reset(initialData);
        } else if (isOpen) {
            reset({
                name: '',
                type: '',
                description: '',
                price: 0,
                imageUrl: '',
                status: 'Available',
                totalQuantity: 1,
            });
        }
    }, [isOpen, initialData, reset]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                            <h2 className="text-xl font-serif text-white">{title}</h2>
                            <button
                                onClick={onClose}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Room Name</label>
                                <input
                                    {...register('name')}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder="e.g. Deluxe King Suite"
                                />
                                {errors.name && (
                                    <p className="text-red-400 text-xs">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Type</label>
                                    <select
                                        {...register('type')}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="deluxe">Deluxe</option>
                                        <option value="executive">Executive</option>
                                        <option value="family">Family</option>
                                        <option value="standard">Standard</option>
                                    </select>
                                    {errors.type && (
                                        <p className="text-red-400 text-xs">{errors.type.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Price (₦)</label>
                                    <input
                                        type="number"
                                        {...register('price')}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                        placeholder="0.00"
                                    />
                                    {errors.price && (
                                        <p className="text-red-400 text-xs">{errors.price.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Total Quantity</label>
                                <input
                                    type="number"
                                    {...register('totalQuantity')}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder="1"
                                    min="1"
                                />
                                {errors.totalQuantity && (
                                    <p className="text-red-400 text-xs">{errors.totalQuantity.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Description</label>
                                <textarea
                                    {...register('description')}
                                    rows={3}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                                    placeholder="Room description..."
                                />
                                {errors.description && (
                                    <p className="text-red-400 text-xs">{errors.description.message}</p>
                                )}
                                {errors.imageUrl && (
                                    <p className="text-red-400 text-xs">{errors.imageUrl.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <ImageUpload
                                    label="Room Image"
                                    defaultUrl={initialData?.imageUrl}
                                    onFileSelect={(file) => {
                                        setSelectedFile(file);
                                        if (file) {
                                            setValue('imageUrl', 'pending-upload', { shouldValidate: true });
                                        }
                                        // Don't reset to initialData here, as it conflicts with URL input
                                    }}
                                    onUrlChange={(url) => {
                                        setValue('imageUrl', url, { shouldValidate: true });
                                    }}
                                />
                                <input type="hidden" {...register('imageUrl')} />
                                {errors.imageUrl && (
                                    <p className="text-red-400 text-xs">{errors.imageUrl.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Status</label>
                                <div className="flex gap-4">
                                    {['Available', 'Booked', 'Maintenance'].map((status) => (
                                        <label key={status} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                value={status}
                                                {...register('status')}
                                                className="accent-amber-500"
                                            />
                                            <span className="text-sm text-zinc-300">{status}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        title
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
