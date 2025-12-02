import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertProps {
    message: string;
    type: AlertType;
    isVisible: boolean;
    onClose: () => void;
}

export const Alert: React.FC<AlertProps> = ({ message, type, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000); // Auto close after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircle className="text-green-400" size={20} />;
            case 'error': return <AlertCircle className="text-red-400" size={20} />;
            case 'warning': return <AlertTriangle className="text-amber-400" size={20} />;
            case 'info': return <Info className="text-blue-400" size={20} />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case 'success': return 'bg-green-500/10 border-green-500/20 text-green-200';
            case 'error': return 'bg-red-500/10 border-red-500/20 text-red-200';
            case 'warning': return 'bg-amber-500/10 border-amber-500/20 text-amber-200';
            case 'info': return 'bg-blue-500/10 border-blue-500/20 text-blue-200';
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -50, x: '-50%' }}
                    className={`fixed top-6 left-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-lg border shadow-xl backdrop-blur-md min-w-[320px] max-w-md ${getStyles()}`}
                >
                    {getIcon()}
                    <p className="flex-1 text-sm font-medium">{message}</p>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={16} className="opacity-70" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
