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


  constructor(private router: Router, public _LogInService: LogInService) { }

  ngOnInit() {
  }

  //FIXME:  cambiar correo por si es tipo estudiantes, consejero etc
  login(clave: string, correo: string) {

    this._LogInService.acceso = true;
    this._LogInService.load = true;
    this.router.navigate([correo, clave]);
  }
  salir() {
    this._LogInService.acceso = false;
    this.router.navigate([""]);

  }


  getAcceso() {
    return this._LogInService.acceso;

  }


}
