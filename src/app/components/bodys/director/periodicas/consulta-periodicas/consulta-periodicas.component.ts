import { Component, OnInit } from '@angular/core';
import { estudiante } from '../../../../../interface/interfaces';
import { LogInService } from '../../../../../services/log-in.service';

@Component({
  selector: 'app-consulta-periodicas',
  templateUrl: './consulta-periodicas.component.html',
  styleUrls: ['./consulta-periodicas.component.css']
})
export class ConsultaPeriodicasComponent implements OnInit {
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