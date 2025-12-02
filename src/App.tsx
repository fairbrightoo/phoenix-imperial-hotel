import { useMemo } from 'react';
import { Container, Theme } from './settings/types';
import { AdminRoute } from './components/generated/AdminRoute';
import { ResetPasswordPage } from './components/generated/ResetPasswordPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MultitenantHotel } from './components/generated/MultitenantHotel';
import { AuthProvider } from './components/generated/AuthContext';
import { TenantProvider } from './components/generated/TenantContext';
import { ThemeProvider } from './components/generated/ThemeContext';
import { ModalProvider } from './components/generated/ModalContext';
import { AlertProvider } from './components/ui/AlertContext';

let theme: Theme = 'dark';
// only use 'centered' container for standalone components, never for full page apps or websites.
let container: Container = 'none';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  const content = (
    <ThemeProvider>
      <AlertProvider>
        <AuthProvider>
          <TenantProvider>
            <ModalProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<MultitenantHotel />} />
                  <Route path="/admin/branch" element={<AdminRoute />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                </Routes>
              </BrowserRouter>
            </ModalProvider>
          </TenantProvider>
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );

  if (container === 'centered') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {content}
      </div>
    );
  } else {
    return content;
  }
}

export default App;