import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LogInService } from "../../../services/log-in.service";
import { EstudianteRestService } from "../../../services/serviciosRest/estudiante-rest.service";
import { MatSnackBar } from '@angular/material';
import { consejero, usuario, alerta } from '../../../interface/interfaces';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  mensaje = {
    cuerpo: "",
    titulo: ""
  }
  modal: consejero = {
    nombre: "",
    cargo: "",
    areasInteres: "",
    correo: "",
    horario: []
  };
  srcs_imagen: string[] = [];
  consejeros: consejero[] = [];
  alertas: alerta[] = [];
  consejeroSelecionado = 0;
  controlBtn1 = true;
  controlBtn2 = true;
  mostrar = true;
  alertaPopUp = false;
  inicio = false;
  activarModal = false;
  alertaSelect = new FormControl();
  forma: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  estudianteActual: usuario = this._LogInService.usuario;

  constructor(public snackBar: MatSnackBar, public _LogInService: LogInService, private _formBuilder: FormBuilder, private _EstudianteRestService: EstudianteRestService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      opcion: new FormControl()
    });
    this.firstFormGroup = this._formBuilder.group({
      alertaSelect: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      consejeroSelect: ['', Validators.required]
    });

    this.cargarAlertasRol();
    this.cargarConsejeros();
  }

  cargarAlertasRol() {
    let _LogInService = this._LogInService;
    this._EstudianteRestService.obtenerAlertasEstudiante().subscribe(res => {
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

  cargarConsejeros() {
    this.consejeros = [];
    let _LogInService = this._LogInService;
    this._EstudianteRestService.obtenerConsejeros(this._LogInService.estudiante.carrera, this._LogInService.estudiante.facultad).subscribe(res => {
      res.forEach(element => {
        let consejeroAgregar: consejero = {
          areasInteres: element.areas_interes,
          cargo: element.cargo,
          correo: element.correo,
          horario: element.horarios,
          id: element.identificacion,
          nombre: element.nombres + " " + element.apellido1 + " " + element.apellido2,
          src_imagen: element.src_imagen,
        }
        this.consejeros.push(consejeroAgregar);
        this.srcs_imagen.push(element.src_imagen);
      });
    }, error => {
      this.alertaPopUp = true;
      this.mensaje.cuerpo = "En este momento tenemos problemas con el servicio. sera notificado cuando funcione. Por favor intente de nuevo.";
      this.mensaje.titulo = "ERROR DEL SERVIDOR :";
      setTimeout(function () { _LogInService.cerrarSesion() }, 5000);
    });
  }

  agendar() {
    this._EstudianteRestService.crearMotivoDeAlerta(this._LogInService.usuario.nombreUsuario, this.consejeros[this.consejeroSelecionado].id);
    this._LogInService.cerrarSesion();
    this.snackBar.open("Cita creada", "Cerrar", {
      duration: 2000,
      horizontalPosition: "center",
      panelClass: ['snackbar'],
      verticalPosition: "top"
    });

  }

  elegirAlerta(aler: string) {
    if (aler !== "Seleccion una opción") {
      this.controlBtn1 = false;
      this.firstFormGroup.get("alertaSelect").setValue("correcto");
    } else {
      this.controlBtn1 = true;
      this.firstFormGroup.get("alertaSelect").setValue(null);
    }
  }

  SelecionarConsejero(i: number) {
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

  obtenerConsejeros() {
    // this._EstudianteRestService.obtenerConsejeros(this.estudianteActual).subscribe(res => {
    //   res.results.forEach(element => {
    //     let consejeroAux: consejero = {
    //       nombre: "",
    //       cargo: "",
    //       areasInteres: "",
    //       correo: "",
    //       horario: [],
    //       id: "",
    //     };
    //     consejeroAux.correo = element.correo;
    //     consejeroAux.horario = ["FALTA"];
    //     consejeroAux.areasInteres = "FALTA";
    //     consejeroAux.cargo = "FALTA";
    //     consejeroAux.id = element.id;
    //     consejeroAux.nombre = element.nombres;
    //     this.consejeros.push(consejeroAux);
    //   });
    // }, error => {
    //   this.alertaPopUp = true;
    //   this.mensaje.cuerpo = "En este momento tenemos problemas con el servicio. sera notificado cuando funcione. Por favor intente de nuevo.";
    //   this.mensaje.titulo = "ERROR DEL SERVIDOR :";
    //   setTimeout(function () { this._LogInService.cerrarSesion() }, 5000);
    // });
  }

}

