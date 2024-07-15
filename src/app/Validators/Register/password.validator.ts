import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidator(formGroup: AbstractControl): ValidationErrors | null {
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('confirmPassword');
  if (passwordControl && confirmPasswordControl) {
    if (passwordControl.value !== confirmPasswordControl.value)
      return { passwordMismatch: true };
  }
  return null;
};
