import { Component, OnInit } from '@angular/core';
import { alerta } from '../../../../interface/interfaces';

@Component({
  selector: 'app-periodicas',
  templateUrl: './periodicas.component.html',
  styleUrls: ['./periodicas.component.css']
})
export class PeriodicasComponent implements OnInit {

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
    window.open(`consultaPeriodicas/${this.periodos[i].periodo}/${this.periodos[i].nombreAlerta}`, '_blank')

  }
}
