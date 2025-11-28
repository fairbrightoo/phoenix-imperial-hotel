import { SortableContainer } from "@/dnd-kit/SortableContainer";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BranchId, Branch, TenantContextType } from './types';
import { BRANCHES } from './mockData';
const TenantContext = createContext<TenantContextType | undefined>(undefined);
export const TenantProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [currentBranch, setCurrentBranch] = useState<BranchId | null>(null);
  const [branchSessionTimestamp, setBranchSessionTimestamp] = useState<number | null>(null);

  // Load saved branch from session storage (not localStorage to prevent cross-session conflicts)
  useEffect(() => {
    const savedBranch = sessionStorage.getItem('phoenix_imperial_selected_branch');
    const savedTimestamp = sessionStorage.getItem('phoenix_imperial_branch_session_timestamp');
    if (savedBranch && savedTimestamp) {
      setCurrentBranch(savedBranch as BranchId);
      setBranchSessionTimestamp(parseInt(savedTimestamp));
    }
  }, []);
  const selectBranch = (branchId: BranchId) => {
    const timestamp = Date.now();

    // Update state
    setCurrentBranch(branchId);
    setBranchSessionTimestamp(timestamp);

    // Store in sessionStorage to prevent conflicts across tabs/windows
    // Each tab/window will have its own independent branch selection
    sessionStorage.setItem('phoenix_imperial_selected_branch', branchId);
    sessionStorage.setItem('phoenix_imperial_branch_session_timestamp', timestamp.toString());

    // Log branch switch for debugging (can be removed in production)
    console.log(`[Multi-tenant Session] Switched to ${branchId} branch at ${new Date(timestamp).toLocaleTimeString()}`);
  };
  const getBranchData = (branchId: BranchId): Branch | undefined => {
    return BRANCHES.find(b => b.id === branchId);
  };
  const clearBranchSelection = () => {
    setCurrentBranch(null);
    setBranchSessionTimestamp(null);
    sessionStorage.removeItem('phoenix_imperial_selected_branch');
    sessionStorage.removeItem('phoenix_imperial_branch_session_timestamp');
  };
  return <TenantContext.Provider value={{
    currentBranch,
    branches: BRANCHES,
    selectBranch,
    getBranchData,
    clearBranchSelection,
    branchSessionTimestamp
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