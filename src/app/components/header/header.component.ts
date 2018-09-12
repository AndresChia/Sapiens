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


  activo = false;

  constructor(public _LogInService: LogInService) {
    _LogInService.sesionActiva();
  }

  ngOnInit() {
  }

  //FIXME:  cambiar correo por si es tipo estudiantes, consejero etc
  login(clave: string, correo: string) {
    this._LogInService.iniciarSesion(clave, correo);
    this.activo = true;
  }
  salir() {
    this._LogInService.cerrarSesion();
    this.activo = false;

  }





}
