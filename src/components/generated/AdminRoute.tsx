import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { BranchAdminDashboard } from './BranchAdminDashboard';

export const AdminRoute: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated || !user) {
        return null; // Or a loading spinner
    }

    if (user.role === 'branch_admin' && user.branchId) {
        return (
            <BranchAdminDashboard
                branchId={user.branchId}
                onClose={() => navigate('/')}
            />
        );
    }

    // Handle Super Admin or other roles if needed, or show access denied
    if (user.role === 'super_admin') {
        return <div className="p-8 text-white">Super Admin Dashboard not yet implemented here.</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white">
            <div className="text-center">
                <h1 className="text-2xl font-serif text-amber-500 mb-4">Access Denied</h1>
                <p className="text-zinc-400 mb-6">You do not have permission to view this page.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded transition-colors"
                >
                    Return Home
                </button>
            </div>
        </div>
    );
};
