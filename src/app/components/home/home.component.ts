import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../services/log-in.service';
import { Router } from '@angular/router';
import { persona, usuario } from 'src/app/interface/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mensaje = {
    cuerpo: "",
    titulo: ""
  }
  alertaPopUp = false;
  valido = false;
  modal = false;
  estado: string;
  constructor(public _LogInService: LogInService, private router: Router) { }


  ngOnInit() {
  }

  login(usr: string, contrasenia: string) {
    let _LogInService: LogInService;
    let pop = true;
    let esDobleRol = false;
    if (usr !== "" && contrasenia !== "") {
      let respuesta = this._LogInService.iniciarSesion(contrasenia, usr).subscribe(res => {

        //doble usuario si el tamaño de .roles es mayor a 1
        if (res) {
          esDobleRol = true;
        } else {
          //usuario normal
          this._LogInService.usuarioCorrecto("estudiante");
        }

      }, error => {
        this.valido = true;
        this.alertaPopUp = true;
        this.mensaje.cuerpo = this.estado;
        this.mensaje.titulo = "ERROR DE LOG IN: Vuelva a escribir el usuario y contraseña.";
      });


    }

    if (!esDobleRol) {
      this.modal = true;
      this.valido = false;
    }


    this.valido = true;

  }


  cerrarPop() {
    this.alertaPopUp = false;
  }


  loginDobleRol() {
    let tipo;
    this._LogInService.roles.forEach(element => {

      if (element.check === true) {
        tipo = element.tipo;
        this._LogInService.usuario.tipo = tipo;
      }

    });

    this._LogInService.iniciarSesionDobleRol(tipo);
    return;
  }


  seleccionar(i: number) {

    this._LogInService.roles.forEach(element => {
      element.check = false;
    });
    this._LogInService.roles[i].check = !this._LogInService.roles[i].check;

  }

}
