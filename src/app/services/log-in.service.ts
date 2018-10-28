import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { usuario, estudiante, consejero, director, rol, persona } from '../interface/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  usuario: usuario = {
    acceso: false,
    tipo: "estudiante",
    nombreUsuario: "",
    load: false,
  }

  estudiante: estudiante = {
    id: "string",
    nombre: "string",
    apellido: "string",
    carrera: "",
    semestre: 1,
    check: false,
    facultad: "ingenieria",
  };
  consejero: consejero;
  director: director;
  opcion = false;
  multiRol = false;
  respuesta = " ";
  roles: rol[] = [];
  url = environment.url;
  persona: persona;

  constructor(private http: Http, private router: Router) {
    this.sesionActiva();
  }


  entrarLog() {

    // this.http.post("http://localhost:1337/auth/local/login?username=achia&password=12345678",).map(data => {

    //   console.log(data);
    // });

  }
  // #FIXME: falta cambiar el tipo lo debe generar la peticion
  iniciarSesion(contrasenia: string, usur: string) {
    let params = {
      correo: usur,
      //"adriana-diaz@javeriana.edu.co"
      password: contrasenia,
      //"12345"
    }
    return this.http.post(this.url + "login", params).pipe(
      map(res => {
        return res.json();
      }), catchError(this.handleError));
  }

  cerrarSesion() {
    this.opcion = false;
    this.usuario.acceso = false;
    this.router.navigate(["Home"]);
    localStorage.clear();
  }
  cerrarSesionAdmin() {
    this.usuario.acceso = false;
    this.router.navigate(["/admin"]);
    localStorage.clear();
  }

  isAuthenticated() {
    return this.usuario.acceso;
  }

  cargaRol(rolActual: string) {
    this.usuario.tipo = rolActual;
    this.usuario.load = false;
    localStorage.setItem("1", JSON.stringify(this.usuario));

  }

  sesionActiva() {
    // console.log("servicio iniciado");
    if (localStorage.getItem("1") != null) {
      this.usuario = JSON.parse(localStorage.getItem("1"));
    }
  }

  activarConsejero() {

    //    this.consejeroComponent.opcion = true;
    this.opcion = true;
  }

  iniciarSesionDobleRol(tipo: string) {
    this.opcion = false;
    this.usuario.acceso = true;
    this.usuario.load = true;
    this.usuario.tipo = tipo;
    localStorage.setItem("1", JSON.stringify(this.usuario));
    this.navegar()
  }

  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('ERROR DEL CLIENTE :', errorResponse.error.message);
    } else {
      console.error('ERROR DEL SERVIDOR :', errorResponse);
    }
    return Observable.throw('EN ESTE MOMENTO TENEMOS PROBLEMAS CON EL SERVICIO. SERA NOTIFICADO CUANDO FUNCIONE. POR FAVOR INTENTE DE NUEVO.')
  }
  navegar() {
    this.router.navigate(["/" + this.usuario.tipo]);
  }

  usuarioCorrecto(tipo: string, datoUsuario: any) {

    if (tipo === "estudiante") {
      this.estudiante = datoUsuario;
      this.estudiante.carrera = this.estudiante.carrera.toLocaleLowerCase();
      this.estudiante.facultad = this.estudiante.facultad.toLocaleLowerCase();
    } else {
      this.persona = datoUsuario;
    }
    this.opcion = false;
    this.usuario.acceso = true;
    this.usuario.load = true;
    this.usuario.tipo = tipo;
    localStorage.setItem("1", JSON.stringify(this.usuario));
    this.navegar();
  }



}
