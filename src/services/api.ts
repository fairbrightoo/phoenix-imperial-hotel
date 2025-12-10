import axios from 'axios';

const getBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    // Dynamic local IP handling
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return `http://${hostname}:5000/api`;
    }
    return '/api';
};

const API_URL = getBaseUrl();

export const getImageUrl = (path: string | undefined | null) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    // Remove /api suffix to get base domain
    const baseUrl = API_URL.endsWith('/api')
        ? API_URL.slice(0, -4)
        : API_URL;

    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
};

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token and branch ID
api.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('phoenix_imperial_user');
        if (user && user !== 'undefined') {
            try {
                const parsedUser = JSON.parse(user);
                const token = localStorage.getItem('phoenix_imperial_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (e) {
                console.warn('Corrupt user data in localStorage, clearing...');
                localStorage.removeItem('phoenix_imperial_user');
            }
        }

        const branchId = sessionStorage.getItem('phoenix_imperial_selected_branch');
        if (branchId) {
            config.headers['X-Branch-ID'] = branchId;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
