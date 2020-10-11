import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formularioModel } from 'src/app/model/formmulario.model';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { passwordValidation } from 'src/app/validations/password-validation.directive';
import { edadvalidation } from 'src/app/validations/edad-validate.directive';
import { ErrorStateMatcher } from '@angular/material/core';
import * as moment from 'moment';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

  


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  minDate: Date;
  maxDate: Date;

  formulario: formularioModel = new formularioModel;

  formularios: formularioModel [] = [];

  forma: FormGroup;

  lol: boolean = false;

  fieldTextType: boolean;
  
  fieldTextType1: boolean;
  
  contrasenaac: AbstractControl;

  cargando = false;

  ojito = true;
  ojito1 = true;
  


  

  constructor( private fireba: FirebaseService,
               private route: ActivatedRoute,
               public dialog: MatDialog,
               private fb: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public data: any
              ) {
                
      this.crearformulario();     
    }

    

    toggleFieldTextType() {
      this.fieldTextType = !this.fieldTextType;
    }
    toggleFieldTextType1() {
      this.fieldTextType1 = !this.fieldTextType1;
    }

    get password() {
      return this.forma.get('contrasena');  
    }
    get fechan() {
      return this.forma.get('fechan');
    }
    get apellido() {
      return this.forma.get('apellido');
    }
    get nombre() {
      return this.forma.get('nombre');
    }
    get correo() {
      return this.forma.get('correo');
    }
    get ccontrasena() {
      return this.forma.get('ccontrasena');
    }

    

  ngOnInit(): void {
    this.traerformulario();
  }  

  traerformulario(){
    const id = this.data.id
    if(this.data.editar === true ){
      this.cargando = true;
      this.fireba.getform( id )
      .subscribe( (resp: formularioModel) =>{
        this.formulario = resp
        this.formulario.id = this.data.id;
        this.forma.setValue({
          nombre: this.formulario.nombre,
          apellido: this.formulario.apellido,
          fechan: this.formulario.fechan,
          correo: this.formulario.correo,
          contrasena: this.formulario.contrasena,
          ccontrasena: this.formulario.ccontrasena
        })
        this.cargando = false;
      } )  

      
    }
  }
  
  crearformulario(){
    this.forma = this.fb.group({
    nombre:     ['', [Validators.required, Validators.minLength(3)] ], 
    apellido:   ['', [Validators.required, Validators.minLength(3) ] ],
    fechan:     [ '',[Validators.required, edadvalidation() ] ],
    correo:     ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z]+\\.[a-z]{2,4}$')] ],
    contrasena: ['', [
      Validators.required, Validators.minLength(4),
      passwordValidation()
    ]],
    ccontrasena:['',[Validators.required]]
  }, {validator: this.passiguales})
  }


  passiguales( group: FormGroup ){
    let pass1 = group.get('contrasena').value;
    let pass2 = group.get('ccontrasena').value;
    

    return pass1 === pass2 ? null : { notSame: true }   
  }
  
  checarSiSonIguales( ):  boolean  {
    return  this.forma.hasError('notSame')  &&
      this.forma.get('contrasena').dirty &&
      this.forma.get('ccontrasena').dirty;
  }
  

  guardar( form: NgForm){

    if(form.invalid){
      Swal.fire({
        title: 'Error',
        text: 'Formulario no valido',
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "Aceptar"
      });
    } else if (this.data.editar === false){
        Swal.fire({
          title: 'Espere',
          text: 'Guardando informacion',
          icon: 'info',
          allowOutsideClick: false
        });
        Swal.showLoading();
        this.fireba.crearform( this.forma.value ).subscribe( resp => {
          Swal.fire({
            title: 'Agregar nuevo usuario',
            text: 'Se agrego correctamente',
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
          }).then( resp =>{
            if ( resp.value ){
              this.dialog.closeAll();
            }
          })
        })
      } else {
        this.formulario = this.forma.value;
        this.formulario.id = this.data.id;

        Swal.fire({
          title: 'Espere',
          text: 'Guardando informacion',
          icon: 'info',
          allowOutsideClick: false
        });
        Swal.showLoading();
        // this.fireba.borrarf( this.data.id ).subscribe();
        this.fireba.actualizarfor( this.formulario ).subscribe(resp=>{
          Swal.fire({
            title: 'Actualizacion',
            text: 'Se actualizo correctamente',
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "Aceptar"
          }).then( resp =>{
            if ( resp.value ){
              this.formulario = new formularioModel;
              this.dialog.closeAll();
            }
          })
          
        })
      }
    
  }



}

