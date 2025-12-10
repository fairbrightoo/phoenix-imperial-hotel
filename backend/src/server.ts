import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import authRoutes from './routes/authRoutes';
import branchRoutes from './routes/branchRoutes';
import roomRoutes from './routes/roomRoutes';
import bookingRoutes from './routes/bookingRoutes';
import userRoutes from './routes/userRoutes';

// Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windows
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
// Apply to all requests
app.use(limiter);

app.use('/uploads', express.static('uploads'));



import uploadRoutes from './routes/uploadRoutes';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

// Start Server
import sequelize from './config/database';
import './models/associations'; // Import associations


// Custom migration function to avoid sync({ alter: true }) hanging
const ensureDatabaseSchema = async () => {
    try {
        const queryInterface = sequelize.getQueryInterface();
        const table = await queryInterface.describeTable('branches');

        if (!table.testimonials) {
            console.log('Adding missing testimonials column to branches table...');
            await queryInterface.addColumn('branches', 'testimonials', {
                type: (sequelize.Sequelize || require('sequelize')).DataTypes.JSON,
                allowNull: true
            });
            console.log('Successfully added testimonials column.');
        }
    } catch (error) {
        console.warn('Manual schema update failed (non-critical if already exists):', error);
    }
};

sequelize.sync().then(async () => {
    console.log('Database connected and synced (base)');
    await ensureDatabaseSchema();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});
