import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { estudiante, clase } from "../../../interface/interfaces";
import { LogInService } from '../../../services/log-in.service';
import { ProfesorRestService } from '../../../services/serviciosRest/profesor-rest.service';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  asc = true;
  tablaActual = undefined;
  indiceActual = -1;
  claseSelecionada = 0;
  controlBtn1 = true;
  controlBtn2 = true;
  controlBtn3 = true;


  forma: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  actualAlerta = '0';
  actualEstudiante: number;
  alertas: string[] = ["Inasistencias de estudiante", "Problema con estudiante"];
  mostrarEstudiantes = false;
  mostrarTablas = false;
  estudiantes: estudiante[] = [];
  clases: clase[] = [];

  activarModal = false;
  colOrdenAnteri = 0;


  constructor(private _LogInService: LogInService, public snackBar: MatSnackBar, private _formBuilder: FormBuilder,
    private _ProfesorRestService: ProfesorRestService) {

    this.forma = new FormGroup({
      opcion: new FormControl()
    });

    this._ProfesorRestService.obtenerClases(1).subscribe(res => {
      let clasePro: clase = {
        nombre: "",
        numeroEstudiantes: "",
        numero: "",
        check: false,
      };
      res.results.forEach(element => {
        clasePro.numero = element.codigo_clase;
        clasePro.nombre = element.nombre_asignatura;
        clasePro.numeroEstudiantes = element.numero_estudiantes;
        this.clases.push(clasePro);
      });
      // console.log(res.results[0]);
    });



  }
  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      alertaSelect: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      claseSelect: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      estudianteSelect: ['', Validators.required]
    });

  }


  seleccionarEstudiante(i: number) {

    this.activarModal = true;
  }
  seleccionarCheck(i: number) {
    this.estudiantes[i].check = !this.estudiantes[i].check;

    this.controlBtn3 = false;
    this.thirdFormGroup.get("estudianteSelect").setValue("correcto");

  }

  //FIXME: crear alerta
  alertar() {
    // console.log("falta crear la alerta");

    let a: object = {
      opcion: 0
    }
    this.forma.setValue(a);

    let estudiantesChescks: estudiante[] = [];
    this.estudiantes.forEach(element => {
      if (element.check) {
        estudiantesChescks.push(element);
      }
    });

    // console.log(this.firstFormGroup.get("alertaSelect").value, estudiantesChescks, localStorage.getItem("1"));



    this.snackBar.open("Alerta creada", "Cerrar", {
      duration: 2000,
    });

  }

  seleccionClase(i: number) {

    this._ProfesorRestService.obtenerEstudiantesDeClase(i).subscribe(res => {

      res.results.forEach(element => {
        let estudianteClase: estudiante = {
          nombre: "",
          apellido: "",
          carrera: "",
          semestre: undefined,
          check: false,
        };
        estudianteClase.nombre = element.nombres;
        estudianteClase.apellido = element.apellido;
        estudianteClase.carrera = "FALTA";
        estudianteClase.semestre = -1;
        this.estudiantes.push(estudianteClase);
      });
      // console.log(res.results[0]);
    });

    // this.mostrarEstudiantes = true;
    this.claseSelecionada = i;
    this.controlBtn2 = false;
    this.secondFormGroup.get("claseSelect").setValue("correcto");
  }


  elegirAlerta(aler: string) {

    // console.log(aler);
    //console.log(this.forma.get("opcion"));

    if (aler !== "0") {

      this.controlBtn1 = false;
      this.firstFormGroup.get("alertaSelect").setValue(aler);
      return;
    }
    this.controlBtn1 = true;
    this.firstFormGroup.get("alertaSelect").setValue(null);

  }

  ordenar(n: number, id: string) {
    this.tablaActual = id;
    this.indiceActual = n;

    if (n !== this.indiceActual) {
      this.asc = true;
    } else {
      this.asc = !this.asc;
    }
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(id);
    switching = true;
    if (this.asc) {
      dir = "asc";
    } else {
      dir = "desc";
    }
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir === "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount === 0 && dir === "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }


  }
}
