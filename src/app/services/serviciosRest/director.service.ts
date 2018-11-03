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
    return this.http.get(this.url + "Estudiante/Historial?codigoConsejero=" + idDirector).pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));

  }

  obtenerAsignaturas(idConsejero: string, asignatura: string) {

    return this.http.get(this.url + "Asignaturas?nombre_asignatura=" + asignatura + "&codigoConsejero=" + idConsejero).pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));
  }

  ia(carrera: string) {
    let params = {};

    if (carrera === "ingenieria industrial") {

      return this.http.post("http://104.248.229.214:1337/predict/IIND", params).pipe(
        map(res => {
          return res.json();
        }), catchError(this.handleError));
    }

    if (carrera === "ingenieria civil") {
      return this.http.post("http://104.248.229.214:1337/predict/ICVL", params).pipe(
        map(res => {
          return res.json();
        }), catchError(this.handleError));
    }

    if (carrera === "ingenieria sistemas") {
      return this.http.post("http://104.248.229.214:1337/predict/ISIST", params).pipe(
        map(res => {
          return res.json();
        }), catchError(this.handleError));
    }
    if (carrera === "ingenieria electronica") {
      return this.http.post("http://104.248.229.214:1337/predict/IELEC", params).pipe(
        map(res => {
          return res.json();
        }), catchError(this.handleError));
    }

  }


  consultaDemanda(anno_academicoPost: string, periodo_academicoPost: string, filtros_clasePost: any) {

    let params = {
      anno_academico: anno_academicoPost,
      periodo_academico: periodo_academicoPost,
      filtros_clase: filtros_clasePost
    };


    return this.http.post(this.url + "Estudiante/Filtro/", params).pipe(
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
