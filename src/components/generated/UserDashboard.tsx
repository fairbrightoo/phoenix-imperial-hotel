import { SortableContainer } from "@/dnd-kit/SortableContainer";
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
  mpid?: string;
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
    return <AnimatePresence data-magicpath-id="0" data-magicpath-path="UserDashboard.tsx">
        <motion.div data-magicpath-motion-tag="motion.div" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50" data-magicpath-id="1" data-magicpath-path="UserDashboard.tsx" />
        <SortableContainer dndKitId="e61d1a40-9399-46e7-8d35-3282ec05f495" containerType="regular" prevTag="motion.div" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} className="fixed inset-4 md:inset-8 bg-zinc-900 rounded-lg shadow-2xl z-50 overflow-hidden border border-zinc-800" data-magicpath-id="2" data-magicpath-path="UserDashboard.tsx">
          <SuperAdminDashboard onClose={onClose} data-magicpath-id="3" data-magicpath-path="UserDashboard.tsx" />
        </SortableContainer>
      </AnimatePresence>;
  }
  if (user.role === 'branch_admin') {
    return <AnimatePresence data-magicpath-id="4" data-magicpath-path="UserDashboard.tsx">
        <motion.div data-magicpath-motion-tag="motion.div" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50" data-magicpath-id="5" data-magicpath-path="UserDashboard.tsx" />
        <SortableContainer dndKitId="4520b2bb-8100-42e4-96c0-c9573a1e6918" containerType="regular" prevTag="motion.div" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} className="fixed inset-4 md:inset-8 bg-zinc-900 rounded-lg shadow-2xl z-50 overflow-hidden border border-zinc-800" data-magicpath-id="6" data-magicpath-path="UserDashboard.tsx">
          <BranchAdminDashboard onClose={onClose} data-magicpath-id="7" data-magicpath-path="UserDashboard.tsx" />
        </SortableContainer>
      </AnimatePresence>;
  }

  // Customer dashboard
  return <AnimatePresence data-magicpath-id="8" data-magicpath-path="UserDashboard.tsx">
      <motion.div data-magicpath-motion-tag="motion.div" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" data-magicpath-id="9" data-magicpath-path="UserDashboard.tsx" />
      <SortableContainer dndKitId="fcf75022-d2d7-4120-a564-0c548ad69f4e" containerType="regular" prevTag="motion.div" initial={{
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
    }} className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-zinc-900 rounded-lg shadow-2xl z-50 overflow-hidden border border-zinc-800" data-magicpath-id="10" data-magicpath-path="UserDashboard.tsx">
        <CustomerDashboard onClose={onClose} data-magicpath-id="11" data-magicpath-path="UserDashboard.tsx" />
      </SortableContainer>
    </AnimatePresence>;
};