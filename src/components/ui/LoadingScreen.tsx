import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[100] bg-zinc-950 flex items-center justify-center">
            <div className="flex items-center gap-6">
                {/* Animated Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -10, 0] // Floating effect
                    }}
                    transition={{
                        duration: 1.5,
                        y: {
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut"
                        }
                    }}
                    className="w-24 h-24 md:w-32 md:h-32 relative"
                >
                    {/* Subtle Glow behind logo */}
                    <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full" />

                    <img
                        src="/phoenix-logo.svg"
                        alt="Phoenix Imperial"
                        className="w-full h-full object-contain relative z-10 animate-wing-flap"
                    />
                </motion.div>

                {/* Text Reveal */}
                <div className="flex flex-col">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-3xl md:text-5xl font-serif text-amber-500 tracking-wider"
                    >
                        Phoenix
                    </motion.h1>
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-sm md:text-lg text-zinc-400 uppercase tracking-[0.3em] ml-1"
                    >
                        Imperial
                    </motion.span>
                </div>
            </div>
        </div>
    );
};
