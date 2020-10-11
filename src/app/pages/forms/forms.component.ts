import { Component, OnInit } from '@angular/core';
import {formularioModel } from '../../model/formmulario.model'
import { FirebaseService } from '../../Services/firebase.service'
import {MatDialog} from '@angular/material/dialog';
import { FormComponent } from '../../pages/form/form.component';
import Swal from 'sweetalert2'


export interface formulariosex{
  id: string;
  nombre: string;
  apellido: string;
  fechan: string;
  correo: string;
  contrasena:string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: formularioModel[] = [];

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  
  fieldTextType: boolean

  formulario: formularioModel = new formularioModel
  formularios: formularioModel [] = []

  cargando: boolean = true
  

  mostrarpass = false

  displayedColumns: string[] = [ '#','nombre', 'apellido', 'fechan', 'correo', 'contrasena', 'acciones'];
  dataSource 




  constructor( private fireba: FirebaseService,
                public dialog: MatDialog){

                  this.ngOnInit()

                }

  ngOnInit(): void {

    this.traerdatos();
    
  }

  traerdatos(){
    this.cargando = true;
    this.fireba.getforms().subscribe( resp => {
      this.dataSource = resp;
      this.formularios = resp;
      this.cargando = false;

      for(let item of this.dataSource){
        item.mostrarpass=false
       }
    })
  }

  hidepass(element){
    element.mostrarpass = !element.mostrarpass
  }

  borrarf( dataSource ){

    Swal.fire({
      title: '¿Esta seguro?',
      text: `Esta seguro que desea eliminar a ${ dataSource.nombre }`,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "SI",
      cancelButtonText: "NO"
    }).then( resp =>{
      if ( resp.value ){
        
        this.fireba.borrarf( dataSource.id ).subscribe( resp => {
          this.traerdatos();
        });
      }
    })
  }

  toggleFieldTextType(){
    this.fieldTextType = !this.fieldTextType;
  }

  editar( editar, data){

    this
    // console.log(editar, data);
  }


  openDialog(editar, id) {
    const dialogRef = this.dialog.open(FormComponent,{
      width:"80%",
      data : { 
        id,
        editar
       }

      });
      
      this.dialog.afterAllClosed.subscribe( resp1 =>{
        this.traerdatos();
      })
    }

}

