import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, Chrome } from 'lucide-react';
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
    register,
    loginWithGoogle
  } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        onClose();
      } else if (mode === 'register') {
        await register(formData.email, formData.password, formData.name);
        onClose();
      } else if (mode === 'forgot') {
        // Mock forgot password
        await new Promise(resolve => setTimeout(resolve, 1000));
        setResetEmailSent(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };
  const toggleMode = (newMode: 'login' | 'register' | 'forgot') => {
    setMode(newMode);
    setError('');
    setResetEmailSent(false);
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
          <SortableContainer dndKitId="fb8489a8-b862-47ef-9379-5f7855f99b4e" containerType="regular" prevTag="motion.div" initial={{
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
      }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-900 rounded-lg shadow-2xl z-50 border border-zinc-800 mx-4 max-h-[90vh] overflow-y-auto" data-magicpath-id="2" data-magicpath-path="AuthModal.tsx">
            {/* Header */}
            <SortableContainer dndKitId="c6862fb5-6c0d-4cf9-9490-54cebf8a9026" containerType="regular" prevTag="div" className="flex items-center justify-between p-6 border-b border-zinc-800 sticky top-0 bg-zinc-900 z-10" data-magicpath-id="3" data-magicpath-path="AuthModal.tsx">
              <h2 className="text-2xl font-serif text-white" data-magicpath-id="4" data-magicpath-path="AuthModal.tsx">
                {mode === 'login' && 'Welcome Back'}
                {mode === 'register' && 'Create Account'}
                {mode === 'forgot' && 'Reset Password'}
              </h2>
              <SortableContainer dndKitId="4be4e55a-0729-4626-aea5-b41e809f50d7" containerType="regular" prevTag="button" onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-400 hover:text-white" data-magicpath-id="5" data-magicpath-path="AuthModal.tsx">
                <X size={20} data-magicpath-id="6" data-magicpath-path="AuthModal.tsx" />
              </SortableContainer>
            </SortableContainer>

            {/* Form */}
            <SortableContainer dndKitId="52a0929a-f475-4a03-94b7-00f6dacf2261" containerType="regular" prevTag="div" className="p-6" data-magicpath-id="7" data-magicpath-path="AuthModal.tsx">
              {mode !== 'forgot' && <>
                  {/* Google Sign In */}
                  <SortableContainer dndKitId="b2b51780-4c20-4c3f-b912-9596c958bb04" containerType="regular" prevTag="button" type="button" onClick={handleGoogleLogin} disabled={loading} className="w-full bg-white hover:bg-gray-100 text-gray-900 py-3 rounded transition-colors font-medium flex items-center justify-center gap-3 mb-6 disabled:opacity-50 disabled:cursor-not-allowed" data-magicpath-id="8" data-magicpath-path="AuthModal.tsx">
                    <Chrome size={20} data-magicpath-id="9" data-magicpath-path="AuthModal.tsx" />
                    Continue with Google
                  </SortableContainer>

                  <SortableContainer dndKitId="6b8f64f6-10e6-4f62-8e83-d0b6bb054cae" containerType="regular" prevTag="div" className="relative mb-6" data-magicpath-id="10" data-magicpath-path="AuthModal.tsx">
                    <SortableContainer dndKitId="87d2a627-d625-41d6-b89a-b3da41bb5058" containerType="regular" prevTag="div" className="absolute inset-0 flex items-center" data-magicpath-id="11" data-magicpath-path="AuthModal.tsx">
                      <div className="w-full border-t border-zinc-700" data-magicpath-id="12" data-magicpath-path="AuthModal.tsx"></div>
                    </SortableContainer>
                    <SortableContainer dndKitId="f73d01b9-efe2-40ba-9d97-c911244f9a5e" containerType="regular" prevTag="div" className="relative flex justify-center text-xs uppercase" data-magicpath-id="13" data-magicpath-path="AuthModal.tsx">
                      <span className="bg-zinc-900 px-2 text-zinc-500" data-magicpath-id="14" data-magicpath-path="AuthModal.tsx">Or</span>
                    </SortableContainer>
                  </SortableContainer>
                </>}

              <SortableContainer dndKitId="2823d31a-a64b-4f45-8453-31f7e2f3e004" containerType="regular" prevTag="form" onSubmit={handleSubmit} className="space-y-4" data-magicpath-id="15" data-magicpath-path="AuthModal.tsx">
                {mode === 'register' && <SortableContainer dndKitId="cc807deb-3858-4774-b694-22de47058831" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="16" data-magicpath-path="AuthModal.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="17" data-magicpath-path="AuthModal.tsx">
                      Full Name
                    </label>
                    <SortableContainer dndKitId="78baf4d5-a153-4bd4-b997-2792b7bc6d88" containerType="regular" prevTag="div" className="relative" data-magicpath-id="18" data-magicpath-path="AuthModal.tsx">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" data-magicpath-id="19" data-magicpath-path="AuthModal.tsx" />
                      <input type="text" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" placeholder="John Doe" required data-magicpath-id="20" data-magicpath-path="AuthModal.tsx" />
                    </SortableContainer>
                  </SortableContainer>}

                <SortableContainer dndKitId="a05b80bb-7449-4937-b0cd-4821118dd2d1" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="21" data-magicpath-path="AuthModal.tsx">
                  <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="22" data-magicpath-path="AuthModal.tsx">
                    Email
                  </label>
                  <SortableContainer dndKitId="cd2f1296-2dac-4b8a-92a9-fee69fe273a1" containerType="regular" prevTag="div" className="relative" data-magicpath-id="23" data-magicpath-path="AuthModal.tsx">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" data-magicpath-id="24" data-magicpath-path="AuthModal.tsx" />
                    <input type="email" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" placeholder="your@email.com" required data-magicpath-id="25" data-magicpath-path="AuthModal.tsx" />
                  </SortableContainer>
                </SortableContainer>

                {mode !== 'forgot' && <SortableContainer dndKitId="832c722c-71c9-41b7-a589-62487f5d7f17" containerType="regular" prevTag="div" className="space-y-2" data-magicpath-id="26" data-magicpath-path="AuthModal.tsx">
                    <label className="text-xs uppercase tracking-wider text-zinc-400" data-magicpath-id="27" data-magicpath-path="AuthModal.tsx">
                      Password
                    </label>
                    <SortableContainer dndKitId="c94daf6d-50fa-4412-bd31-b7126675c17d" containerType="regular" prevTag="div" className="relative" data-magicpath-id="28" data-magicpath-path="AuthModal.tsx">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" data-magicpath-id="29" data-magicpath-path="AuthModal.tsx" />
                      <input type="password" value={formData.password} onChange={e => setFormData({
                  ...formData,
                  password: e.target.value
                })} className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" placeholder="••••••••" required data-magicpath-id="30" data-magicpath-path="AuthModal.tsx" />
                    </SortableContainer>
                  </SortableContainer>}

                {mode === 'login' && <SortableContainer dndKitId="6349e3ab-fe39-460c-9f57-36de8d4a82b3" containerType="regular" prevTag="div" className="text-right" data-magicpath-id="31" data-magicpath-path="AuthModal.tsx">
                    <button type="button" onClick={() => toggleMode('forgot')} className="text-amber-500 hover:text-amber-400 text-xs" data-magicpath-id="32" data-magicpath-path="AuthModal.tsx">
                      Forgot Password?
                    </button>
                  </SortableContainer>}

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded text-sm" data-magicpath-id="33" data-magicpath-path="AuthModal.tsx">
                    {error}
                  </div>}

                {resetEmailSent && <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded text-sm" data-magicpath-id="34" data-magicpath-path="AuthModal.tsx">
                    Password reset instructions sent to your email!
                  </div>}

                <button type="submit" disabled={loading} className="w-full bg-amber-600 text-white py-3 rounded hover:bg-amber-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed" data-magicpath-id="35" data-magicpath-path="AuthModal.tsx">
                  {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
                </button>

                <SortableContainer dndKitId="a010ee65-ce2f-4093-b8fc-c5740cff934f" containerType="regular" prevTag="div" className="text-center pt-4 border-t border-zinc-800" data-magicpath-id="36" data-magicpath-path="AuthModal.tsx">
                  {mode === 'forgot' ? <button type="button" onClick={() => toggleMode('login')} className="text-amber-500 hover:text-amber-400 font-medium text-sm" data-magicpath-id="37" data-magicpath-path="AuthModal.tsx">
                      Back to Sign In
                    </button> : <p className="text-zinc-400 text-sm" data-magicpath-id="38" data-magicpath-path="AuthModal.tsx">
                      {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                      <button type="button" onClick={() => toggleMode(mode === 'login' ? 'register' : 'login')} className="text-amber-500 hover:text-amber-400 font-medium" data-magicpath-id="39" data-magicpath-path="AuthModal.tsx">
                        {mode === 'login' ? 'Sign Up' : 'Sign In'}
                      </button>
                    </p>}
                </SortableContainer>

                {/* Demo Credentials */}
                <SortableContainer dndKitId="fd5e7a6e-380c-43be-b0e6-3064e860ce53" containerType="regular" prevTag="div" className="bg-zinc-800/50 p-4 rounded text-xs text-zinc-500 space-y-1" data-magicpath-id="40" data-magicpath-path="AuthModal.tsx">
                  <p className="font-medium text-zinc-400 mb-2" data-magicpath-id="41" data-magicpath-path="AuthModal.tsx">Demo Credentials:</p>
                  <p data-magicpath-id="42" data-magicpath-path="AuthModal.tsx">Customer: user@phoeniximperial.com | password</p>
                  <p data-magicpath-id="43" data-magicpath-path="AuthModal.tsx">Abuja Admin: abuja.admin@phoeniximperial.com | password</p>
                  <p data-magicpath-id="44" data-magicpath-path="AuthModal.tsx">Lagos Admin: lagos.admin@phoeniximperial.com | password</p>
                  <p data-magicpath-id="45" data-magicpath-path="AuthModal.tsx">Super Admin: superadmin@phoeniximperial.com | password</p>
                </SortableContainer>
              </SortableContainer>
            </SortableContainer>
          </SortableContainer>
        </>}
    </AnimatePresence>;
};