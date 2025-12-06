
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/branches';

async function testBranchGalleryPersistence() {
    try {
        // 1. Get all branches to find one to test
        console.log('Fetching branches...');
        const branchesRes = await axios.get(API_URL);
        const branches = branchesRes.data;

        if (!branches || branches.length === 0) {
            console.error('No branches found to test.');
            return;
        }

        const testBranch = branches[0];
        console.log(`Testing with branch: ${testBranch.name} (${testBranch.id})`);

        // 2. Define test gallery data
        const testGallery = [
            {
                id: 'test-img-1',
                branchId: testBranch.id,
                imageUrl: 'http://example.com/image1.jpg',
                title: 'Test Image 1',
                category: 'Rooms',
                uploadedAt: new Date().toISOString()
            },
            {
                id: 'test-img-2',
                branchId: testBranch.id,
                imageUrl: 'http://example.com/image2.jpg',
                title: 'Test Image 2',
                category: 'Exterior',
                uploadedAt: new Date().toISOString()
            }
        ];

        // 3. Update the branch with new gallery data
        console.log('Updating branch gallery...');
        await axios.put(`${API_URL}/${testBranch.id}`, {
            images: testGallery
        });

        // 4. Fetch the branch again to verify persistence
        console.log('Refetching branch to verify...');
        const verifyRes = await axios.get(`${API_URL}/${testBranch.id}`);
        const updatedBranch = verifyRes.data;

        console.log('Updated Branch Images Type:', typeof updatedBranch.images);
        console.log('Is Array:', Array.isArray(updatedBranch.images));

        if (Array.isArray(updatedBranch.images) && updatedBranch.images.length === 2) {
            console.log('SUCCESS: Gallery data persisted correctly as an array.');
            console.log('First Image URL:', updatedBranch.images[0].imageUrl);
        } else {
            console.error('FAILURE: Gallery data mismatch or type error.');
            console.log('Received:', JSON.stringify(updatedBranch.images, null, 2));
        }

    } catch (error: any) {
        console.error('Test failed:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

testBranchGalleryPersistence();
