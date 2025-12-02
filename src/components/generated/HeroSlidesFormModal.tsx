import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { GlobalContent } from './types';

const slideSchema = z.object({
    id: z.string(),
    image: z.string().url('Invalid image URL'),
    title: z.string().min(1, 'Title is required'),
    subtitle: z.string().min(1, 'Subtitle is required'),
});

const heroSchema = z.object({
    slides: z.array(slideSchema).min(1, 'At least one slide is required'),
});

type HeroFormData = z.infer<typeof heroSchema>;

interface HeroSlidesFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: HeroFormData) => void;
    initialData: GlobalContent['hero'];
}

export const HeroSlidesFormModal: React.FC<HeroSlidesFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData
}) => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<HeroFormData>({
        resolver: zodResolver(heroSchema),
        defaultValues: initialData
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "slides"
    });

    React.useEffect(() => {
        if (isOpen) {
            reset(initialData);
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
                    className="bg-zinc-900 rounded-lg border border-zinc-800 w-full max-w-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
                >
                    <div className="flex items-center justify-between p-6 border-b border-zinc-800 shrink-0">
                        <h2 className="text-xl font-serif text-white">Edit Hero Slides</h2>
                        <button
                            onClick={onClose}
                            className="text-zinc-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 relative group">
                                    <div className="absolute top-4 right-4">
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                                            disabled={fields.length === 1}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <h4 className="text-sm font-medium text-amber-500 mb-4 flex items-center gap-2">
                                        <ImageIcon size={16} />
                                        Slide {index + 1}
                                    </h4>

                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                                                Image URL
                                            </label>
                                            <input
                                                {...register(`slides.${index}.image`)}
                                                className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                                placeholder="https://..."
                                            />
                                            {errors.slides?.[index]?.image && (
                                                <p className="text-red-400 text-xs">{errors.slides[index]?.image?.message}</p>
                                            )}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                                                    Title
                                                </label>
                                                <input
                                                    {...register(`slides.${index}.title`)}
                                                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                                    placeholder="Slide Title"
                                                />
                                                {errors.slides?.[index]?.title && (
                                                    <p className="text-red-400 text-xs">{errors.slides[index]?.title?.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                                                    Subtitle
                                                </label>
                                                <input
                                                    {...register(`slides.${index}.subtitle`)}
                                                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                                    placeholder="Slide Subtitle"
                                                />
                                                {errors.slides?.[index]?.subtitle && (
                                                    <p className="text-red-400 text-xs">{errors.slides[index]?.subtitle?.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => append({ id: `slide-${Date.now()}`, image: '', title: '', subtitle: '' })}
                            className="w-full py-3 border-2 border-dashed border-zinc-700 rounded-lg text-zinc-400 hover:border-amber-500 hover:text-amber-500 transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus size={20} />
                            Add New Slide
                        </button>
                    </form>

                    <div className="flex justify-end gap-3 p-6 border-t border-zinc-800 shrink-0 bg-zinc-900/50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded transition-colors font-medium"
                        >
                            Save Changes
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
