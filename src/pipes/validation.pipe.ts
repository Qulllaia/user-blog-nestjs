import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exception/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const obj = plainToClass(metatype, value);
    const errors = await validate(obj);
    if (errors.length) {
      let message = errors.map((err) => {
        if (err.constraints !== undefined)
          return `${err.property} - ${Object.values(err.constraints).join(' ')}`;
      });
      throw new ValidationException(message);
    }

    return value;
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
