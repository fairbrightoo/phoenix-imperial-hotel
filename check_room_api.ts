import axios from 'axios';

const checkRoomApi = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/rooms?branchId=phoenix-imperial'); // Correct branch ID
        // If the API requires authentication, this might fail. 
        // But usually GET /rooms is public or we can try.
        // If it fails, I'll need to login first.

        const rooms = response.data;
        const phoenixDeluxe = rooms.find((r: any) => r.name === 'Phoenix Deluxe');

        if (phoenixDeluxe) {
            console.log('Room found:', phoenixDeluxe.name);
            console.log('Images:', phoenixDeluxe.images);
        } else {
            console.log('Room "Phoenix Deluxe" not found in response.');
            console.log('Available rooms:', rooms.map((r: any) => r.name));
        }
    } catch (error: any) {
        console.error('Error fetching rooms:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
};

checkRoomApi();
