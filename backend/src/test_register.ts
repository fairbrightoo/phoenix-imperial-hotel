import axios from 'axios';

const testRegistration = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
            email: `testuser_${Date.now()}@example.com`,
            password: 'password123',
            name: 'Test User',
            phone: '1234567890'
        });
        console.log('Registration successful:', response.data);
    } catch (error: any) {
        console.error('Registration failed:', error.response?.data || error.message);
    }
};

testRegistration();
