import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { Role } from 'src/role/role.model';
import { UserRoles } from 'src/role/user-role.model';

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: true;
  @Column({
    type: DataType.STRING,
  })
  banReason: string;
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
