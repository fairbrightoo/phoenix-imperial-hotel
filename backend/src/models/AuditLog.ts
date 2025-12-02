import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';

export class AuditLog extends Model {
    public id!: string;
    public user_id!: string;
    public action!: string;
    public details!: any; // JSON
    public ip_address!: string;
    public readonly created_at!: Date;
}

AuditLog.init(
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
        action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        details: {
            type: DataTypes.JSON,
            allowNull: true
        },
        ip_address: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: 'audit_logs',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false // No updated_at for logs
    }
);
