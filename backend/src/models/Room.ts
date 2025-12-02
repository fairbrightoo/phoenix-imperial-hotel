import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Branch } from './Branch';

export class Room extends Model {
    public id!: string;
    public branch_id!: string;
    public name!: string;
    public description!: string;
    public type!: string;
    public price!: number;
    public max_guests!: number;
    public size!: string;
    public amenities!: string[]; // Stored as JSON
    public images!: string[]; // Stored as JSON
    public is_available!: boolean;
    public rating!: number;
    public total_quantity!: number;
    public category!: 'room' | 'hall';
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Room.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        branch_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Branch,
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        max_guests: {
            type: DataTypes.INTEGER,
            defaultValue: 2
        },
        size: {
            type: DataTypes.STRING,
            allowNull: true
        },
        amenities: {
            type: DataTypes.JSON,
            defaultValue: []
        },
        images: {
            type: DataTypes.JSON,
            defaultValue: []
        },
        is_available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 5.0
        },
        total_quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        category: {
            type: DataTypes.ENUM('room', 'hall'),
            defaultValue: 'room',
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'rooms',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
