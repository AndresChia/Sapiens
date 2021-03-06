import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { LogInService } from '../../../services/log-in.service';
import { Router, Route } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {


  constructor(public _LogInService: LogInService, private router: Router) {

    if (_LogInService.usuario.acceso) {
      if (_LogInService.usuario.tipo === "consejero") {
        router.navigate(["consejero", "buscar"]);
      }
      if (_LogInService.usuario.tipo === "estudiante") {
        router.navigate(["estudiante"]);

      }
      if (_LogInService.usuario.tipo === "profesor") {
        router.navigate(["profesor"]);

      }
      if (_LogInService.usuario.tipo === "admin") {
        router.navigate(["admin"]);

      }
      if (_LogInService.usuario.tipo === "director") {
        router.navigate(["director"]);

      }


    }


  }

  ngOnInit() {
  }
  botonesDirector(nombre: string) {
    if (nombre === "demanda") {
      this.router.navigate(["director", "demanda"]);

    }
    if (nombre === "alerta") {
      this.router.navigate(["director", "alertas"]);

    }
    if (nombre === "historial") {
      this.router.navigate(["director", "historial"]);

    }
    if (nombre === "ia") {
      this.router.navigate(["director", "ia"]);

    }


  }

}
