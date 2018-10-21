import { Component, OnInit } from '@angular/core';
import { alerta, anotacion, datosAcademicos, alertaSemestre } from '../../../../../interface/interfaces';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  historialAlerta: alertaSemestre[] = [{
    fecha: "10/10/2018",
    semestre: "1",
    alerta: "cear",
    creador: "carlos",
  }

  ];
  anotaciones: anotacion[] = [{

    responsable: "carlos",
    anotacion: "string",
    alerta: "adadah adioooiads ",
    fecha: "10/10/2018",

  }];
  datosAcademicos: datosAcademicos[] = [{
    creditosAprobados: "20",
    creditosRetirados: "0",
    promedio: "3.5",
    semestre: "1",
  }];

  constructor() { }

  ngOnInit() {
  }

  seleccionar(index: number) {



  }

}
