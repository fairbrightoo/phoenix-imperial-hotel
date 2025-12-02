import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useModal } from './ModalContext';
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
    loginWithGoogle,
    forgotPassword
  } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const { openDashboard } = useModal();

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Real-time password match check
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const passwordsMismatch = formData.confirmPassword && formData.password !== formData.confirmPassword;

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
    if (mode === 'register') {
      if (!formData.name.trim()) {
        setError('Please enter your name');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }
    setLoading(true);
    try {
      let user;
      if (mode === 'login') {
        user = await login(formData.email, formData.password);
        onClose();
      } else if (mode === 'register') {
        user = await register(formData.email, formData.password, formData.name);
        onClose();
      } else if (mode === 'forgot') {
        await forgotPassword(formData.email);
        setResetEmailSent(true);
      }

      // Redirect admins to dashboard
      if (user && (user.role === 'super_admin' || user.role === 'branch_admin')) {
        openDashboard();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = (newMode: 'login' | 'register' | 'forgot') => {
    setMode(newMode);
    setError('');
    setResetEmailSent(false);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif text-white">
                  {mode === 'login' ? 'Welcome Back' : mode === 'register' ? 'Create Account' : 'Reset Password'}
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  {mode === 'login' ? 'Sign in to access your account' : mode === 'register' ? 'Join us for an exceptional experience' : 'Enter your email to reset your password'}
                </p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              {resetEmailSent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-green-400" size={32} />
                  </div>
                  <h3 className="text-white font-medium mb-2">Check your inbox</h3>
                  <p className="text-zinc-400 text-sm mb-6">
                    We've sent password reset instructions to {formData.email}
                  </p>
                  <button onClick={() => toggleMode('login')} className="text-amber-500 hover:text-amber-400 text-sm font-medium">
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode !== 'forgot' && (
                    <>
                      {/* Google Sign In */}
                      <div className="flex justify-center mb-6">
                        <GoogleLogin
                          onSuccess={async (credentialResponse) => {
                            if (credentialResponse.credential) {
                              try {
                                setLoading(true);
                                await loginWithGoogle(credentialResponse.credential);
                                onClose();
                              } catch (err: any) {
                                console.error('Google Login Error:', err);
                                setError(`Login failed: ${err.message || 'Unknown error'}`);
                              } finally {
                                setLoading(false);
                              }
                            } else {
                              setError('No credential received from Google');
                            }
                          }}
                          onError={() => {
                            setError('Google Sign-In failed (Popup closed or initialization error)');
                          }}
                          theme="filled_black"
                          shape="pill"
                          width="300"
                        />
                      </div>

                      <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-zinc-700"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-zinc-900 px-2 text-zinc-500">Or</span>
                        </div>
                      </div>
                    </>
                  )}

                  {mode === 'register' && (
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  {mode !== 'forgot' && (
                    <div className="space-y-4">
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full bg-zinc-800 border border-zinc-700 text-white pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>

                      {mode === 'register' && (
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className={`w-full bg-zinc-800 border text-white pl-10 pr-12 py-3 rounded-lg focus:outline-none transition-colors ${passwordsMatch
                              ? 'border-green-500/50 focus:border-green-500'
                              : passwordsMismatch
                                ? 'border-red-500/50 focus:border-red-500'
                                : 'border-zinc-700 focus:border-amber-500'
                              }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>

                          {formData.confirmPassword && (
                            <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none">
                              {passwordsMatch && <Check size={16} className="text-green-500" />}
                              {passwordsMismatch && <AlertCircle size={16} className="text-red-500" />}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {mode === 'login' && (
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => toggleMode('forgot')}
                        className="text-amber-500 hover:text-amber-400 text-sm"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-600 text-white py-3 rounded hover:bg-amber-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? 'Loading...'
                      : mode === 'login'
                        ? 'Sign In'
                        : mode === 'register'
                          ? 'Create Account'
                          : 'Send Reset Link'}
                  </button>

                  <div className="text-center pt-4 border-t border-zinc-800">
                    {mode === 'forgot' ? (
                      <button
                        type="button"
                        onClick={() => toggleMode('login')}
                        className="text-amber-500 hover:text-amber-400 font-medium text-sm"
                      >
                        Back to Sign In
                      </button>
                    ) : (
                      <p className="text-zinc-400 text-sm">
                        {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <button
                          type="button"
                          onClick={() => toggleMode(mode === 'login' ? 'register' : 'login')}
                          className="text-amber-500 hover:text-amber-400 font-medium"
                        >
                          {mode === 'login' ? 'Sign Up' : 'Sign In'}
                        </button>
                      </p>
                    )}
                  </div>

                  {/* Demo Credentials */}
                  {/* <div className="bg-zinc-800/50 p-4 rounded text-xs text-zinc-500 space-y-1">
                    <p className="font-medium text-zinc-400 mb-2">Demo Credentials:</p>
                    <p>Customer: user@phoeniximperial.com | password</p>
                    <p>Abuja Admin: abuja.admin@phoeniximperial.com | password</p>
                    <p>Lagos Admin: lagos.admin@phoeniximperial.com | password</p>
                    <p>Super Admin: superadmin@phoeniximperial.com | password</p>
                  </div> */}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};