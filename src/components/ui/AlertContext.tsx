import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alert, AlertType } from './Alert';

interface AlertContextType {
    showAlert: (message: string, type?: AlertType) => void;
    hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [alertState, setAlertState] = useState<{
        message: string;
        type: AlertType;
        isVisible: boolean;
    }>({
        message: '',
        type: 'info',
        isVisible: false
    });

    const showAlert = useCallback((message: string, type: AlertType = 'info') => {
        setAlertState({
            message,
            type,
            isVisible: true
        });
    }, []);

    const hideAlert = useCallback(() => {
        setAlertState(prev => ({ ...prev, isVisible: false }));
    }, []);

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            <Alert
                message={alertState.message}
                type={alertState.type}
                isVisible={alertState.isVisible}
                onClose={hideAlert}
            />
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
