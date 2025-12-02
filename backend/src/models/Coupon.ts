import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Branch } from './Branch';

export class Coupon extends Model {
    public id!: string;
    public code!: string;
    public branch_id?: string;
    public discount_type!: 'percentage' | 'fixed';
    public value!: number;
    public max_uses!: number;
    public expires_at!: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Coupon.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        branch_id: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: Branch,
                key: 'id'
            }
        },
        discount_type: {
            type: DataTypes.ENUM('percentage', 'fixed'),
            allowNull: false
        },
        value: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        max_uses: {
            type: DataTypes.INTEGER,
            defaultValue: 100
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'coupons',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
