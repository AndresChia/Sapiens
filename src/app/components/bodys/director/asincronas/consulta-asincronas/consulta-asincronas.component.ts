import { Component, OnInit } from '@angular/core';
import { estudiante, alerta } from '../../../../../interface/interfaces';
import { LogInService } from '../../../../../services/log-in.service';

@Component({
  selector: 'app-consulta-asincronas',
  templateUrl: './consulta-asincronas.component.html',
  styleUrls: ['./consulta-asincronas.component.css']
})
export class ConsultaAsincronasComponent implements OnInit {

  estudiantes: estudiante;

  constructor(private _LogInService: LogInService) {

    _LogInService.tipo = "admin";

  }

  ngOnInit() {
  }

  cerrar() {
    window.close();
  }

}
