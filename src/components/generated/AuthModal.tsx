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
          <SortableContainer dndKitId="12fdda33-97b4-4b71-8795-435de1da8a34" containerType="regular" prevTag="motion.div" initial={{
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
            <SortableContainer dndKitId="4486ae21-d306-4ce2-b768-2b67c2487385" containerType="regular" prevTag="div" className="flex items-center justify-between p-6 border-b border-zinc-800" data-magicpath-id="3" data-magicpath-path="AuthModal.tsx">
              <h2 className="text-2xl font-serif text-white" data-magicpath-id="4" data-magicpath-path="AuthModal.tsx">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <SortableContainer dndKitId="ea38a104-cf81-4f14-abae-30b076df0ac0" containerType="regular" prevTag="button" onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-400 hover:text-white" data-magicpath-id="5" data-magicpath-path="AuthModal.tsx">
                <X size={20} data-magicpath-id="6" data-magicpath-path="AuthModal.tsx" />
              </SortableContainer>
            </SortableContainer>

            {/* Form */}
            <SortableContainer dndKitId="417d4101-1e1e-4049-98a7-f3dd640c03ce" containerType="regular" prevTag="form" onSubmit={handleSubmit} className="p-6 space-y-4" data-magicpath-id="7" data-magicpath-path="AuthModal.tsx">
              {mode === 'register' && <SortableContainer dndKitId="07646762-808b-4fd4-b2b5-447bbefc7352" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="8" data-magicpath-path="AuthModal.tsx">
                  <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="9" data-magicpath-path="AuthModal.tsx">Full Name</label>
                  <SortableContainer dndKitId="9e2213f2-45a4-4579-8b90-73beb8457148" containerType="regular" prevTag="div" className="relative" data-magicpath-id="10" data-magicpath-path="AuthModal.tsx">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" data-magicpath-id="11" data-magicpath-path="AuthModal.tsx" />
                    <input type="text" value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" placeholder="John Doe" required data-magicpath-id="12" data-magicpath-path="AuthModal.tsx" />
                  </SortableContainer>
                </SortableContainer>}

              <SortableContainer dndKitId="020b56ce-6edd-4cdc-9202-5010d4338f64" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="13" data-magicpath-path="AuthModal.tsx">
                <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="14" data-magicpath-path="AuthModal.tsx">Email</label>
                <SortableContainer dndKitId="37148330-667b-470a-94b7-124dc17470e7" containerType="regular" prevTag="div" className="relative" data-magicpath-id="15" data-magicpath-path="AuthModal.tsx">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" data-magicpath-id="16" data-magicpath-path="AuthModal.tsx" />
                  <input type="email" value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" placeholder="your@email.com" required data-magicpath-id="17" data-magicpath-path="AuthModal.tsx" />
                </SortableContainer>
              </SortableContainer>

              <SortableContainer dndKitId="2b0184e8-c6f2-434b-9ebc-9fd2458bb25c" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="18" data-magicpath-path="AuthModal.tsx">
                <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="19" data-magicpath-path="AuthModal.tsx">Password</label>
                <SortableContainer dndKitId="86ee1612-1046-4944-b3fb-d7f561dca4ba" containerType="regular" prevTag="div" className="relative" data-magicpath-id="20" data-magicpath-path="AuthModal.tsx">
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

              <SortableContainer dndKitId="8a4a36fd-3acd-44a8-b9a6-9ed940d8d424" containerType="regular" prevTag="div" className="text-center pt-4 border-t border-zinc-800" data-magicpath-id="25" data-magicpath-path="AuthModal.tsx">
                <p className="text-zinc-400 text-sm" data-magicpath-id="26" data-magicpath-path="AuthModal.tsx">
                  {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                  {' '}
                  <button type="button" onClick={toggleMode} className="text-amber-500 hover:text-amber-400 font-medium" data-magicpath-id="27" data-magicpath-path="AuthModal.tsx">
                    {mode === 'login' ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </SortableContainer>

              {/* Demo Credentials */}
              <SortableContainer dndKitId="aa65a996-f25b-44ad-a6d6-426e3a6ce219" containerType="regular" prevTag="div" className="bg-zinc-800/50 p-4 rounded text-xs text-zinc-500 space-y-1" data-magicpath-id="28" data-magicpath-path="AuthModal.tsx">
                <p className="font-medium text-zinc-400 mb-2" data-magicpath-id="29" data-magicpath-path="AuthModal.tsx">Demo Credentials:</p>
                <p data-magicpath-id="30" data-magicpath-path="AuthModal.tsx">Customer: customer@example.com</p>
                <p data-magicpath-id="31" data-magicpath-path="AuthModal.tsx">Abuja Admin: admin.abuja@phoeniximperial.com</p>
                <p data-magicpath-id="32" data-magicpath-path="AuthModal.tsx">Lagos Admin: admin.lagos@phoeniximperial.com</p>
                <p data-magicpath-id="33" data-magicpath-path="AuthModal.tsx">Super Admin: superadmin@phoeniximperial.com</p>
                <p className="mt-2 italic" data-magicpath-id="34" data-magicpath-path="AuthModal.tsx">Password: any text works (demo mode)</p>
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>
        </>}
    </AnimatePresence>;
};