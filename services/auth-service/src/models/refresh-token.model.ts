import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '@/db/sequelize';
import { UserCredentials } from '@/models/user-credentials.model';

export interface RefreshTokenAttributes {
  id: string;
  userId: string;
  tokenId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RefreshTokenCreationAttributes extends Optional<
  RefreshTokenAttributes,
  'id' | 'createdAt' | 'updatedAt'
> {}

export class RefreshToken
  extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>
  implements RefreshTokenAttributes
{
  declare id: string;
  declare userId: string;
  declare tokenId: string;
  declare expiresAt: Date;
  declare createdAt: Date;
  declare updatedAt: Date;
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserCredentials,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    tokenId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'refresh_tokens',
    tableName: 'refresh_tokens',
    timestamps: true,
  },
);

UserCredentials.hasMany(RefreshToken, {
  foreignKey: 'userId',
  as: 'refreshTokens',
  onDelete: 'CASCADE',
});
RefreshToken.belongsTo(UserCredentials, {
  foreignKey: 'userId',
  as: 'user',
});
