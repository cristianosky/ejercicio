import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl  } from '@angular/forms';

export function edadvalidation(): ValidatorFn{
  return (control: AbstractControl) => {
    const edadValidateDirective = new EdadValidateDirective();
    return edadValidateDirective.validate(control);
  }
}



@Directive({
  selector: '[EdadValidate]',
  providers: [{provide: NG_VALIDATORS, useExisting: EdadValidateDirective, multi: true}]
})
export class EdadValidateDirective implements Validator {

  edadA: Number = 18
  edadAM: Number = 150

  showAge

  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    const edad = <number>control.value; 
  
    if(edad){
      const convertAge = new Date(edad);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
    

    if(this.showAge > this.edadAM){
      return {'edadValidation': {'message': 'Fecha invalida'}}
    }

    if(this.showAge < this.edadA){
      return {'edadValidation': {'message': 'debe ser mayor de edad'}}
    }

    return null;
  
  }

  constructor() { }

}
