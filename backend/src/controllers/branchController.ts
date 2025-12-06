import { Request, Response } from 'express';
import { Branch } from '../models/Branch';

// Helper to safely parse JSON fields including double stringification
const safeParseJSON = (data: any, fallback: any) => {
    if (typeof data === 'string') {
        try {
            const parsed = JSON.parse(data);
            // Handle double stringification
            if (typeof parsed === 'string') {
                return JSON.parse(parsed);
            }
            return parsed;
        } catch (e) {
            return fallback;
        }
    }
    // Handle array that contains a stringified JSON (common in some DB setups)
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'string' && data[0].startsWith('[')) {
        try {
            return JSON.parse(data[0]);
        } catch (e) {
            return data;
        }
    }
    return data;
};

export const getAllBranches = async (req: Request, res: Response): Promise<void> => {
    try {
        const branches = await Branch.findAll();

        const plainBranches = branches.map(b => {
            const branch = b.toJSON() as any;
            branch.images = safeParseJSON(branch.images, []);
            branch.amenities = safeParseJSON(branch.amenities, []);
            branch.policies = safeParseJSON(branch.policies, { checkIn: '14:00', checkOut: '11:00', cancellation: 'Flexible' });
            return branch;
        });

        res.json(plainBranches);
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

        const branchData = branch.toJSON() as any;
        branchData.images = safeParseJSON(branchData.images, []);
        branchData.amenities = safeParseJSON(branchData.amenities, []);
        branchData.policies = safeParseJSON(branchData.policies, { checkIn: '14:00', checkOut: '11:00', cancellation: 'Flexible' });

        res.json(branchData);
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
            if (updatedBranch) {
                const branchData = updatedBranch.toJSON() as any;
                branchData.images = safeParseJSON(branchData.images, []);
                branchData.amenities = safeParseJSON(branchData.amenities, []);
                branchData.policies = safeParseJSON(branchData.policies, { checkIn: '14:00', checkOut: '11:00', cancellation: 'Flexible' });

                res.json(branchData);
                return;
            }
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
