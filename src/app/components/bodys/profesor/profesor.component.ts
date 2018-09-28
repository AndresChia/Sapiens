import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { estudiante, clase } from "../../../interface/interfaces";
import { LogInService } from '../../../services/log-in.service';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

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
      check: false,


    }, {
      nombre: "calculo",
      numeroEstudiantes: "19",
      numero: "2356",
      check: false,

    }
  ];

  activarModal = false;


  constructor(private _LogInService: LogInService, public snackBar: MatSnackBar, private _formBuilder: FormBuilder) {

    this.forma = new FormGroup({
      opcion: new FormControl()
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
    console.log("falta crear la alerta");

    let a: object = {
      opcion: 0
    }
    this.forma.setValue(a);


    this.snackBar.open("Alerta creada", "Cerrar", {
      duration: 2000,
    });

  }

  seleccionClase(i: number) {
    // this.mostrarEstudiantes = true;
    this.claseSelecionada = i;
    this.controlBtn2 = false;
    this.secondFormGroup.get("claseSelect").setValue("correcto");
  }


  elegirAlerta(aler: string) {

    console.log(aler);
    //console.log(this.forma.get("opcion"));

    if (aler !== "0") {

      this.controlBtn1 = false;
      this.firstFormGroup.get("alertaSelect").setValue("correcto");
      return;
    }
    this.controlBtn1 = true;
    this.firstFormGroup.get("alertaSelect").setValue(null);

  }

}
