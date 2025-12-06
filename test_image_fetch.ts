import axios from 'axios';

const testImageFetch = async () => {
    try {
        // Try to fetch one of the existing images found in the directory listing
        const filename = '1764815139125-189963641.jpg';
        const url = `http://localhost:5000/uploads/${filename}`;
        console.log(`Fetching ${url}...`);

        const response = await axios.get(url);
        console.log('Response status:', response.status);
        console.log('Headers:', response.headers['content-type']);

        if (response.status === 200) {
            console.log('SUCCESS: Image fetched successfully.');
        } else {
            console.log('FAILURE: Image fetch returned non-200 status.');
        }
    } catch (error: any) {
        console.error('FAILURE: Error fetching image:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
        }
    }
};

testImageFetch();
