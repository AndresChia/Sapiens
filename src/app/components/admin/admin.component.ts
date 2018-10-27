import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../services/log-in.service';
import { usuario } from '../../interface/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public _LogInService: LogInService, private router: Router) {
    _LogInService.usuario.tipo = "admin";
  }

  ngOnInit() {
  }

  iniciarSesion(usuari: string, contrasenia: string) {


    this._LogInService.iniciarSesion(contrasenia, usuari);
    this._LogInService.cargaRol("admin");
    this.router.navigate(["admin", "acceso"]);

  }

}
