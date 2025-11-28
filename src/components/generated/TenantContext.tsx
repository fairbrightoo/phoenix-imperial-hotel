import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { createContext, useContext, useState } from 'react';
import { BranchId, Branch, TenantContextType } from './types';
import { BRANCHES } from './mockData';
const TenantContext = createContext<TenantContextType | undefined>(undefined);
export const TenantProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [currentBranch, setCurrentBranch] = useState<BranchId | null>(null);
  const selectBranch = (branchId: BranchId) => {
    setCurrentBranch(branchId);
    localStorage.setItem('almaris_selected_branch', branchId);
  };
  const getBranchData = (branchId: BranchId): Branch | undefined => {
    return BRANCHES.find(b => b.id === branchId);
  };
  return <TenantContext.Provider value={{
    currentBranch,
    branches: BRANCHES,
    selectBranch,
    getBranchData
  }} data-magicpath-id="0" data-magicpath-path="TenantContext.tsx">
      {children}
    </TenantContext.Provider>;
};
export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};