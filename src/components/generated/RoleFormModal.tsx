import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Role, Permission } from './types';

const roleSchema = z.object({
    name: z.string().min(1, 'Role name is required'),
    description: z.string().min(1, 'Description is required'),
    permissions: z.array(z.string()).min(1, 'Select at least one permission'),
});

export type RoleFormData = z.infer<typeof roleSchema>;

interface RoleFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: RoleFormData) => void;
    initialData?: Role | null;
    permissions: Permission[];
    title: string;
}

export const RoleFormModal: React.FC<RoleFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    permissions,
    title
}) => {
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<RoleFormData>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            name: '',
            description: '',
            permissions: []
        }
    });

    const selectedPermissions = watch('permissions');

    React.useEffect(() => {
        if (isOpen) {
            if (initialData) {
                reset({
                    name: initialData.name,
                    description: initialData.description,
                    permissions: initialData.permissions
                });
            } else {
                reset({
                    name: '',
                    description: '',
                    permissions: []
                });
            }
        }
    }, [isOpen, initialData, reset]);

    const togglePermission = (permissionId: string) => {
        const current = selectedPermissions || [];
        if (current.includes(permissionId)) {
            setValue('permissions', current.filter(id => id !== permissionId));
        } else {
            setValue('permissions', [...current, permissionId]);
        }
    };

    // Group permissions by category
    const groupedPermissions = permissions.reduce((acc, permission) => {
        if (!acc[permission.category]) {
            acc[permission.category] = [];
        }
        acc[permission.category].push(permission);
        return acc;
    }, {} as Record<string, Permission[]>);

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
                        <h2 className="text-xl font-serif text-white">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-zinc-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                                Role Name
                            </label>
                            <input
                                {...register('name')}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                placeholder="e.g., Receptionist"
                            />
                            {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                                Description
                            </label>
                            <input
                                {...register('description')}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                placeholder="Brief description of the role's responsibilities"
                            />
                            {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                                Permissions
                            </label>
                            {errors.permissions && <p className="text-red-400 text-xs">{errors.permissions.message}</p>}

                            <div className="space-y-6">
                                {Object.entries(groupedPermissions).map(([category, perms]) => (
                                    <div key={category}>
                                        <h4 className="text-sm font-medium text-amber-500 mb-3">{category}</h4>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {perms.map(permission => (
                                                <div
                                                    key={permission.id}
                                                    onClick={() => togglePermission(permission.id)}
                                                    className={`
                            cursor-pointer p-3 rounded border transition-all flex items-start gap-3
                            ${selectedPermissions?.includes(permission.id)
                                                            ? 'bg-amber-500/10 border-amber-500/50'
                                                            : 'bg-zinc-800 border-zinc-700 hover:border-zinc-600'}
                          `}
                                                >
                                                    <div className={`
                            w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5
                            ${selectedPermissions?.includes(permission.id)
                                                            ? 'bg-amber-500 border-amber-500 text-white'
                                                            : 'border-zinc-600'}
                          `}>
                                                        {selectedPermissions?.includes(permission.id) && <Check size={12} />}
                                                    </div>
                                                    <div>
                                                        <p className={`text-sm font-medium ${selectedPermissions?.includes(permission.id) ? 'text-white' : 'text-zinc-300'}`}>
                                                            {permission.name}
                                                        </p>
                                                        <p className="text-xs text-zinc-500 mt-0.5">{permission.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
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
                            Save Role
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
