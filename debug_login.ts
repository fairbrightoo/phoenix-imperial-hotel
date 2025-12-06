import axios from 'axios';

const testLogin = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'abuja.admin@phoeniximperial.com',
            password: 'password123' // Assuming default from seed, or I'll try others
        });
        console.log('Login successful:', response.data);
    } catch (error: any) {
        console.error('Login failed:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
};

testLogin();
