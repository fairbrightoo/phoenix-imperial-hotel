import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Branch extends Model {
    public id!: string;
    public name!: string;
    public city!: string;
    public address!: string;
    public phone!: string;
    public email!: string;
    public timezone!: string;
    public currency!: string;
    public status!: 'active' | 'inactive';
    public description!: string;
    public amenities!: string[];
    public images!: any[]; // Using any[] for now to support both string/json during transition
    public testimonials!: any[];
    public policies!: any;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Branch.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        timezone: {
            type: DataTypes.STRING,
            defaultValue: 'Africa/Lagos'
        },
        currency: {
            type: DataTypes.STRING,
            defaultValue: 'NGN'
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        amenities: {
            type: DataTypes.JSON,
            allowNull: true
        },
        images: {
            type: DataTypes.JSON,
            allowNull: true
        },
        testimonials: {
            type: DataTypes.JSON,
            allowNull: true
        },
        policies: {
            type: DataTypes.JSON,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'branches',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
