import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Room } from './Room';
import { User } from './User';

export class MaintenanceLog extends Model {
    public id!: string;
    public room_id!: string;
    public issue!: string;
    public status!: 'reported' | 'in_progress' | 'resolved';
    public reported_by!: string;
    public resolved_at?: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

MaintenanceLog.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        room_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Room,
                key: 'id'
            }
        },
        issue: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('reported', 'in_progress', 'resolved'),
            defaultValue: 'reported'
        },
        reported_by: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        resolved_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'maintenance_logs',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
