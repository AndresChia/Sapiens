import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppComponent } from "../../app.component";
import { LogInService } from "../../services/log-in.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  numeradorOpcion = 0;


  activo = false;

  constructor(public _LogInService: LogInService, private router: Router) {
    _LogInService.sesionActiva();
  }

  ngOnInit() {
  }

  //FIXME:  cambiar correo por si es tipo estudiantes, consejero etc
  login(clave: string, correo: string) {
    this.numeradorOpcion = 0;
    this._LogInService.iniciarSesion(clave, correo);
    this.activo = true;

  }
  salir() {
    this.numeradorOpcion = 0;
    this._LogInService.cerrarSesion();
    this.activo = false;

  }

  opcion(index: number) {
    this.numeradorOpcion = index;

    if (this._LogInService.usuario.tipo === "consejero") {
      if (index === 1) {
        this._LogInService.activarConsejero();
        this.router.navigate(["/consejero", "1", "buscar"]);
      }

      if (index === 2) {
        this._LogInService.activarConsejero();
        this.router.navigate(["/consejero", "1", "asincrono"]);

      }
      if (index === 3) {
        this._LogInService.activarConsejero();
        this.router.navigate(["/consejero", "1", "periodico"]);

      }

    }
    if (this._LogInService.usuario.tipo === "director") {
      if (index === 4) {
        this._LogInService.activarConsejero();
        this.router.navigate(["/director", "1", "demanda"]);
      }

      if (index === 5) {
        this._LogInService.activarConsejero();
        this.router.navigate(["/director", "1", "asincrono"]);

      }
      if (index === 6) {
        this._LogInService.activarConsejero();
        this.router.navigate(["/director", "1", "periodico"]);

      }
      if (index === 7) {
        this._LogInService.activarConsejero();
        this.router.navigate(["/director", "1", "ia"]);

      }

    }
  }




}
