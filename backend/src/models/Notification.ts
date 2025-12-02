import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';

export class Notification extends Model {
    public id!: string;
    public user_id!: string;
    public title!: string;
    public message!: string;
    public is_read!: boolean;
    public type!: 'booking' | 'system' | 'promo';
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Notification.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        type: {
            type: DataTypes.ENUM('booking', 'system', 'promo'),
            defaultValue: 'system'
        }
    },
    {
        sequelize,
        tableName: 'notifications',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
