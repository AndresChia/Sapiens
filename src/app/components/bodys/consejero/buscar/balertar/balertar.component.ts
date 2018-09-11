import { Component, OnInit } from '@angular/core';
import { ConsejeroComponent } from "../../consejero.component";
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, RouterState } from '@angular/router';
import { BuscarComponent } from '../buscar.component';

@Component({
  selector: 'app-balertar',
  templateUrl: './balertar.component.html',
  styleUrls: ['./balertar.component.css']
})
export class BalertarComponent implements OnInit {

  btn = "0";
  forma: FormGroup;
  historialAlerta;
  activarModal = false;

  constructor(private consejeroComponent: ConsejeroComponent, public snackBar: MatSnackBar,
    private router: Router) {

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
    //this.consejeroComponent.regresar();
    this.router.navigate(["/" + this.consejeroComponent.url + "/buscar"]);
  }


  setActive(opcion: string) {

    this.btn = opcion;
  }
  //FIXME: crear escalamiento
  escalar() {
    this.regresar();
    this.snackBar.open("Escalamiento creado", "Cerrar", {
      duration: 2000,
    });

  }
  remitir() {
    this.regresar();
    this.snackBar.open("Remición creada", "Cerrar", {
      duration: 2000,
    });

  }

  modal() {
    this.activarModal = true;
  }


  //FIXME: cuando se seleccione un periodo academico

  seleccionar() {


  }

}
