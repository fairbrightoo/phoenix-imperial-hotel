import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Booking } from './Booking';

export class Transaction extends Model {
    public id!: string;
    public booking_id!: string;
    public amount!: number;
    public type!: 'payment' | 'refund';
    public status!: 'success' | 'failed' | 'pending';
    public reference!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Transaction.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        booking_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Booking,
                key: 'id'
            }
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('payment', 'refund'),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('success', 'failed', 'pending'),
            defaultValue: 'pending'
        },
        reference: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'transactions',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
