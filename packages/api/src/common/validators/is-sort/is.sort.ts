import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

type SortDirection = 'asc' | 'desc';

interface SortValue {
  field: string;
  direction: SortDirection;
}

/**
 * Validator constraint for checking sort parameter format.
 * Expected format: "fieldName,direction" where direction is either 'ASC' or 'DESC'
 * Example: "createdAt,DESC" or "name,ASC"
 */
@ValidatorConstraint({ name: 'IsSort', async: false })
export class IsValueSort implements ValidatorConstraintInterface {
  /**
   * Validates a sort parameter string
   * @param value - The sort parameter string to validate
   * @returns boolean indicating if the value is valid
   */
  validate(value: string): boolean {
    if (!value || typeof value !== 'string') {
      return false;
    }

    try {
      const [field, direction] = value.split(',');

      if (!field || !direction) {
        return false;
      }

      if (!this.isValidSortDirection(direction)) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Parses a sort parameter string into a structured object
   * @param value - The sort parameter string to parse
   * @returns Parsed sort value object or null if invalid
   */
  parseSortValue(value: string): SortValue | null {
    try {
      const [field, direction] = value.split(',');

      if (!field || !this.isValidSortDirection(direction)) {
        return null;
      }

      return {
        field: field.trim(),
        direction: direction,
      };
    } catch {
      return null;
    }
  }

  /**
   * Checks if the provided direction is a valid sort direction
   * @param direction - The direction to validate
   * @returns boolean indicating if direction is valid
   */
  private isValidSortDirection(direction: string): direction is SortDirection {
    return direction === 'asc' || direction === 'desc';
  }

  /**
   * Returns the error message when validation fails
   */
  defaultMessage(): string {
    return 'Sort parameter must be in format: field,direction where direction is either "asc" or "desc"';
  }
}

/**
 * Decorator to validate sort parameters
 * @param validationOptions - Optional validation options
 * @example
 * class QueryDto {
 *   @IsSort()
 *   sort: string;
 * }
 */
export function IsSort(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsSort',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsValueSort,
    });
  };
}
