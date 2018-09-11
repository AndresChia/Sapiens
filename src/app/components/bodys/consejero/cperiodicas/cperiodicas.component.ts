import { Component, OnInit } from '@angular/core';
import { alerta } from '../../../../interface/interfaces';

@Component({
  selector: 'app-cperiodicas',
  templateUrl: './cperiodicas.component.html',
  styleUrls: ['./cperiodicas.component.css']
})
export class CperiodicasComponent implements OnInit {
  periodos: alerta[] = [
    {
      estudiante: [
        {
          nombre: "carlos",
          apellido: "salfa",
          carrera: "Ingenieria de sistemas",
          semestre: 5,
        }

      ],
      nombreAlerta: "Primera prueba",
      remitente: "string",
      criticidad: "Alta",
      incidencias: 1,
      periodo: "2018-3",
    }

  ]
  constructor() { }

  ngOnInit() {
  }

  seleccionar(i: number) {
    //window.open(`consultaPeriodicas/${this.periodos[i].periodo}/${this.periodos[i].nombreAlerta}`, '_blank')

  }

}
