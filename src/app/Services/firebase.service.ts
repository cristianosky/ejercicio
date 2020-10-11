import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formularioModel } from '../model/formmulario.model';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private url = 'https://edwin-puto.firebaseio.com'

  constructor( private http: HttpClient) { }


  crearform( formu: formularioModel){
    return this.http.post(`${ this.url }/ejercicio.json`, formu)
    .pipe(
      map ( (resp : any) => {
        formu.id = resp.name;
        return formu
      })
    )
  }

  actualizarfor( form: formularioModel){

    const tempform={
      ...form
    }

    delete tempform.id;

    return this.http.put(`${ this.url }/ejercicio/${ form.id }.json`, tempform)

  }

  borrarf( id: string ){
    return this.http.delete(`${ this.url }/ejercicio/${ id }.json`)
  }

  getform( id: string ){
    return this.http.get(`${ this.url }/ejercicio/${ id }.json`)
  }

  getforms(){
    return this.http.get(`${ this.url }/ejercicio.json`)
    .pipe(
      map (this.creararreglo)
    )

  } 


  private creararreglo( formsObj: object ){

    const forms: formularioModel[]=[];
    if (formsObj === null ){ return [] ;}

    Object.keys( formsObj ).forEach( key => {
        const form: formularioModel = formsObj[key];
        form.id = key;
        forms.push( form );
      })
      
    return forms;
  }
}
  
