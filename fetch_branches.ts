import axios from 'axios';

const fetchBranches = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/branches');
        console.log('Branches:', response.data.map((b: any) => ({ id: b.id, name: b.name })));
    } catch (error: any) {
        console.error('Error fetching branches:', error.message);
    }
};

fetchBranches();
