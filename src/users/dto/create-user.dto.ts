import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUser {
  @IsString({ message: 'Всегда строковое значение' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;
  @IsString({ message: 'Всегда строковое значение' })
  @Length(4, 16, { message: 'Пароль должен быть от 4 до 16 символов' })
  readonly password: string;
}
