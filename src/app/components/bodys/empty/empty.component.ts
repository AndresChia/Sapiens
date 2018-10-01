import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { LogInService } from '../../../services/log-in.service';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {

  constructor(private _LogInService: LogInService, private router: Router) {

    if (_LogInService.usuario.acceso) {
      if (_LogInService.usuario.tipo === "consejero") {
        router.navigate(["consejero"]);
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

}
