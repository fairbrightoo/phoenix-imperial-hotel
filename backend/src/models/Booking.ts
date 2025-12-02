import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { Branch } from './Branch';
import { Room } from './Room';

export class Booking extends Model {
    public id!: string;
    public user_id!: string;
    public branch_id!: string;
    public room_id!: string;
    public check_in!: Date;
    public check_out!: Date;
    public guests!: { adults: number; children: number }; // JSON
    public total_price!: number;
    public status!: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    public special_requests!: string;
    public payment_status!: 'pending' | 'paid' | 'failed';
    public payment_reference!: string;
    public guest_name!: string;
    public guest_email!: string;
    public guest_phone!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Booking.init(
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
        branch_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Branch,
                key: 'id'
            }
        },
        room_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Room,
                key: 'id'
            }
        },
        check_in: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        check_out: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        guests: {
            type: DataTypes.JSON,
            allowNull: false
        },
        total_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
            defaultValue: 'pending'
        },
        special_requests: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        payment_status: {
            type: DataTypes.ENUM('pending', 'paid', 'failed'),
            defaultValue: 'pending'
        },
        payment_reference: {
            type: DataTypes.STRING,
            allowNull: true
        },
        guest_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        guest_email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        guest_phone: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'bookings',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
