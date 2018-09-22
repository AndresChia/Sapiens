import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../services/log-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public _LogInService: LogInService, private router: Router) { }

  ngOnInit() {
  }

  login(usuario: string, contraseña: string) {
    this._LogInService.iniciarSesion(contraseña, usuario);
  }

}
