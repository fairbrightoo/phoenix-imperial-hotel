import axios from 'axios';

const getBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    // Dynamic local IP handling
    const hostname = window.location.hostname;
    return `http://${hostname}:5000/api`;
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
        if (user) {
            const parsedUser = JSON.parse(user);
            // Note: In a real app, you'd store the token separately. 
            // For now, we'll assume the backend might return a token in the future login response
            // and we'd store it. If using the mock user object, we don't have a token yet.
            // But since we just implemented the backend login, we SHOULD store the token.

            const token = localStorage.getItem('phoenix_imperial_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
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
