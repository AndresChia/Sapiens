import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LogInService } from 'src/app/services/log-in.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsejeroService {

  url = environment.url;


  constructor(public _LogInService: LogInService, private http: Http, private router: Router, private httpClient: HttpClient) { }


  obtenerHistorialConsejero(idConsejero: string) {
    return this.http.get(this.url + "Consejero/+" + idConsejero + "/Alertas/Rol/consejero").pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));

  }

  obtenerAlertasConsejero() {
    return this.http.get(this.url + "Rutas/Generador/Consejero").pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));
  }

  obtenerEstudiantes(nombre: string, correo: string) {
    if (nombre === undefined) {
      return this.http.get(this.url + "Estudiante/Historial?query=" + correo + "&codigoConsejero=" + this._LogInService.usuario.nombreUsuario).pipe(
        map(res => {
          return res.json();
        }), catchError(this.handleError));
    }
    if (correo === undefined) {
      return this.http.get(this.url + "Estudiante/Historial?query=" + nombre + "&codigoConsejero=" + this._LogInService.usuario.nombreUsuario).pipe(
        map(res => {
          return res.json();
        }), catchError(this.handleError));

    }

    return this.http.get(this.url + "Estudiante/Historial?query=" + nombre + "-" + correo + "&codigoConsejero=" + this._LogInService.usuario.nombreUsuario).pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));


  }

  remitir(codigoAlertaPost: string, codigoFuentePost: string, codigoEstudiantePost: string, codigoRemitidoPost: string) {

    let params = {
      codigoAlerta: codigoAlertaPost,
      codigoFuente: codigoFuentePost,
      codigoRemitido: codigoRemitidoPost,
    }
    return this.http.post(this.url + "Estudiante/" + codigoEstudiantePost + "/Remitir", params).pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));
  }

  escalar(codigoAlertaPost: string, codigoFuentePost: string, codigoEstudiantePost: string, codigoPrincipalPost: string) {


    let params = {}
    return this.http.post(this.url + "Estudiante/" + codigoEstudiantePost + "/Escalar?codigoAlerta=" + codigoAlertaPost + "&codigoFuente=" + codigoFuentePost + "&codigoEstudiante=" + codigoEstudiantePost + "&codigoPrincipal=" + codigoPrincipalPost + "&codigoIntermedio=" + codigoPrincipalPost, params).pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));

  }

  atender(codigoAlertaPost: string, codigoFuentePost: string, codigoEstudiantePost: string, codigoAtiendePost: String, codigoResolucionPost: string) {

    let params = {
    }
    console.log(this.url + "Estudiante/" + codigoEstudiantePost + "/Atender?codigoAlerta=" + codigoAlertaPost + "&codigoFuente=" + codigoFuentePost + "&codigoEstudiante=" + codigoEstudiantePost + "&codigoAtiende=" + codigoAtiendePost + "&codigoResolucion=" + codigoResolucionPost);

    return this.http.post(this.url + "Estudiante/" + codigoEstudiantePost + "/Atender?codigoAlerta=" + codigoAlertaPost + "&codigoFuente=" + codigoFuentePost + "&codigoEstudiante=" + codigoEstudiantePost + "&codigoAtiende=" + codigoAtiendePost + "&codigoResolucion=" + codigoResolucionPost, params).pipe(
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
    return Observable.throw('EN ESTE MOMENTO TENEMOS PROBLEMAS CON EL SERVICIO. SERA NOTIFICADO CUANDO FUNCIONE. POR FAVOR INTENTE DE NUEVO.')
  }


}
