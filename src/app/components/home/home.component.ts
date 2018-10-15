import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../services/log-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  valido = false;

  constructor(public _LogInService: LogInService, private router: Router) { }

  ngOnInit() {
  }

  login(usuario: string, contrasenia: string) {
    // console.log(usuario, contrasenia)
    if (usuario !== "" && contrasenia !== "") {
      this._LogInService.iniciarSesion(contrasenia, usuario);
      this.valido = false;
      return;
    }
    this.valido = true;
  }



}
