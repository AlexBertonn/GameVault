export function isEmail(value: string): boolean {
  return value.includes("@") && value.includes('.');
}
export function isNotEmpty(value: string): boolean {
  return value.trim() !== "";
}
export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}
export function isEqualToOtherValue(value: string, otherValue: string): boolean {
  return value === otherValue;
}

interface ErrorMessages {
  [key: string]: string;
}

export function useValidation() {
  const validateFormData = (formData: {[key: string]: string;}): ErrorMessages => {
    const errors: ErrorMessages = {};

    if (!isNotEmpty(formData.name)) {
      errors.name = "Nome é obrigatório.";
    }
    if (!isEmail(formData.email)) {
      errors.email = "E-mail inválido.";
    }
    if (!hasMinLength(formData.password, 6)) {
      errors.password = "A senha deve ter pelo menos 6 caracteres.";
    }
    if (!isEqualToOtherValue(formData.password, formData.confirmPassword)) {
      errors.confirmPassword = "As senhas não coincidem.";
    }

    return errors;
  };

  return {
    validateFormData,
  };
}
