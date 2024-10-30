import { IsInt, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Всегда строковое значение' })
  readonly value: string;
  @IsInt({ message: 'Всегда числовое значение' })
  readonly userId: number;
}
