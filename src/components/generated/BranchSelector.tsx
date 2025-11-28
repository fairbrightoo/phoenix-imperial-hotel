import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Phone, Mail, Check } from 'lucide-react';
import { useTenant } from './TenantContext';
import { BranchId } from './types';
interface BranchSelectorProps {
  onSelect?: (branchId: BranchId) => void;
  showSelected?: boolean;
  mpid?: string;
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
  return <SortableContainer dndKitId="0efe97a6-7b47-42f9-9b56-989b0813781d" containerType="regular" prevTag="div" className="space-y-4" data-magicpath-id="0" data-magicpath-path="BranchSelector.tsx">
      <SortableContainer dndKitId="25a69c0b-87c7-4dac-b663-463c2b8ba1df" containerType="regular" prevTag="div" className="text-center mb-6" data-magicpath-id="1" data-magicpath-path="BranchSelector.tsx">
        <h3 className="text-2xl font-serif text-white mb-2" data-magicpath-id="2" data-magicpath-path="BranchSelector.tsx">Select Your Branch</h3>
        <p className="text-zinc-400 text-sm" data-magicpath-id="3" data-magicpath-path="BranchSelector.tsx">Choose which location you'd like to book</p>
      </SortableContainer>

      <SortableContainer dndKitId="24c8db2c-e3c7-4208-9f78-f758b44dffc5" containerType="collection" prevTag="div" className="grid md:grid-cols-2 gap-6" data-magicpath-id="4" data-magicpath-path="BranchSelector.tsx">
        {branches.map(branch => <motion.button data-magicpath-motion-tag="motion.button" key={branch.id} onClick={() => handleSelect(branch.id)} whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }} className={`
              relative p-6 rounded-lg border-2 transition-all text-left
              ${currentBranch === branch.id && showSelected ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-700 bg-zinc-800 hover:border-amber-500/50'}
            `} data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="5" data-magicpath-path="BranchSelector.tsx">
            {/* Selected Indicator */}
            <AnimatePresence data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="6" data-magicpath-path="BranchSelector.tsx">
              {currentBranch === branch.id && showSelected && <motion.div data-magicpath-motion-tag="motion.div" initial={{
            scale: 0,
            opacity: 0
          }} animate={{
            scale: 1,
            opacity: 1
          }} exit={{
            scale: 0,
            opacity: 0
          }} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="7" data-magicpath-path="BranchSelector.tsx">
                  <Check size={18} className="text-white" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="8" data-magicpath-path="BranchSelector.tsx" />
                </motion.div>}
            </AnimatePresence>

            <div className="flex items-start gap-4 mb-4" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="9" data-magicpath-path="BranchSelector.tsx">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="10" data-magicpath-path="BranchSelector.tsx">
                <Building2 className="text-amber-500" size={24} data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="11" data-magicpath-path="BranchSelector.tsx" />
              </div>
              <div data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="12" data-magicpath-path="BranchSelector.tsx">
                <h4 className="text-xl font-serif text-white mb-1" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="name:unknown" data-magicpath-id="13" data-magicpath-path="BranchSelector.tsx">{branch.name}</h4>
                <p className="text-amber-400 text-sm uppercase tracking-wider" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="city:unknown" data-magicpath-id="14" data-magicpath-path="BranchSelector.tsx">{branch.city}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-zinc-400" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="15" data-magicpath-path="BranchSelector.tsx">
              <div className="flex items-start gap-2" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="16" data-magicpath-path="BranchSelector.tsx">
                <MapPin size={16} className="shrink-0 mt-0.5 text-zinc-500" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="17" data-magicpath-path="BranchSelector.tsx" />
                <span data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="address:unknown" data-magicpath-id="18" data-magicpath-path="BranchSelector.tsx">{branch.address}</span>
              </div>
              <div className="flex items-center gap-2" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="19" data-magicpath-path="BranchSelector.tsx">
                <Phone size={16} className="shrink-0 text-zinc-500" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="20" data-magicpath-path="BranchSelector.tsx" />
                <span data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="phone:unknown" data-magicpath-id="21" data-magicpath-path="BranchSelector.tsx">{branch.phone}</span>
              </div>
              <div className="flex items-center gap-2" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="22" data-magicpath-path="BranchSelector.tsx">
                <Mail size={16} className="shrink-0 text-zinc-500" data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-id="23" data-magicpath-path="BranchSelector.tsx" />
                <span data-magicpath-uuid={(branch as any)["mpid"] ?? "unsafe"} data-magicpath-field="email:unknown" data-magicpath-id="24" data-magicpath-path="BranchSelector.tsx">{branch.email}</span>
              </div>
            </div>
          </motion.button>)}
      </SortableContainer>
    </SortableContainer>;
};