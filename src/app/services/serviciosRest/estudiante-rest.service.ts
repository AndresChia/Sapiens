import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteRestService {

  url = "http://localhost:1337/";

  constructor(private http: Http, private router: Router, private httpClient: HttpClient) { }

  //TODO: falta
  obtenerConsejeros(carrera: string, facultad: string) {
    return this.http.get(this.url + "Facultad/" + facultad + "/Carrera/" + carrera + "/Consejeros").pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));
  }

  //TODO: falta
  crearMotivoDeAlerta(estudiante: string, consejero: string) {
    let params = {
      codigo_estudiante: estudiante,
      codigo_consejero: consejero
    }
    return this.http.post(this.url + "/Citas/Agendar", { params }).pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));
  }

  obtenerAlertasEstudiante() {
    return this.http.get(this.url + "Rutas/Generador/Estudiante").pipe(
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
