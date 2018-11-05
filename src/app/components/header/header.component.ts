import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppComponent } from "../../app.component";
import { LogInService } from "../../services/log-in.service";
import { DirectorService } from '../../services/serviciosRest/director.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  numeradorOpcion = 0;


  activo = false;
  intervalo: NodeJS.Timer;

  constructor(public _LogInService: LogInService, private router: Router, public _DirectorService: DirectorService) {
    _LogInService.sesionActiva();
    let URLactual = (window.location.hash).split("/");

    if (this._LogInService.usuario.tipo === "consejero") {
      if (URLactual[2] === "buscar") {
        //buscar
        this.numeradorOpcion = 1;
      }

      if (URLactual[2] === "historial") {
        //historial
        this.numeradorOpcion = 2;

      }

    }
    if (this._LogInService.usuario.tipo === "director") {

      // this.intervalo = setInterval(function () {




      // }, 1000, "JavaScript");

      if (URLactual[2] === "demanda") {
        //demanda
        this.numeradorOpcion = 4;
      }

      if (URLactual[2] === "alertas") {
        //alertas
        this.numeradorOpcion = 5;
      }
      if (URLactual[2] === "historial") {
        //historial
        this.numeradorOpcion = 6;


      }
      if (URLactual[2] === "ia") {
        //ia
        this.numeradorOpcion = 7;

      }

    }



  }

  ngOnInit() {
  }

  salir() {
    this.numeradorOpcion = 0;
    this._LogInService.cerrarSesion();
    this.activo = false;
    clearInterval(this.intervalo);

  }

  opcion(index: number) {
    this.numeradorOpcion = index;

    if (this._LogInService.usuario.tipo === "consejero") {
      if (index === 1) {
        this._LogInService.activarConsejero();
        this.router.navigate(["/consejero", "buscar"]);
      }

      if (index === 2) {
        this._LogInService.activarConsejero();
        this.router.navigate(["/consejero", "historial"]);

      }

    }
    if (this._LogInService.usuario.tipo === "director") {
      if (index === 4) {
        this._LogInService.activarConsejero();
        this.router.navigate(["/director", "demanda"]);
      }

      if (index === 5) {
        this._LogInService.activarConsejero();
        this.router.navigate(["/director", "alertas"]);

      }
      if (index === 6) {
        this._LogInService.activarConsejero();
        this.router.navigate(["/director", "historial"]);

      }
      if (index === 7) {
        this._LogInService.activarConsejero();
        this.router.navigate(["/director", "ia"]);

      }

    }
  }


}
