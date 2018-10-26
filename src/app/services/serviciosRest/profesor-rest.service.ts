import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorRestService {

  url = "http://localhost:1337/";
  // tslint:disable-next-line:max-line-length
  constructor(private http: Http, private router: Router, private httpClient: HttpClient) { }


  obtenerClases(id: number) {
    return this.http.get(this.url + "Clase/Profesor/" + id).pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));

  }

  obtenerEstudiantesDeClase(id: number) {
    return this.http.get(this.url + "Clase/" + id + "/Estudiantes").pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));

  }


  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('ERROR DEL CLIENTE :', errorResponse.error.message);
      // tslint:disable-next-line:max-line-length
      window.alert('ERROR DEL CLIENTE :\nEn este momento tenemos problemas con el servicio. sera notificado cuando funcione. Por favor intente de nuevo.');
    } else {
      console.error('ERROR DEL SERVIDOR :', errorResponse);
      // tslint:disable-next-line:max-line-length
      window.alert('ERROR DEL SERVIDOR :\nEn este momento tenemos problemas con el servicio. sera notificado cuando funcione. Por favor intente de nuevo.');
    }
    // return an observable with a meaningful error message to the end user
    return throwError('EN ESTE MOMENTO TENEMOS PROBLEMAS CON EL SERVICIO. SERA NOTIFICADO CUANDO FUNCIONE. POR FAVOR INTENTE DE NUEVO.')
  }




}
