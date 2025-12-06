import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, Type, Tag } from 'lucide-react';
import { Gallery } from './types';
import { ImageUpload } from '../ui/ImageUpload';
import api from '../../services/api';
import { useState } from 'react';

const gallerySchema = z.object({
    imageUrl: z.string().url('Must be a valid URL'),
    title: z.string().min(1, 'Title is required'),
    category: z.string().min(1, 'Category is required'),
});

export type GalleryFormData = z.infer<typeof gallerySchema>;

interface GalleryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: GalleryFormData) => void;
    initialData?: Gallery | null;
    title: string;
}

export const GalleryFormModal: React.FC<GalleryFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    title
}) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue, // Add setValue
        formState: { errors, isSubmitting },
    } = useForm<GalleryFormData>({
        resolver: zodResolver(gallerySchema) as any,
        defaultValues: {
            imageUrl: '',
            title: '',
            category: 'Rooms',
        },
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFormSubmit = async (data: GalleryFormData) => {
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
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                reset({
                    imageUrl: initialData.imageUrl,
                    title: initialData.title,
                    category: initialData.category,
                });
            } else {
                reset({
                    imageUrl: '',
                    title: '',
                    category: 'Rooms',
                });
            }
        }
    }, [isOpen, initialData, reset]);

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
                    className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
                >
                    <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
                        <h2 className="text-xl font-serif text-white">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-full"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
                        {/* Image URL */}
                        <div>
                            <ImageUpload
                                label="Gallery Image"
                                defaultUrl={initialData?.imageUrl}
                                onFileSelect={(file) => {
                                    setSelectedFile(file);
                                    if (file) {
                                        // Set a valid URL placeholder to satisfy Zod validation
                                        setValue('imageUrl', 'http://pending-upload.com', { shouldValidate: true });
                                    }
                                }}
                                onUrlChange={(url) => {
                                    setValue('imageUrl', url, { shouldValidate: true });
                                }}
                            />
                            <input type="hidden" {...register('imageUrl')} />
                            {errors.imageUrl && <p className="text-red-400 text-xs mt-1">{errors.imageUrl.message}</p>}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1 flex items-center gap-2">
                                <Type size={16} /> Title
                            </label>
                            <input
                                {...register('title')}
                                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded px-3 py-2 focus:outline-none focus:border-amber-500"
                                placeholder="e.g., Deluxe Suite View"
                            />
                            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1 flex items-center gap-2">
                                <Tag size={16} /> Category
                            </label>
                            <select
                                {...register('category')}
                                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded px-3 py-2 focus:outline-none focus:border-amber-500"
                            >
                                <option value="Rooms">Rooms</option>
                                <option value="Dining">Dining</option>
                                <option value="Exterior">Exterior</option>
                                <option value="Amenities">Amenities</option>
                                <option value="Events">Events</option>
                            </select>
                            {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>}
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
                                {isSubmitting ? 'Saving...' : 'Save Image'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
