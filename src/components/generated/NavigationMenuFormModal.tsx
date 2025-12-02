import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Menu } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { GlobalContent } from './types';

const menuItemSchema = z.object({
    label: z.string().min(1, 'Label is required'),
    href: z.string().min(1, 'Link is required'),
});

const navigationSchema = z.object({
    menuItems: z.array(menuItemSchema).min(1, 'At least one menu item is required'),
});

type NavigationFormData = z.infer<typeof navigationSchema>;

interface NavigationMenuFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: NavigationFormData) => void;
    initialData: GlobalContent['navigation'];
}

export const NavigationMenuFormModal: React.FC<NavigationMenuFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData
}) => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<NavigationFormData>({
        resolver: zodResolver(navigationSchema),
        defaultValues: initialData
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "menuItems"
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
                    className="bg-zinc-900 rounded-lg border border-zinc-800 w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
                >
                    <div className="flex items-center justify-between p-6 border-b border-zinc-800 shrink-0">
                        <h2 className="text-xl font-serif text-white">Edit Navigation Menu</h2>
                        <button
                            onClick={onClose}
                            className="text-zinc-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-start gap-3 bg-zinc-800 p-3 rounded-lg border border-zinc-700">
                                    <div className="mt-3 text-zinc-500">
                                        <Menu size={16} />
                                    </div>

                                    <div className="flex-1 grid md:grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                                                Label
                                            </label>
                                            <input
                                                {...register(`menuItems.${index}.label`)}
                                                className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                                                placeholder="e.g., Home"
                                            />
                                            {errors.menuItems?.[index]?.label && (
                                                <p className="text-red-400 text-xs">{errors.menuItems[index]?.label?.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                                                Link (Href)
                                            </label>
                                            <input
                                                {...register(`menuItems.${index}.href`)}
                                                className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                                                placeholder="e.g., / or #rooms"
                                            />
                                            {errors.menuItems?.[index]?.href && (
                                                <p className="text-red-400 text-xs">{errors.menuItems[index]?.href?.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="mt-3 text-zinc-500 hover:text-red-400 transition-colors"
                                        disabled={fields.length === 1}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => append({ label: '', href: '' })}
                            className="w-full py-3 border-2 border-dashed border-zinc-700 rounded-lg text-zinc-400 hover:border-amber-500 hover:text-amber-500 transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus size={20} />
                            Add Menu Item
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
