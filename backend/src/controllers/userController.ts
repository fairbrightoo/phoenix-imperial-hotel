import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id; // From auth middleware
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password_hash'] }
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(user);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const { name, phone, password } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password_hash = await bcrypt.hash(password, salt);
        }

        await user.save();

        const updatedUser = user.toJSON();
        delete (updatedUser as any).password_hash;

        res.json(updatedUser);
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name, phone, role, branchId } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password_hash: hashedPassword,
            phone,
            role,
            branch_id: branchId,
            status: 'active'
        });

        const userResponse = user.toJSON();
        delete (userResponse as any).password_hash;

        res.status(201).json(userResponse);
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, email, phone, role, branchId, status, password } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (role) user.role = role;
        if (branchId !== undefined) user.branch_id = branchId;
        if (status) user.status = status;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password_hash = await bcrypt.hash(password, salt);
        }

        await user.save();

        const updatedUser = user.toJSON();
        delete (updatedUser as any).password_hash;

        res.json(updatedUser);
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password_hash'] },
            order: [['created_at', 'DESC']]
        });
        res.json(users);
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
