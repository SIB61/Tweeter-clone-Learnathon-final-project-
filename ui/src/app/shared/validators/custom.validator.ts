import { AbstractControl } from '@angular/forms';

export const matchPassword = (control: AbstractControl) => {
  if (control.parent?.get('password')?.value != control.value)
    return { matchPassword: true };
  return null;
};

export const strongPassword = (control: AbstractControl) => {
  const pass = control.value;
  const hasUpperCase = /[A-Z]+/.test(pass);
  const hasLowerCase = /[a-z]+/.test(pass);
  const hasNumber = /[0-9]+/.test(pass);
  return !(hasUpperCase && hasLowerCase && hasNumber) && control.touched
    ? { strongPassword: true }
    : null;
};

export const validAge = (control: AbstractControl) => {
  let bd = control?.value;
  let timeDef = Math.abs(Date.now() - new Date(bd).getTime());
  let age = Math.floor(timeDef / (1000 * 3600 * 24) / 365);
  return age < 18 && control.dirty ? { validAge: true } : null;
};
