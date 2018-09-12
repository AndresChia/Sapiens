import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { estudiante, clase } from "../../../interface/interfaces";
import { LogInService } from '../../../services/log-in.service';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {
  forma: FormGroup;

  actualAlerta = '0';
  actualEstudiante: number;
  alertas: string[] = ["Inasistencias de estudiante", "Problema con estudiante"];
  mostrarEstudiantes = false;
  mostrarTablas = false;
  estudiantes: estudiante[] = [
    {
      nombre: "carlos",
      apellido: "salda",
      carrera: "sistemas",
      semestre: 1,
      check: false,

    },
    {
      nombre: "pedro",
      apellido: "salda",
      carrera: "sistemas",
      semestre: 2,
      check: false,

    },
    {
      nombre: "juan",
      apellido: "salda",
      carrera: "sistemas",
      semestre: 1,
      check: false,

    }
  ];
  clases: clase[] = [
    {
      nombre: "calculo",
      numeroEstudiantes: "23",
      numero: "2355",


    }
  ];

  activarModal = false;


  constructor(private _LogInService: LogInService, public snackBar: MatSnackBar) {

    this.forma = new FormGroup({
      opcion: new FormControl()
    });



  }
  ngOnInit() {
  }

  seleccionarClase(i: number) {
    this.mostrarEstudiantes = true;

  }
  seleccionarEstudiante(i: number) {

    this.activarModal = true;
  }
  seleccionarCheck(i: number) {
    this.estudiantes[i].check = !this.estudiantes[i].check;
  }

  //FIXME: crear alerta
  alertar() {
    console.log("falta crear la alerta");

    let a: object = {
      opcion: 0
    }
    this.forma.setValue(a);


    this.snackBar.open("Alerta creada", "Cerrar", {
      duration: 2000,
    });

  }


}
