import { Request, Response } from 'express';
import { Branch } from '../models/Branch';

export const getAllBranches = async (req: Request, res: Response): Promise<void> => {
    try {
        const branches = await Branch.findAll();
        res.json(branches);
    } catch (error) {
        console.error('Get branches error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getBranchById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const branch = await Branch.findByPk(id);
        if (!branch) {
            res.status(404).json({ message: 'Branch not found' });
            return;
        }
        res.json(branch);
    } catch (error) {
        console.error('Get branch error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createBranch = async (req: Request, res: Response): Promise<void> => {
    try {
        const branch = await Branch.create(req.body);
        res.status(201).json(branch);
    } catch (error) {
        console.error('Create branch error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateBranch = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const [updated] = await Branch.update(req.body, { where: { id } });
        if (updated) {
            const updatedBranch = await Branch.findByPk(id);
            res.json(updatedBranch);
        } else {
            res.status(404).json({ message: 'Branch not found' });
        }
    } catch (error) {
        console.error('Update branch error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteBranch = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deleted = await Branch.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Branch not found' });
        }
    } catch (error) {
        console.error('Delete branch error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
