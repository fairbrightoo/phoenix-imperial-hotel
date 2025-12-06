import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generate unique filename: timestamp-random-originalName
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter
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
            // A Multer error occurred when uploading.
            console.error('Multer error:', err);
            return res.status(400).json({ message: `Upload error: ${err.message}` });
        } else if (err) {
            // An unknown error occurred when uploading.
            console.error('Unknown upload error:', err);
            return res.status(500).json({ message: 'An unknown error occurred during upload.' });
        }

        // Everything went fine.
        try {
            if (!req.file) {
                res.status(400).json({ message: 'No file uploaded' });
                return;
            }

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
