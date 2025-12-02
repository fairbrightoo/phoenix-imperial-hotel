import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Star, User, CheckCircle } from 'lucide-react';
import { Testimonial } from './types';

const testimonialSchema = z.object({
    userName: z.string().min(1, 'User name is required'),
    rating: z.coerce.number().min(1).max(5),
    comment: z.string().min(10, 'Comment must be at least 10 characters'),
    verified: z.boolean(),
});

export type TestimonialFormData = z.infer<typeof testimonialSchema>;

interface TestimonialFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TestimonialFormData) => void;
    initialData?: Testimonial | null;
    title: string;
}

export const TestimonialFormModal: React.FC<TestimonialFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    title
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<TestimonialFormData>({
        resolver: zodResolver(testimonialSchema) as any,
        defaultValues: {
            userName: '',
            rating: 5,
            comment: '',
            verified: true,
        },
    });

    const currentRating = watch('rating');

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                reset({
                    userName: initialData.userName,
                    rating: initialData.rating,
                    comment: initialData.comment,
                    verified: initialData.verified,
                });
            } else {
                reset({
                    userName: '',
                    rating: 5,
                    comment: '',
                    verified: true,
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

                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                        {/* User Name */}
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1 flex items-center gap-2">
                                <User size={16} /> User Name
                            </label>
                            <input
                                {...register('userName')}
                                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded px-3 py-2 focus:outline-none focus:border-amber-500"
                                placeholder="Jane Doe"
                            />
                            {errors.userName && <p className="text-red-400 text-xs mt-1">{errors.userName.message}</p>}
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-2">
                                <Star size={16} /> Rating
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setValue('rating', star)}
                                        className={`p-1 transition-colors ${star <= currentRating ? 'text-amber-400' : 'text-zinc-600'}`}
                                    >
                                        <Star size={24} fill={star <= currentRating ? 'currentColor' : 'none'} />
                                    </button>
                                ))}
                            </div>
                            <input type="hidden" {...register('rating')} />
                            {errors.rating && <p className="text-red-400 text-xs mt-1">{errors.rating.message}</p>}
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1 flex items-center gap-2">
                                <MessageSquare size={16} /> Comment
                            </label>
                            <textarea
                                {...register('comment')}
                                rows={4}
                                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded px-3 py-2 focus:outline-none focus:border-amber-500"
                                placeholder="Share your experience..."
                            />
                            {errors.comment && <p className="text-red-400 text-xs mt-1">{errors.comment.message}</p>}
                        </div>

                        {/* Verified Toggle */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                {...register('verified')}
                                id="verified"
                                className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-amber-600 focus:ring-amber-500"
                            />
                            <label htmlFor="verified" className="text-sm text-zinc-300 flex items-center gap-2 cursor-pointer">
                                <CheckCircle size={14} className="text-green-400" />
                                Verified Stay
                            </label>
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
                                {isSubmitting ? 'Saving...' : 'Save Testimonial'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
