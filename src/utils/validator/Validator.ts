export interface ValidationResult {
  valid: boolean;
  key: string;
  message: string;
}

export interface ValidationSchema {
  [key: string]: ((data: any, key: string) => ValidationResult)[];
}

export class Validator {
  constructor(
    private dataset: Record<string, any>,
    private schema: ValidationSchema
  ) {}

  validate() {
    let results: ValidationResult[] = [];
    for (const schemaItem of Object.entries(this.schema)) {
      for (const validatorItem of schemaItem[1]) {
        const valid = validatorItem(this.dataset[schemaItem[0]], schemaItem[0]);
        results = [...results, valid];
      }
    }
    return results;
  }

  static isValid(results: ValidationResult[]) {
    return results.every((element) => element.valid);
  }

  static errorMessages(results: ValidationResult[]): string[] {
    return results.reduce<string[]>((prev, curr) => {
      if (!curr.valid) return [...prev, curr.message];
      return [...prev];
    }, []);
  }

  // --- VALIDATORS ---

  static required(value: any, key: string): ValidationResult {
    const valid = value !== undefined && value !== null;
    const message = valid ? "Valid" : `${key} is required`;

    return {
      valid,
      message,
      key,
    };
  }

  static numeric(value: string, key: string) {
    let valid = true;
    //@ts-ignore
    valid = !isNaN(value);
    const message = valid ? "Valid" : `${key} must be a number`;

    return {
      valid,
      message,
      key,
    };
  }
}
