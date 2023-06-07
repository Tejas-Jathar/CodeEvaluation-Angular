import { AbstractControl, ValidatorFn } from '@angular/forms';

// export function forbiddernNameValidator(control : AbstractControl):{[key: string]:any | null}{
//     const forbidden = /tejas/.test(control.value);
//     return forbidden ? {'forbiddenName' : {value: control.value}}: null;
// } 

export function forbiddernNameValidator(forbiddenName : RegExp): ValidatorFn{
    return (control : AbstractControl):{[key: string]:any }| null => {
        const forbidden = forbiddenName.test(control.value);
        return forbidden ? {'forbiddenName' : {value: control.value}}: null;
    } ;
}


export function passwordValidator1(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
  
      // Regular expressions for symbol, capital letter, and number
      const symbolRegex = /[\!\@\#\$\%\^\&\*]/;
      const capitalLetterRegex = /[A-Z]/;
      const numberRegex = /\d/;
  
      // Check if the password meets the requirements
      const hasSymbol = symbolRegex.test(password);
      const hasCapitalLetter = capitalLetterRegex.test(password);
      const hasNumber = numberRegex.test(password);
  
      // If any of the requirements is not met, return an error object
      if (!hasSymbol || !hasCapitalLetter || !hasNumber) {
        return {
          passwordRequirements: true,
        };
      }
  
      return null; // Password is valid
    };
  }