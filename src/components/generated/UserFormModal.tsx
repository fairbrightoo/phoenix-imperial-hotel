import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Shield, Building2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User as UserType, Branch } from './types';

const userSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    role: z.enum(['super_admin', 'branch_admin', 'customer']),
    branchId: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
    confirmPassword: z.string().optional(),
    status: z.enum(['active', 'inactive']).optional(),
}).refine((data) => {
    if (data.role === 'branch_admin' && !data.branchId) {
        return false;
    }
    return true;
}, {
    message: "Branch is required for Branch Admins",
    path: ["branchId"],
}).refine((data) => {
    if (data.password && data.password !== data.confirmPassword) {
        return false;
    }
    return true;
}, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type UserFormData = z.infer<typeof userSchema>;

interface UserFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: UserFormData) => void;
    initialData?: UserType | null;
    branches: Branch[];
    title: string;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    branches,
    title
}) => {
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<UserFormData>({
        resolver: zodResolver(userSchema) as any,
        defaultValues: initialData ? {
            name: initialData.name,
            email: initialData.email,
            role: initialData.role,
            branchId: initialData.branchId || '',
            status: initialData.status || 'active',
            password: '',
            confirmPassword: ''
        } : {
            name: '',
            email: '',
            role: 'branch_admin',
            branchId: '',
            status: 'active',
            password: '',
            confirmPassword: ''
        }
    });

    const selectedRole = watch('role');

    React.useEffect(() => {
        if (isOpen) {
            if (initialData) {
                reset({
                    name: initialData.name,
                    email: initialData.email,
                    role: initialData.role,
                    branchId: initialData.branchId || '',
                    status: initialData.status || 'active',
                    password: '',
                    confirmPassword: ''
                });
            } else {
                reset({
                    name: '',
                    email: '',
                    role: 'branch_admin',
                    branchId: '',
                    status: 'active',
                    password: '',
                    confirmPassword: ''
                });
            }
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
                    className="bg-zinc-900 rounded-lg border border-zinc-800 w-full max-w-md overflow-hidden shadow-2xl"
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
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-2">
                                <User size={14} />
                                Full Name
                            </label>
                            <input
                                {...register('name')}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                placeholder="John Doe"
                            />
                            {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-2">
                                <Mail size={14} />
                                Email Address
                            </label>
                            <input
                                {...register('email')}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                placeholder="john@example.com"
                            />
                            {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-2">
                                <Shield size={14} />
                                Role
                            </label>
                            <select
                                {...register('role')}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                            >
                                <option value="branch_admin">Branch Admin</option>
                                <option value="super_admin">Super Admin</option>
                                <option value="customer">Customer</option>
                            </select>
                            {errors.role && <p className="text-red-400 text-xs">{errors.role.message}</p>}
                        </div>

                        {selectedRole === 'branch_admin' && (
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-2">
                                    <Building2 size={14} />
                                    Assign Branch
                                </label>
                                <select
                                    {...register('branchId')}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                >
                                    <option value="">Select a branch...</option>
                                    {branches.map(branch => (
                                        <option key={branch.id} value={branch.id}>
                                            {branch.name} ({branch.city})
                                        </option>
                                    ))}
                                </select>
                                {errors.branchId && <p className="text-red-400 text-xs">{errors.branchId.message}</p>}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-2">
                                    <Shield size={14} />
                                    Password {initialData && '(Leave blank to keep)'}
                                </label>
                                <input
                                    type="password"
                                    {...register('password')}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder={initialData ? "********" : "Enter password"}
                                />
                                {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-2">
                                    <Shield size={14} />
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    {...register('confirmPassword')}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder={initialData ? "********" : "Confirm password"}
                                />
                                {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>

                        {initialData && (
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium flex items-center gap-2">
                                    <Shield size={14} />
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
                                Save User
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
