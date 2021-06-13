import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as moment from 'moment';

export function IsAfterNow(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsAfterNowConstraint,
    });
  };
}
@ValidatorConstraint({ name: 'IsAfterNow', async: false })
export class IsAfterNowConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string) {
    return moment(propertyValue).diff(Date.now(), 'minutes') > 10;
  }

  defaultMessage(args: ValidationArguments) {
    return `"${args.property}" must be before "${args.constraints[0]}"`;
  }
}
