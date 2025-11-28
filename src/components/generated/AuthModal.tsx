import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from './AuthContext';
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mpid?: string;
}
export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    login,
    register
  } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.password, formData.name);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
  };
  return <AnimatePresence data-magicpath-id="0" data-magicpath-path="AuthModal.tsx">
      {isOpen && <>
          {/* Backdrop */}
          <motion.div data-magicpath-motion-tag="motion.div" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" data-magicpath-id="1" data-magicpath-path="AuthModal.tsx" />

          {/* Modal */}
          <SortableContainer dndKitId="c152c6ab-886e-4744-ba59-4c09c3489d4f" containerType="regular" prevTag="motion.div" initial={{
        opacity: 0,
        scale: 0.9,
        y: 20
      }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} exit={{
        opacity: 0,
        scale: 0.9,
        y: 20
      }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-900 rounded-lg shadow-2xl z-50 border border-zinc-800 mx-4" data-magicpath-id="2" data-magicpath-path="AuthModal.tsx">
            {/* Header */}
            <SortableContainer dndKitId="f59af74c-5705-4af1-a902-6f4f9b8d67bf" containerType="regular" prevTag="div" className="flex items-center justify-between p-6 border-b border-zinc-800" data-magicpath-id="3" data-magicpath-path="AuthModal.tsx">
              <h2 className="text-2xl font-serif text-white" data-magicpath-id="4" data-magicpath-path="AuthModal.tsx">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <SortableContainer dndKitId="14429aac-e335-49ae-a736-62d79542caac" containerType="regular" prevTag="button" onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-400 hover:text-white" data-magicpath-id="5" data-magicpath-path="AuthModal.tsx">
                <X size={20} data-magicpath-id="6" data-magicpath-path="AuthModal.tsx" />
              </SortableContainer>
            </SortableContainer>

            {/* Form */}
            <SortableContainer dndKitId="4b4c9e60-539a-4f8e-8771-91471b3daa5d" containerType="regular" prevTag="form" onSubmit={handleSubmit} className="p-6 space-y-4" data-magicpath-id="7" data-magicpath-path="AuthModal.tsx">
              {mode === 'register' && <SortableContainer dndKitId="1caea416-2f7a-44b1-b176-156e9b7c1f9e" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="8" data-magicpath-path="AuthModal.tsx">
                  <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="9" data-magicpath-path="AuthModal.tsx">Full Name</label>
                  <SortableContainer dndKitId="b8aca4ca-f893-4cfc-ad98-b90f71cc1bba" containerType="regular" prevTag="div" className="relative" data-magicpath-id="10" data-magicpath-path="AuthModal.tsx">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" data-magicpath-id="11" data-magicpath-path="AuthModal.tsx" />
                    <input type="text" value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" placeholder="John Doe" required data-magicpath-id="12" data-magicpath-path="AuthModal.tsx" />
                  </SortableContainer>
                </SortableContainer>}

              <SortableContainer dndKitId="f1636b21-0d27-4192-bfc7-0985c6277ee1" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="13" data-magicpath-path="AuthModal.tsx">
                <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="14" data-magicpath-path="AuthModal.tsx">Email</label>
                <SortableContainer dndKitId="e01f2c61-7e94-4798-b3e1-a68b8ab4f56e" containerType="regular" prevTag="div" className="relative" data-magicpath-id="15" data-magicpath-path="AuthModal.tsx">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" data-magicpath-id="16" data-magicpath-path="AuthModal.tsx" />
                  <input type="email" value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" placeholder="your@email.com" required data-magicpath-id="17" data-magicpath-path="AuthModal.tsx" />
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="705d683d-087d-4164-94a1-2ad4611c2ad2" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="18" data-magicpath-path="AuthModal.tsx">
                <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="19" data-magicpath-path="AuthModal.tsx">Password</label>
                <SortableContainer dndKitId="4931f006-18fc-4702-99e0-9c270386794d" containerType="regular" prevTag="div" className="relative" data-magicpath-id="20" data-magicpath-path="AuthModal.tsx">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" data-magicpath-id="21" data-magicpath-path="AuthModal.tsx" />
                  <input type="password" value={formData.password} onChange={e => setFormData({
                ...formData,
                password: e.target.value
              })} className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" placeholder="••••••••" required data-magicpath-id="22" data-magicpath-path="AuthModal.tsx" />
                </SortableContainer>
              </SortableContainer>

              {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded text-sm" data-magicpath-id="23" data-magicpath-path="AuthModal.tsx">
                  {error}
                </div>}

              <button type="submit" disabled={loading} className="w-full bg-amber-600 text-white py-3 rounded hover:bg-amber-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed" data-magicpath-id="24" data-magicpath-path="AuthModal.tsx">
                {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>

              <SortableContainer dndKitId="593336fd-40cd-4773-83b8-5c487fdf449d" containerType="regular" prevTag="div" className="text-center pt-4 border-t border-zinc-800" data-magicpath-id="25" data-magicpath-path="AuthModal.tsx">
                <p className="text-zinc-400 text-sm" data-magicpath-id="26" data-magicpath-path="AuthModal.tsx">
                  {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                  {' '}
                  <button type="button" onClick={toggleMode} className="text-amber-500 hover:text-amber-400 font-medium" data-magicpath-id="27" data-magicpath-path="AuthModal.tsx">
                    {mode === 'login' ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </SortableContainer>

              {/* Demo Credentials */}
              <SortableContainer dndKitId="176060ba-ad5a-4bbf-aaf4-cba1498436b2" containerType="regular" prevTag="div" className="bg-zinc-800/50 p-4 rounded text-xs text-zinc-500 space-y-1" data-magicpath-id="28" data-magicpath-path="AuthModal.tsx">
                <p className="font-medium text-zinc-400 mb-2" data-magicpath-id="29" data-magicpath-path="AuthModal.tsx">Demo Credentials:</p>
                <p data-magicpath-id="30" data-magicpath-path="AuthModal.tsx">Customer: customer@example.com</p>
                <p data-magicpath-id="31" data-magicpath-path="AuthModal.tsx">Abuja Admin: admin.abuja@almaris.com</p>
                <p data-magicpath-id="32" data-magicpath-path="AuthModal.tsx">Lagos Admin: admin.lagos@almaris.com</p>
                <p data-magicpath-id="33" data-magicpath-path="AuthModal.tsx">Super Admin: superadmin@almaris.com</p>
                <p className="mt-2 italic" data-magicpath-id="34" data-magicpath-path="AuthModal.tsx">Password: any text works (demo mode)</p>
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>
        </>}
    </AnimatePresence>;
};