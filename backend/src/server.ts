import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
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


sequelize.sync().then(() => {
    console.log('Database connected and synced');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});
