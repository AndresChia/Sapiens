import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { estudiante, clase, alerta } from "../../../interface/interfaces";
import { LogInService } from '../../../services/log-in.service';
import { ProfesorRestService } from '../../../services/serviciosRest/profesor-rest.service';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  mensaje = {
    cuerpo: "",
    titulo: ""
  }


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
  alertas: alerta[] = [];
  mostrarEstudiantes = false;
  mostrarTablas = false;
  estudiantes: estudiante[] = [];
  clases: clase[] = [];
  alertaPopUp = false;
  activarModal = false;
  colOrdenAnteri = 0;


  constructor(public _LogInService: LogInService, public snackBar: MatSnackBar, private _formBuilder: FormBuilder,
    private _ProfesorRestService: ProfesorRestService) { }
  ngOnInit() {

    this.forma = new FormGroup({
      opcion: new FormControl()
    });

    this.firstFormGroup = this._formBuilder.group({
      alertaSelect: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      claseSelect: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      estudianteSelect: ['', Validators.required]
    });
    this.cargarAlertasRol(this._LogInService);
  }

  obtenerClases() {
    this.clases = [];
    let _LogInService: LogInService;
    let x = this._ProfesorRestService.obtenerClases(this._LogInService.usuario.nombreUsuario).subscribe(res => {

      res.clases.forEach(element => {
        let clasePro: clase = {
          nombre: "",
          numeroEstudiantes: "",
          numero: "",
          check: false,
        };
        clasePro.numero = element.numero_clase;
        clasePro.nombre = element.nombre;
        clasePro.numeroEstudiantes = element.estudiantes;
        this.clases.push(clasePro);
      });
    }, error => {
      this.alertaPopUp = true;
      this.mensaje.cuerpo = "En este momento tenemos problemas con el servicio. sera notificado cuando funcione. Por favor intente de nuevo.";
      this.mensaje.titulo = "ERROR DEL SERVIDOR :";
      setTimeout(function () { _LogInService.cerrarSesion() }, 5000);
    });
  }

  cargarAlertasRol(_LogInService: LogInService) {
    this._ProfesorRestService.obtenerAlertasProfesor().subscribe(res => {
      res.forEach(element => {
        let alertaAgregar: alerta = {
          nombreAlerta: element.nombre,
          descripcion: element.descripcion,
          criticidad: element.criticidad,
          temporalidad: element.temporalidad,
          id: element.id,
        }
        this.alertas.push(alertaAgregar);
      });
    }, error => {
      this.alertaPopUp = true;
      this.mensaje.cuerpo = "En este momento tenemos problemas con el servicio. sera notificado cuando funcione. Por favor intente de nuevo.";
      this.mensaje.titulo = "ERROR DEL SERVIDOR :";
      setTimeout(function () { _LogInService.cerrarSesion() }, 5000);
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

    this.snackBar.open("Alerta creada", "Cerrar", {
      duration: 2000,
    });

  }

  seleccionClase(i: number) {
    this.claseSelecionada = i;
    this.controlBtn2 = false;
    this.secondFormGroup.get("claseSelect").setValue("correcto");
    let _LogInService = this._LogInService;

    this._ProfesorRestService.obtenerEstudiantesDeClase(this.clases[i - 1].numero).subscribe(res => {
      res.forEach(element => {
        let estudianteClase: estudiante = {
          nombre: element.nombres,
          apellido: element.apellido1 + " " + element.apellido2,
          carrera: element.carrera,
          semestre: element.Semestre,
          check: false,
          id: element.identificacion,
          facultad: "Ingenieria"
        };
        // estudianteClase.nombre = element.nombres;
        // estudianteClase.apellido = element.apellido;
        // estudianteClase.carrera = "FALTA";
        // estudianteClase.semestre = -1;
        this.estudiantes.push(estudianteClase);
      });
      // console.log(res.results[0]);
    }, error => {
      // this._LogInService.cerrarSesion()
      this.alertaPopUp = true;
      // tslint:disable-next-line:max-line-length
      this.mensaje.cuerpo = "En este momento tenemos problemas con el servicio. sera notificado cuando funcione. Por favor intente de nuevo.";
      this.mensaje.titulo = "ERROR DEL SERVIDOR :";
      setTimeout(function () { _LogInService.cerrarSesion() }, 5000);
    });
    // this.mostrarEstudiantes = true;

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
