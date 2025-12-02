import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
    authModalOpen: boolean;
    bookingModalOpen: boolean;
    dashboardOpen: boolean;
    roomsPageOpen: boolean;
    reservationPageOpen: boolean;
    aboutPageOpen: boolean;
    contactPageOpen: boolean;
    bookingInitialRoom: any | null;

    openAuth: () => void;
    closeAuth: () => void;
    openBooking: (initialRoom?: any) => void;
    closeBooking: () => void;
    openDashboard: () => void;
    closeDashboard: () => void;
    openRooms: () => void;
    closeRooms: () => void;
    openReservation: () => void;
    closeReservation: () => void;
    openAbout: () => void;
    closeAbout: () => void;
    openContact: () => void;
    closeContact: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [bookingInitialRoom, setBookingInitialRoom] = useState<any | null>(null);
    const [dashboardOpen, setDashboardOpen] = useState(false);
    const [roomsPageOpen, setRoomsPageOpen] = useState(false);
    const [reservationPageOpen, setReservationPageOpen] = useState(false);
    const [aboutPageOpen, setAboutPageOpen] = useState(false);
    const [contactPageOpen, setContactPageOpen] = useState(false);

    const openAuth = () => setAuthModalOpen(true);
    const closeAuth = () => setAuthModalOpen(false);
    const openBooking = (initialRoom?: any) => {
        setBookingInitialRoom(initialRoom || null);
        setBookingModalOpen(true);
    };
    const closeBooking = () => setBookingModalOpen(false);
    const openDashboard = () => setDashboardOpen(true);
    const closeDashboard = () => setDashboardOpen(false);
    const openRooms = () => setRoomsPageOpen(true);
    const closeRooms = () => setRoomsPageOpen(false);
    const openReservation = () => setReservationPageOpen(true);
    const closeReservation = () => setReservationPageOpen(false);
    const openAbout = () => setAboutPageOpen(true);
    const closeAbout = () => setAboutPageOpen(false);
    const openContact = () => setContactPageOpen(true);
    const closeContact = () => setContactPageOpen(false);

    return (
        <ModalContext.Provider value={{
            authModalOpen,
            bookingModalOpen,
            bookingInitialRoom,
            dashboardOpen,
            roomsPageOpen,
            reservationPageOpen,
            aboutPageOpen,
            contactPageOpen,
            openAuth,
            closeAuth,
            openBooking,
            closeBooking,
            openDashboard,
            closeDashboard,
            openRooms,
            closeRooms,
            openReservation,
            closeReservation,
            openAbout,
            closeAbout,
            openContact,
            closeContact
        }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
