import { Component, OnInit } from '@angular/core';
import { alerta } from '../../../../interface/interfaces';

@Component({
  selector: 'app-casincronas',
  templateUrl: './casincronas.component.html',
  styleUrls: ['./casincronas.component.css']
})
export class CasincronasComponent implements OnInit {

  alertas: alerta[] = [
    {
      estudiante: [
        {
          nombre: "carlos",
          apellido: "salfa",
          carrera: "Ingenieria de sistemas",
          semestre: 5,
        }

      ],
      nombreAlerta: "Problema con profesor",
      remitente: "string",
      criticidad: "Alta",
      incidencias: 1
    }

  ]
  constructor() { }

  ngOnInit() {
  }

  //FIXME:
  seleccionar(actual: number) {

    console.log("falta");
    //window.open(`consultaAsincrona/${actual}/${this.alertas[actual].nombreAlerta}`, '_blank')

  }

}
