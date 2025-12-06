import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// You might need a valid token here if endpoints are protected. 
// For now, let's try to hit them. If they return 401, we know auth is the issue.
// If I can't easily get a token, I might need to temporarily disable auth middleware or login first.

async function debugApi() {
    try {
        console.log('Testing API connection...');

        // 1. Login to get a token (assuming we have a super admin user)
        // I'll try a known default or just try to hit endpoints if they are public (likely not)
        // Let's try to login first.
        let token = '';
        try {
            const loginRes = await axios.post(`${API_URL}/auth/login`, {
                email: 'admin@phoenix.com', // Try a default or guess, or maybe I can skip this if I can't guess.
                password: 'password123'
            });
            token = loginRes.data.token;
            console.log('Login successful, got token.');
        } catch (e) {
            console.log('Login failed (expected if creds are wrong). Proceeding without token to see if that is the issue.');
        }

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        console.log('\n--- Fetching Bookings ---');
        try {
            const bookings = await axios.get(`${API_URL}/bookings`, { headers });
            console.log(`Status: ${bookings.status}`);
            console.log(`Count: ${bookings.data.length}`);
            console.log('Sample:', bookings.data[0]);
        } catch (e: any) {
            console.error('Failed to fetch bookings:', e.message, e.response?.status);
        }

        console.log('\n--- Fetching Rooms ---');
        try {
            const rooms = await axios.get(`${API_URL}/rooms`, { headers });
            console.log(`Status: ${rooms.status}`);
            console.log(`Count: ${rooms.data.length}`);
            console.log('Sample:', rooms.data[0]);
        } catch (e: any) {
            console.error('Failed to fetch rooms:', e.message, e.response?.status);
        }

        console.log('\n--- Fetching Users ---');
        try {
            const users = await axios.get(`${API_URL}/users`, { headers });
            console.log(`Status: ${users.status}`);
            console.log(`Count: ${users.data.length}`);
            console.log('Sample:', users.data[0]);
        } catch (e: any) {
            console.error('Failed to fetch users:', e.message, e.response?.status);
        }

    } catch (error) {
        console.error('Fatal error:', error);
    }
}

debugApi();
