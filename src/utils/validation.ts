import { ValidationRules, ValidationErrors } from "../types";

  
  export const validateForm = (formData: Record<string, any>, rules: ValidationRules): ValidationErrors => {
    const errors: ValidationErrors = {};
  
    for (const field in rules) {
      const value = formData[field];
      const rule = rules[field];
      const fieldName = rule.lableName || field
  
      // Required check
      if (rule.required && !value) {
        errors[field] = rule.customMessage || `${fieldName} is required.`;
      }
  
      // Max length check
      if (rule.maxLength && value.length > rule.maxLength) {
        errors[field] = `Must be less than ${rule.maxLength} characters.`;
      }
  
      // Min length check
      if (rule.minLength && value.length < rule.minLength) {
        errors[field] = `Must be at least ${rule.minLength} characters.`;
      }
  
      // Pattern check (e.g., email, password format)
      if (rule.pattern && !rule.pattern.test(value)) {
        errors[field] = rule.customMessage || `${fieldName} is not valid.`;
      }
  
      // Match field check (e.g., password confirmation)
      if (rule.matchField && value !== formData[rule.matchField]) {
        errors[field] = rule.customMessage || `${fieldName} does not match ${rule.matchField}.`;
      }
    }
  
    return errors;
  };
  