import axios from 'axios';

const checkApi = async () => {
    try {
        console.log('Fetching rooms from API...');
        const response = await axios.get('http://localhost:5000/api/rooms'); // Adjust query if needed

        const rooms = response.data;
        console.log(`Got ${rooms.length} rooms`);

        const phoenixRoom = rooms.find((r: any) => r.name.includes('Phoenix Deluxe'));
        if (phoenixRoom) {
            console.log('Found Phoenix Deluxe room:');
            console.log('Images Type:', typeof phoenixRoom.images);
            console.log('Is Array:', Array.isArray(phoenixRoom.images));
            console.log('First Image:', phoenixRoom.images[0]);
        } else {
            console.log('Phoenix Deluxe room not found in API response');
            console.log('Available rooms:', rooms.map((r: any) => r.name));
        }

    } catch (error: any) {
        console.error('API Error:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
};

checkApi();
