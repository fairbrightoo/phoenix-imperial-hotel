import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, Chrome } from 'lucide-react';
import { useAuth } from './AuthContext';
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
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

    // Explicit validation
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (mode !== 'forgot' && !formData.password.trim()) {
      setError('Please enter your password');
      return;
    }
    if (mode === 'register' && !formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
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
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />

          {/* Modal */}
          <motion.div initial={{
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
      }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-900 rounded-lg shadow-2xl z-50 border border-zinc-800 mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800 sticky top-0 bg-zinc-900 z-10">
              <h2 className="text-2xl font-serif text-white">
                {mode === 'login' && 'Welcome Back'}
                {mode === 'register' && 'Create Account'}
                {mode === 'forgot' && 'Reset Password'}
              </h2>
              <button onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              {mode !== 'forgot' && <>
                  {/* Google Sign In */}
                  <button type="button" onClick={handleGoogleLogin} disabled={loading} className="w-full bg-white hover:bg-gray-100 text-gray-900 py-3 rounded transition-colors font-medium flex items-center justify-center gap-3 mb-6 disabled:opacity-50 disabled:cursor-not-allowed">
                    <Chrome size={20} />
                    Continue with Google
                  </button>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-zinc-700"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-zinc-900 px-2 text-zinc-500">Or</span>
                    </div>
                  </div>
                </>}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-zinc-400">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" />
                      <input type="text" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" placeholder="John Doe" required />
                    </div>
                  </div>}

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-zinc-400">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" />
                    <input type="email" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" placeholder="your@email.com" required />
                  </div>
                </div>

                {mode !== 'forgot' && <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-zinc-400">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-4 h-4" />
                      <input type="password" value={formData.password} onChange={e => setFormData({
                  ...formData,
                  password: e.target.value
                })} className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors rounded" placeholder="••••••••" required />
                    </div>
                  </div>}

                {mode === 'login' && <div className="text-right">
                    <button type="button" onClick={() => toggleMode('forgot')} className="text-amber-500 hover:text-amber-400 text-xs">
                      Forgot Password?
                    </button>
                  </div>}

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded text-sm">
                    {error}
                  </div>}

                {resetEmailSent && <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded text-sm">
                    Password reset instructions sent to your email!
                  </div>}

                <button type="submit" disabled={loading} className="w-full bg-amber-600 text-white py-3 rounded hover:bg-amber-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
                </button>

                <div className="text-center pt-4 border-t border-zinc-800">
                  {mode === 'forgot' ? <button type="button" onClick={() => toggleMode('login')} className="text-amber-500 hover:text-amber-400 font-medium text-sm">
                      Back to Sign In
                    </button> : <p className="text-zinc-400 text-sm">
                      {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                      <button type="button" onClick={() => toggleMode(mode === 'login' ? 'register' : 'login')} className="text-amber-500 hover:text-amber-400 font-medium">
                        {mode === 'login' ? 'Sign Up' : 'Sign In'}
                      </button>
                    </p>}
                </div>

                {/* Demo Credentials */}
                <div className="bg-zinc-800/50 p-4 rounded text-xs text-zinc-500 space-y-1">
                  <p className="font-medium text-zinc-400 mb-2">Demo Credentials:</p>
                  <p>Customer: user@phoeniximperial.com | password</p>
                  <p>Abuja Admin: abuja.admin@phoeniximperial.com | password</p>
                  <p>Lagos Admin: lagos.admin@phoeniximperial.com | password</p>
                  <p>Super Admin: superadmin@phoeniximperial.com | password</p>
                </div>
              </form>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
};