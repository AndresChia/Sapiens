import { Component, OnInit } from '@angular/core';
import { alerta, estudiante } from '../../../../interface/interfaces';

@Component({
  selector: 'app-periodicas',
  templateUrl: './periodicas.component.html',
  styleUrls: ['./periodicas.component.css']
})
export class PeriodicasComponent implements OnInit {
  estudianteActual: estudiante[];
  seleccionado = false;
  indexSelecionado: number;
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
      nombreAlerta: "Segunda prueba",
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

    this.estudianteActual = this.periodos[i].estudiante;
    this.seleccionado = true;


  }

  seleccionarCheck(i: number) {
    this.estudianteActual[i].check = !this.estudianteActual[i].check;
    this.indexSelecionado = i;
  }

  ActivarModalEscalar() {


  }
  ActivarModalAtender() {


  }



}
