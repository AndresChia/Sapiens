import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { FormGroup, FormControl } from '@angular/forms';
import { LogInService } from "../../../services/log-in.service";

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { consejero } from "../../../interface/interfaces";

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  forma: FormGroup;

  alertas: string[] = [
    "Inconvenientes personales con profesores", "Inconvenientes por la metodología de enseñanza ",
    "Bajo desempeño", "Orientación para la vida profesional", "Inconvenientes por los métodos de evaluación",
    "Desbalance en la carga academíca", "Dificultades de aprendizaje", "Estrés académico"
  ];
  inicio = false;
  consejeros: consejero[] = [
    {
      nombre: "Roberta",
      cargo: "Profesor Asociado",
      areasInteres: " Logística",
      correo: "mcarrill@javeriana.edu.co",
      horario: [
        "Martes 4: 00 p.m. - 6: 00 p.m.",
        "Miércoles 2: 00 p.m. - 4: 00 p.m.",
        "Jueves  3: 00 p.m. - 4: 00 p.m.",
        "lunes  5: 00 p.m. - 6: 00 p.m."
      ]
    },
    {
      nombre: "Carla",
      cargo: "Profesor Asociado",
      areasInteres: " Logística",
      correo: "mcarrill@javeriana.edu.co",
      horario: [
        "Martes 4: 00 p.m. - 6: 00 p.m.",
        "Miércoles 2: 00 p.m. - 4: 00 p.m.",
        "Jueves  3: 00 p.m. - 4: 00 p.m."
      ]
    }
  ];

  modal: consejero;
  activarModal = false;

  //funciones
  constructor(private appComponent: AppComponent, private router: Router, public snackBar: MatSnackBar,
    private _LogInService: LogInService) {

    this.forma = new FormGroup({
      opcion: new FormControl()
    });


  }

  ngOnInit() { }




  mostrarModal(i: number) {
    this.activarModal = true;
    this.modal = this.consejeros[i];
  }

  //FIXME: Falta crear la alerta
  agendar() {
    console.log("Falta crear alerta");
    this._LogInService.cerrarSesion();
    this.snackBar.open("Cita creada", "Cerrar", {
      duration: 2000,
    });


  }

}

