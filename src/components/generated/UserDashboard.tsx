import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from './AuthContext';
import { BranchAdminDashboard } from './BranchAdminDashboard';
import { SuperAdminDashboard } from './SuperAdminDashboard';
import { CustomerDashboard } from './CustomerDashboard';
interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}
export const UserDashboard: React.FC<UserDashboardProps> = ({
  isOpen,
  onClose
}) => {
  const {
    user
  } = useAuth();
  if (!isOpen || !user) return null;

  // Render different dashboards based on user role
  if (user.role === 'super_admin') {
    return <AnimatePresence>
      <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50" />
      <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} className="fixed inset-4 md:inset-8 bg-zinc-900 rounded-lg shadow-2xl z-50 overflow-hidden border border-zinc-800">
        <SuperAdminDashboard onClose={onClose} />
      </motion.div>
    </AnimatePresence>;
  }
  if (user.role === 'branch_admin') {
    return <AnimatePresence>
      <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50" />
      <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} className="fixed inset-4 md:inset-8 bg-zinc-900 rounded-lg shadow-2xl z-50 overflow-hidden border border-zinc-800">
        <BranchAdminDashboard branchId={user.branchId!} onClose={onClose} />
      </motion.div>
    </AnimatePresence>;
  }

  // Customer dashboard
  return <AnimatePresence>
    <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
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
    }} className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-zinc-900 rounded-lg shadow-2xl z-50 overflow-hidden border border-zinc-800">
      <CustomerDashboard onClose={onClose} />
    </motion.div>
  </AnimatePresence>;
};