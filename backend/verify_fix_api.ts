
import axios from 'axios';

async function checkApi() {
    try {
        const response = await axios.get('http://localhost:5000/api/branches');
        const branches = response.data;
        const enugu = branches.find((b: any) => b.name.includes('Enugu') || b.city.includes('Enugu'));

        if (enugu) {
            console.log('Enugu Branch Policies Type:', typeof enugu.policies);
            console.log('Enugu Branch Amenities Type:', typeof enugu.amenities);
            console.log('Enugu Branch Images Type:', typeof enugu.images);

            if (typeof enugu.policies === 'object' && typeof enugu.amenities === 'object') {
                console.log('SUCCESS: Policies and Amenities are objects.');
                console.log(JSON.stringify(enugu.policies, null, 2));
            } else {
                console.log('FAILURE: Policies or Amenities are still strings.');
            }
        } else {
            console.log('Enugu branch not found via API.');
        }
    } catch (error) {
        console.error('API Error:', error);
    }
}

checkApi();
