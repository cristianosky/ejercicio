import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';




export function confirPass(): ValidatorFn {
  return (control: AbstractControl) => {
    const confirpass= new ConfirmarPassDirective();
    return confirpass.validate(control);
  }
}



@Directive({
  selector: '[ConfirmarPass]',
  providers: [{provide: NG_VALIDATORS, useExisting: ConfirmarPassDirective, multi: true}]
})
export class ConfirmarPassDirective implements Validator {

  pass:string = 'Hola122'

  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    const confirmapass = <string>control.value;
    
       

    if( confirmapass !== this.pass ){
      console.log('Entro');
      return

    }

    return null;
  }
  constructor( ) { }




}
