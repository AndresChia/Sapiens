import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { usuario } from '../interface/interfaces';


@Injectable({
  providedIn: 'root'
})
export class LogInService {
  usuario: usuario = {
    id: "1",
    acceso: false,
    tipo: "",
    nombreUsuario: "",
    contrasenia: "",
    load: false,
  }

  opcion = false;

  url = "http://localhost:1337/";

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
    this.opcion = false;
    this.usuario.acceso = true;
    this.usuario.nombreUsuario = usur;
    this.usuario.contrasenia = contrasenia;
    this.usuario.load = true;
    this.usuario.tipo = usur;
    this.router.navigate([this.usuario.nombreUsuario, this.usuario.id]);
    localStorage.setItem("1", JSON.stringify(this.usuario));

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

  cargaRol(rol: string) {
    this.usuario.tipo = rol;
    this.usuario.load = false;
    localStorage.setItem("1", JSON.stringify(this.usuario));

  }

  sesionActiva() {
    console.log("servicio iniciado");
    if (localStorage.getItem("1") != null) {
      this.usuario = JSON.parse(localStorage.getItem("1"));
    }
  }

  activarConsejero() {

    //    this.consejeroComponent.opcion = true;
    this.opcion = true;
  }



}
