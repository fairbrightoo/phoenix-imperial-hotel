import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import { User } from '../models/User';
import { PasswordResetToken } from '../models/PasswordResetToken';
import { emailService } from '../services/EmailService';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user: User) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role, branch_id: user.branch_id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
    );
};

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name, phone } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password_hash: hashedPassword,
            phone,
            role: 'customer' // Default role
        });

        // Generate token
        const token = generateToken(user);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                role: user.role,
                branchId: user.branch_id,
                createdAt: user.created_at
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for:', email);

        // Check user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('User not found:', email);
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        console.log('User found:', user.email, 'Hash:', user.password_hash);

        // Check if user is active
        if (user.status === 'inactive') {
            res.status(403).json({ message: 'Account is inactive. Please contact support.' });
            return;
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            console.log('Password mismatch for:', email);
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate token
        const token = generateToken(user);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                role: user.role,
                branchId: user.branch_id,
                createdAt: user.created_at
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();

        if (!payload) {
            res.status(400).json({ message: 'Invalid Google token' });
            return;
        }

        const { email, name, sub: googleId } = payload;

        if (!email) {
            res.status(400).json({ message: 'Email not found in Google token' });
            return;
        }

        // Check if user exists
        let user = await User.findOne({ where: { email } });

        if (!user) {
            // Create new user
            user = await User.create({
                name: name || 'Google User',
                email,
                password_hash: await bcrypt.hash(Math.random().toString(36), 10), // Random password
                phone: '',
                role: 'customer',
                // google_id: googleId // Assuming you might want to store this later
            });
        }

        // Generate token
        const jwtToken = generateToken(user);

        res.json({
            message: 'Google login successful',
            token: jwtToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                role: user.role,
                branchId: user.branch_id,
                createdAt: user.created_at
            }
        });
    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({ message: 'Google login failed' });
    }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            // For security, don't reveal if user exists
            res.json({ message: 'If an account exists with this email, a reset link has been sent.' });
            return;
        }

        // Generate token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000); // 1 hour

        // Save token
        await PasswordResetToken.create({
            email,
            token,
            expires_at: expiresAt
        });

        const resetLink = `http://localhost:5173/reset-password?token=${token}&email=${email}`;

        // Send email via EmailService
        try {
            await emailService.sendPasswordResetEmail(email, resetLink);
        } catch (emailError) {
            console.error('Failed to send email, but token generated:', emailError);
        }

        res.json({ message: 'If an account exists with this email, a reset link has been sent.' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token, email, password } = req.body;

        // Verify token
        const resetToken = await PasswordResetToken.findOne({
            where: {
                email,
                token
            }
        });

        if (!resetToken) {
            res.status(400).json({ message: 'Invalid or expired reset token' });
            return;
        }

        if (new Date() > resetToken.expires_at) {
            res.status(400).json({ message: 'Reset token has expired' });
            return;
        }

        // Update user password
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password_hash = hashedPassword;
        await user.save();

        // Delete used token (and potentially all tokens for this user)
        await PasswordResetToken.destroy({ where: { email } });

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const seedData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { secret } = req.query;
        if (secret !== process.env.JWT_SECRET) {
            res.status(403).json({ message: 'Forbidden' });
            return;
        }

        const { seedDatabase } = await import('../seed');
        await seedDatabase();
        res.json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error('Seeding error:', error);
        res.status(500).json({ message: 'Seeding failed', error: (error as Error).message });
    }
};
