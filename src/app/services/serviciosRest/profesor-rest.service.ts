import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { estudiante, clase, alerta } from "../../interface/interfaces";
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesorRestService {

  url = environment.url;
  // tslint:disable-next-line:max-line-length
  constructor(private http: Http, private router: Router, private httpClient: HttpClient) { }

  obtenerClases(idProfesor: string) {
    return this.http.get(this.url + "Profesor/" + idProfesor + "/Clases").pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));

  }

  //TODO: falta
  obtenerEstudiantesDeClase(idClase: string) {
    return this.http.get(this.url + "Clase/" + idClase + "/Estudiantes").pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));

  }

  obtenerAlertasProfesor() {
    return this.http.get(this.url + "Rutas/Generador/Profesor").pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));
  }

  //TODO: falta
  crearMotivoDeAlerta(idProfesor: string, estudiantes : estudiante []) {
    // let params = {
    //   codigo_estudiante: estudiante,
    //   codigo_consejero: consejero
    // }
    return this.http.get(this.url + "Profesor/" + idProfesor + "/CitarEstudiantes").pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));
  }


  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('ERROR DEL CLIENTE :', errorResponse.error.message);
    } else {
      console.error('ERROR DEL SERVIDOR :', errorResponse);
    }
    // return an observable with a meaningful error message to the end user
    // tslint:disable-next-line:max-line-length
    return Observable.throw('EN ESTE MOMENTO TENEMOS PROBLEMAS CON EL SERVICIO. SERA NOTIFICADO CUANDO FUNCIONE. POR FAVOR INTENTE DE NUEVO.')
  }




}
