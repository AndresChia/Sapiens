import { Component, OnInit } from '@angular/core';
import { alerta, estudiante } from '../../../../interface/interfaces';

@Component({
  selector: 'app-casincronas',
  templateUrl: './casincronas.component.html',
  styleUrls: ['./casincronas.component.css']
})
export class CasincronasComponent implements OnInit {


  seleccionado = false;
  indexSelecionado;

  alertas: alerta[] = [
    {
      estudiante: [
        {
          nombre: "carlos",
          apellido: "salfa",
          carrera: "Ingenieria de sistemas",
          semestre: 5,
          check: false
        }

      ],
      nombreAlerta: "Problema con profesor",
      remitente: "Estudiante",
      criticidad: "Alta",
      incidencias: 1
    }
    ,
    {

      estudiante: [
        {
          nombre: "juan",
          apellido: "salfa",
          carrera: "Ingenieria de sistemas",
          semestre: 1,
          check: false

        }, {

          nombre: "pedro",
          apellido: "salfa",
          carrera: "Ingenieria de sistemas",
          semestre: 2,
          check: false

        }

      ],
      nombreAlerta: "Estrés académico",
      remitente: "Estudiante",
      criticidad: "Media",
      incidencias: 2
    }

  ]


  estudianteActual: estudiante[] = [];
  constructor() { }

  ngOnInit() {
  }

  //FIXME:
  seleccionar(actual: number) {

    console.log("falta");
    //window.open(`consultaAsincrona/${actual}/${this.alertas[actual].nombreAlerta}`, '_blank')
    this.estudianteActual = this.alertas[actual].estudiante;
    this.seleccionado = true;
  }


  seleccionarCheck(i: number) {
    this.estudianteActual[i].check = !this.estudianteActual[i].check;
    this.indexSelecionado = i;
  }


  ActivarModalRemitir() {


  }
  ActivarModalEscalar() {


  }
  ActivarModalAtender() {


  }

  remitir() {



  }

}
