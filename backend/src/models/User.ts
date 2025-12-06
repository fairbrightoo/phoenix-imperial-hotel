import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class User extends Model {
    public id!: string;
    public name!: string;
    public email!: string;
    public phone!: string;
    public password_hash!: string;
    public role!: 'customer' | 'branch_admin' | 'super_admin';
    public branch_id?: string;
    public status!: 'active' | 'inactive';
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('customer', 'branch_admin', 'super_admin'),
            defaultValue: 'customer'
        },
        branch_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
