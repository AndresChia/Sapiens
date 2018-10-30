import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  url = environment.url;


  constructor(private http: Http, private router: Router, private httpClient: HttpClient) { }


  obtenerAlertasAgrupadas(idDirector: string) {
    return this.http.get(this.url + "Director/" + idDirector + "/Alertas").pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));

  }

  obtenerHistorialDirector(idDirector: string) {
    return this.http.get(this.url + "Estudiante/Historial?query=" + idDirector).pipe(
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
