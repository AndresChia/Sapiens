import { Component, OnInit } from '@angular/core';
import { alerta, estudiante } from '../../../../interface/interfaces';

@Component({
  selector: 'app-asincronas',
  templateUrl: './asincronas.component.html',
  styleUrls: ['./asincronas.component.css']
})
export class AsincronasComponent implements OnInit {
  estudianteActual: estudiante[];
  seleccionado = false;
  indexSelecionado: number;
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

  ngOnInit() { }

  seleccionar(i: number) {

    this.estudianteActual = this.alertas[i].estudiante;
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
