import { Component, OnInit } from '@angular/core';
import { ConsejeroComponent } from "../consejero.component";
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {
  btn = "0";
  forma: FormGroup;
  historialAlerta;
  activarModal = false;

  constructor(private consejeroComponent: ConsejeroComponent, public snackBar: MatSnackBar) {

    this.btn = "1";

    this.forma = new FormGroup({
      opcion: new FormControl()
    });

  }

  alertas: string[] = [
    "Inconvenientes personales con profesores", "Inconvenientes por la metodología de enseñanza ",
    "Bajo desempeño", "Orientación para la vida profesional", "Inconvenientes por los métodos de evaluación",
    "Desbalance en la carga academíca", "Dificultades de aprendizaje", "Estrés académico", "Retiro temporal",
    "Retiro Definitivo", "Retiro de Asignaturas", "Dificultades en habilidades de comunicación",
    "Dificultades para el trabajo en equipo", "Conocimientos de física en el examen de entrada",
    "Habilidades matematicas básicas en examen de entrada", "Comprensión lectora y escritura en examen de entrada",
    "No Asistencia a clases"];


  ngOnInit() {
  }

  regresar() {
    this.consejeroComponent.regresar();

  }


  setActive(opcion: string) {

    this.btn = opcion;
  }
  //FIXME: crear escalamiento
  escalar() {
    console.log("Falta crear el modal y escalar");
    let a: object = {
      opcion: 0
    }
    this.forma.setValue(a);

    this.snackBar.open("Escalamiento creado", "Cerrar", {
      duration: 2000,
    });

  }

  modal() {
    this.activarModal = true;


  }

}
