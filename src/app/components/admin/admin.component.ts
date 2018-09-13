import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../services/log-in.service';
import { usuario } from '../../interface/interfaces';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private _LogInService: LogInService) {
    _LogInService.usuario.tipo = "admin";
  }

  ngOnInit() {
  }

  iniciarSesion(usuari: string, contrasenia: string) {

    console.log(usuari);
    console.log(contrasenia);
    //this._LogInService.iniciarSesion();

  }

}
