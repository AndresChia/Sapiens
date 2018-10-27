import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../../app.component";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { ConsejeroComponent } from "../consejero.component";
import { LogInService } from '../../../../services/log-in.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { alertaSemestre, anotacion, datosAcademicos } from 'src/app/interface/interfaces';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  mostrar = false;
  remitirValor = true;
  checkFecha = false;
  url: string;
  busquedaBool = false;


  forma: FormGroup;

  busqueda: any = {

    nombre: "",
    correo: "",
    opcion: "0"

  };


  alertas: string[] = [
    "Inconvenientes personales con profesores", "Inconvenientes por la metodología de enseñanza ",
    "Bajo desempeño", "Orientación para la vida profesional", "Inconvenientes por los métodos de evaluación",
    "Desbalance en la carga academíca", "Dificultades de aprendizaje", "Estrés académico", "Retiro temporal",
    "Retiro Definitivo", "Retiro de Asignaturas", "Dificultades en habilidades de comunicación",
    "Dificultades para el trabajo en equipo", "Conocimientos de física en el examen de entrada",
    "Habilidades matematicas básicas en examen de entrada", "Comprensión lectora y escritura en examen de entrada",
    "No Asistencia a clases"];

  estudiantes: estudiante[] = [
    {
      id: "1",
      nombre: "carlos",
      apellido: "salda",
      carrera: "sistemas",
      semestre: 1
    }
  ];


  historialAlerta: alertaSemestre[] = [{
    fecha: "10/10/2018",
    semestre: "1",
    alerta: "cear",
    creador: "carlos",
  }

  ];
  anotaciones: anotacion[] = [{

    responsable: "carlos",
    anotacion: "string",
    alerta: "adadah adioooiads ",
    fecha: "10/10/2018",

  }];
  datosAcademicos: datosAcademicos[] = [{
    creditosAprobados: "20",
    creditosRetirados: "0",
    promedio: "3.5",
    semestre: "1",
  }];




  constructor(private _LogInService: LogInService, private consejeroComponent: ConsejeroComponent, private router: Router,
    public snackBar: MatSnackBar) {
    this.forma = new FormGroup({
      'nombre': new FormControl(''),
      'correo': new FormControl(''),
      'opcion': new FormControl('')

    });
    this.forma.setValue(this.busqueda);

    this.url = router.url;

  }

  ngOnInit() { }

  seleccionar(actual: number) {
    //this.consejeroComponent.alertar();
    //this.router.navigate([this.router.url, this.estudiantes[actual].id]);
    this.mostrar = true;
  }

  //FIXME:
  buscar() {

    // console.log("Falta buscar las alertas y ponerlas en la tabla");
    if (this.forma.get("nombre").value !== "" || this.forma.get("correo").value !== "") {
      this.busquedaBool = true;
      this.mostrar = false;
    }


  }


  scrollToElement($element): void {



    // console.log($element);
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }


  scrollToElementInicio() {
    window.scrollTo(0, 0);
    this.mostrar = false;
    this.busquedaBool = false;
    this.forma.setValue({ nombre: "", correo: "", opcion: "0" })

  }



  ActivarModalRemitir() {
    this.remitirValor = true;
    this.forma.setValue(this.busqueda);
  }
  ActivarModalEscalar() {
    this.remitirValor = true;
    this.forma.setValue(this.busqueda);
  }
  ActivarModalAtender() {
    this.remitirValor = true;
    this.forma.setValue(this.busqueda);
  }

  remitir(opc: number) {
    window.scrollTo(0, 0);
    this.mostrar = false;

    this.snackBar.open("Remición creada", "Cerrar", {
      duration: 2000,
    });

  }
  escalar() {
    window.scrollTo(0, 0);
    this.mostrar = false;

    this.snackBar.open("Escalamiento creado", "Cerrar", {
      duration: 2000,
    });

  }
  atender() {






    window.scrollTo(0, 0);
    this.mostrar = false;

    this.snackBar.open("Atencion realizada", "Cerrar", {
      duration: 2000,
    });

  }

  check() {
    this.checkFecha = (!this.checkFecha);

  }
  selecionAlerta() {

    if (this.forma.get('opcion').value !== "0") {
      this.remitirValor = false;
    } else {
      this.remitirValor = true;

    }

  }

}

interface estudiante {
  id: string;
  nombre: string;
  apellido: string;
  carrera: string;
  semestre: number;
}
