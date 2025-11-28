import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Phone, Mail, Check } from 'lucide-react';
import { useTenant } from './TenantContext';
import { BranchId } from './types';
interface BranchSelectorProps {
  onSelect?: (branchId: BranchId) => void;
  showSelected?: boolean;
}
export const BranchSelector: React.FC<BranchSelectorProps> = ({
  onSelect,
  showSelected = true
}) => {
  const {
    branches,
    currentBranch,
    selectBranch
  } = useTenant();
  const handleSelect = (branchId: BranchId) => {
    selectBranch(branchId);
    onSelect?.(branchId);
  };
  return <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-serif text-white mb-2">Select Your Branch</h3>
        <p className="text-zinc-400 text-sm">Choose which location you'd like to book</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {branches.map(branch => <motion.button key={branch.id} onClick={() => handleSelect(branch.id)} whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }} className={`
              relative p-6 rounded-lg border-2 transition-all text-left
              ${currentBranch === branch.id && showSelected ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-700 bg-zinc-800 hover:border-amber-500/50'}
            `}>
            {/* Selected Indicator */}
            <AnimatePresence>
              {currentBranch === branch.id && showSelected && <motion.div initial={{
            scale: 0,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} exit={{
            scale: 0,
            opacity: 0
          }} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                  <Check size={18} className="text-white" />
                </motion.div>}
            </AnimatePresence>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                <Building2 className="text-amber-500" size={24} />
              </div>
              <div>
                <h4 className="text-xl font-serif text-white mb-1">{branch.name}</h4>
                <p className="text-amber-400 text-sm uppercase tracking-wider">{branch.city}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="shrink-0 mt-0.5 text-zinc-500" />
                <span>{branch.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-zinc-500" />
                <span>{branch.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-zinc-500" />
                <span>{branch.email}</span>
              </div>
            </div>
          </motion.button>)}
      </div>
    </div>;
};