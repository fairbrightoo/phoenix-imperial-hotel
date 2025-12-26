import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'chsbffdru',
    api_key: '167489521629744',
    api_secret: 'tNPaaJCXvVdrxUssIAj-LnpX-gA'
});

// Configure storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'phoenix-hotel',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }] // Optimize images on upload
    } as any
});

// File filter (still good to have, though allowed_formats handles most)
const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Upload endpoint
router.post('/', (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            return res.status(400).json({ message: `Upload error: ${err.message}` });
        } else if (err) {
            console.error('Unknown upload error:', err);
            return res.status(500).json({ message: 'An unknown error occurred during upload.' });
        }

        try {
            if (!req.file) {
                res.status(400).json({ message: 'No file uploaded' });
                return;
            }

            // Cloudinary storage puts the URL in `path` or `secure_url`
            // multer-storage-cloudinary usually populates req.file.path with the secure URL
            const fileUrl = req.file.path;

            res.status(200).json({
                message: 'File uploaded successfully',
                url: fileUrl,
                filename: req.file.filename
            });
        } catch (error) {
            console.error('Post-upload processing error:', error);
            res.status(500).json({ message: 'File upload processing failed' });
        }
    });
});


// Return relative path with forward slashes
const fileUrl = `/uploads/${req.file.filename}`;

res.status(200).json({
    message: 'File uploaded successfully',
    url: fileUrl,
    filename: req.file.filename
});
        } catch (error) {
    console.error('Post-upload processing error:', error);
    res.status(500).json({ message: 'File upload processing failed' });
}
    });
});

export default router;
