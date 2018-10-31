import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../services/log-in.service';
import { Router } from '@angular/router';
import { persona } from 'src/app/interface/interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';
import { estudiante } from '../../interface/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  confirmarActivado = true;
  mensaje = {
    cuerpo: "",
    titulo: ""
  }
  alertaPopUp = false;
  valido = false;
  estado: string;
  decodedToken: any = undefined;
  cargo = "No";
  constructor(public _LogInService: LogInService, private router: Router) { }
  modal = false;


  ngOnInit() {
  }



  login(usr: string, contrasenia: string) {
    this.confirmarActivado = true;
    let _LogInService: LogInService;
    let pop = true;
    let esDobleRol = false;
    if (usr !== "" && contrasenia !== "") {
      let respuesta = this._LogInService.iniciarSesion(contrasenia, usr).subscribe(res => {
        this._LogInService.roles = [];
        const helper = new JwtHelperService();
        this.decodedToken = helper.decodeToken(res);
        const expirationDate = helper.getTokenExpirationDate(res);
        this.decodedToken.roles.forEach(element => {
          let aux: any = {
            check: false,
            rolNombre: (element as string).toLowerCase(),
          };
          this._LogInService.roles.push(aux);
        });
        this._LogInService.usuario.nombreUsuario = this.decodedToken.identificacion;
        //doble usuario si el tamaño de .roles es mayor a 1
        if (this._LogInService.roles.length > 1) {
          esDobleRol = true;
          this.valido = false;
          this.alertaPopUp = false;
          this.cargo = "Si DobleRol";
          this.modal = true;
        } else {
          //usuario normal
          this.valido = false;
          if ((this.decodedToken.roles[0] as string).toLowerCase() === "estudiante") {
            let estudianteEnvio: estudiante = {
              apellido: this.decodedToken.apellido1 + " " + this.decodedToken.apellido2,
              carrera: this.decodedToken.carrera,
              facultad: "Ingenieria",
              check: false,
              id: this.decodedToken.identificacion,
              nombre: this.decodedToken.nombres,
              semestre: 1,
            }

            this._LogInService.usuarioCorrecto((this.decodedToken.roles[0] as string).toLowerCase(), estudianteEnvio);

          }
          if ((this.decodedToken.roles[0] as string).toLowerCase() === "profesor" ||
            (this.decodedToken.roles[0] as string).toLowerCase() === "director" ||
            (this.decodedToken.roles[0] as string).toLowerCase() === "consejero") {
            let person: persona = {
              id: this.decodedToken.identificacion,
              nombre: this.decodedToken.nombres,
              apellido: this.decodedToken.apellido1 + " " + this.decodedToken.apellido2,
              identificacion: this.decodedToken.identificacion,
              tipoIdentificacion: "string",
              genero: "string",
              direccion: "string",
              correo: this.decodedToken.correo,
              telefono: "string",
              rol: this.decodedToken.roles[0],
              check: false,
            }

            this._LogInService.usuarioCorrecto((this.decodedToken.roles[0] as string).toLowerCase(), person);

          }

          this.cargo = "Si Normal";

        }



      }, error => {
        this.valido = true;
        this.alertaPopUp = true;
        this.mensaje.cuerpo = this.estado;
        this.mensaje.titulo = "ERROR DE LOG IN: Vuelva a escribir el usuario y contraseña.";
      });


    }

    setTimeout(() => {
      this.modal = true;
    }, 1000);


  }

  cerrarPop() {
    this.alertaPopUp = false;
  }



  loginDobleRol() {
    let tipo;
    this._LogInService.roles.forEach(element => {

      if (element.check === true) {
        tipo = element.rolNombre;
        this._LogInService.usuario.tipo = element.rolNombre;
      }

    });

    this._LogInService.iniciarSesionDobleRol(tipo);
    return;
  }


  seleccionar(i: number) {
    this.confirmarActivado = false;
    this._LogInService.roles.forEach(element => {
      element.check = false;
    });
    this._LogInService.roles[i].check = !this._LogInService.roles[i].check;

  }

}
