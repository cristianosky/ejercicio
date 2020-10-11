import { Component, OnInit } from '@angular/core';
import { formularioModel } from 'src/app/model/formmulario.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/Services/firebase.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  
  formulario: formularioModel = new formularioModel
  formularios: formularioModel [] = []

  cargando: boolean = true

  constructor(private route: ActivatedRoute,
              private fireba: FirebaseService) { }

  ngOnInit(): void {

    
    const id = this.route.snapshot.paramMap.get('id');
    this.fireba.getform( id )
      .subscribe( (resp: formularioModel) =>{
        this.formulario = resp
        this.formulario.id = id;
        this.cargando = false;
      } )  
  }

  guardar(form : NgForm){

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.fireba.actualizarfor( this.formulario ).subscribe(resp=>{
      Swal.fire({
        title: 'Actualizacion',
        text: 'Se actualizo correctamente',
        icon: "success"
      });
      
    })
  }

}
