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

  valido = false;
  modal = false;
  constructor(public _LogInService: LogInService, private router: Router) { }

  roles: usuario[] = [
    {
      id: "1",
      acceso: true,
      tipo: "profesor",
      nombreUsuario: "Andres",
      contrasenia: "12334",
      load: true,
      check: false,
    }, {
      id: "1",
      acceso: true,
      tipo: "consejero",
      nombreUsuario: "Andres",
      contrasenia: "12334",
      load: true,
      check: false,
    }


  ];


  ngOnInit() {
  }

  login(usr: string, contrasenia: string) {

    // console.log(usuario, contrasenia)

    if (usr !== "" && contrasenia !== "") {
      let x: boolean = this.validorDobleRol(usr, contrasenia);
      if (x) {
        this.modal = true;
      } else {
        this.modal = false;
        this._LogInService.iniciarSesion(contrasenia, usr);
        this.valido = false;
        return;
      }
    }

    this.valido = true;

  }


  validorDobleRol(usr, contrasenia): boolean {
    //validarROl
    if (usr === "doblerol") {
      return true;
    }
    return false;
  }


  loginDobleRol(usr: string, contrasenia: string) {

    let tipo;
    this.roles.forEach(element => {

      if (element.check === true) {
        tipo = element.tipo;
      }

    });


    this._LogInService.iniciarSesionDobleRol(contrasenia, usr, tipo);
    this.valido = false;
    return;
  }


  seleccionar(i: number) {

    this.roles.forEach(element => {

      element.check = false;

    });
    this.roles[i].check = !this.roles[i].check;
  }

}
