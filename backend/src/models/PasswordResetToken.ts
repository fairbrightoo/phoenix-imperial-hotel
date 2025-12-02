import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class PasswordResetToken extends Model {
    public id!: string;
    public email!: string;
    public token!: string;
    public expires_at!: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

PasswordResetToken.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'password_reset_tokens',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
