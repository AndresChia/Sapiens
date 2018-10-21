import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LogInService } from "../../../services/log-in.service";
import { EstudianteRestService } from "../../../services/serviciosRest/estudiante-rest.service";

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { consejero } from '../../../interface/interfaces';

import { MatStepperModule } from '@angular/material/stepper';


@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  consejeroSelecionado = 0;
  controlBtn1 = true;
  controlBtn2 = true;
  mostrar = true;
  alertaSelect = new FormControl();

  forma: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  alertas: string[] = [
    "Inconvenientes personales con profesores", "Inconvenientes por la metodología de enseñanza ",
    "Bajo desempeño", "Orientación para la vida profesional", "Inconvenientes por los métodos de evaluación",
    "Desbalance en la carga academíca", "Dificultades de aprendizaje", "Estrés académico"
  ];
  inicio = false;
  consejeros: consejero[] = [];

  modal: consejero = {
    nombre: "",
    cargo: "",
    areasInteres: "",
    correo: "",
    horario: []
  };
  activarModal = false;

  //funciones
  constructor(private appComponent: AppComponent, private router: Router, public snackBar: MatSnackBar,
    private _LogInService: LogInService, private _formBuilder: FormBuilder, private _EstudianteRestService: EstudianteRestService) {

    this.forma = new FormGroup({
      opcion: new FormControl()
    });

    this.consejeros = [];
    this._EstudianteRestService.obtenerConsejeros(1).subscribe(res => {
      res.results.forEach(element => {
        let consejeroAux: consejero = {
          nombre: "",
          cargo: "",
          areasInteres: "",
          correo: "",
          horario: [],
          id: "",
        };
        consejeroAux.correo = element.correo;
        consejeroAux.horario = ["FALTA"];
        consejeroAux.areasInteres = "FALTA";
        consejeroAux.cargo = "FALTA";
        consejeroAux.id = element.id;
        consejeroAux.nombre = element.nombres;
        this.consejeros.push(consejeroAux);
      });
      // console.log(res.results[0]);
    });




  }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      alertaSelect: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      consejeroSelect: ['', Validators.required]
    });



  }






  //FIXME: Falta crear la alerta
  agendar() {

    // console.log(this.modal, localStorage.getItem("1"));
    // console.log("Falta crear alerta");
    this._LogInService.cerrarSesion();
    this.snackBar.open("Cita creada", "Cerrar", {
      duration: 2000,
    });


  }

  elegirAlerta(aler: string) {

    // console.log(aler);
    //console.log(this.forma.get("opcion"));

    if (aler !== "Seleccion una opción") {

      this.controlBtn1 = false;
      this.firstFormGroup.get("alertaSelect").setValue("correcto");
      return;
    }
    this.controlBtn1 = true;
    this.firstFormGroup.get("alertaSelect").setValue(null);

  }

  SelecionarConsejero(i: number) {

    // console.log(i);
    this.consejeroSelecionado = i;

    this.controlBtn2 = false;
    this.modal = this.consejeros[i - 1];
    this.secondFormGroup.get("consejeroSelect").setValue("correcto");
    let x = document.getElementsByTagName("body");

    window.scrollTo(0, x[0].clientHeight);
  }

  subirPantalla() {

    window.scrollTo(0, 0);


  }

  scrollToElementSiguiente() {

  }

  scrollToElementAnterior() {


  }

}

