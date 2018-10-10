import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfesorRestService {

  url = "http://localhost:1337/";
  constructor(private http: Http, private router: Router) { }


  obtenerClases(id: number) {
    return this.http.get(this.url + "Clase/Profesor/" + id).pipe(
      map(res => {
        return res.json();
      }));

  }

  obtenerEstudiantesDeClase(id: number) {
    return this.http.get(this.url + "Clase/" + id + "/Estudiantes").pipe(
      map(res => {
        return res.json();
      }));

  }


}
