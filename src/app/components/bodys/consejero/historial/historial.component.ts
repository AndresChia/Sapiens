import { Component, OnInit } from '@angular/core';
import { ConsejeroService } from '../../../../services/serviciosRest/consejero.service';
import { LogInService } from '../../../../services/log-in.service';
import { historialUsr } from '../../../../interface/interfaces';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})

export class HistorialCComponent implements OnInit {
  mensaje = {
    cuerpo: "",
    titulo: ""
  }
  indice = 0;

  filtro = false;
  numeroDePags: number[];
  pagActual = 1;
  alertaPopUp = false;

  historial: historialUsr[] = [];
  hisotorialCortado: historialUsr[][] = [[]];
  historialDeMostrar: historialUsr[] = [];


  constructor(public _ConsejeroService: ConsejeroService, public _LogInService: LogInService) {
    this.cargarHistorial();

    setTimeout(() => {


      for (let index = 0; index < Math.round(this.historial.length / 10); index++) {
        this.hisotorialCortado[index] = this.historial.splice(6 * (index + 1), 10);
      }
      this.numeroDePags = Array(Math.round(this.historial.length / 10)).fill(1, 2).map((x, i) => i);
      this.historialDeMostrar = this.hisotorialCortado[0];

    }, 2000);

  }

  ngOnInit() {
  }



  filtrar(nombre, id, alerta, origen, fecha, estado) {
    if (nombre !== "" || id !== "" || alerta !== "" || origen !== "Seleccione una opción" || fecha !== ""
      || estado !== "Seleccione una opción") {
      this.filtro = true;
    }
  }


  cambioPag(index: number, indicacion: string) {

    if (indicacion === "antes") {
      if (this.indice > 0) {
        this.indice -= index;
      }

    }

    if (indicacion === "despues") {
      if (this.indice < Math.round(this.historial.length / 7) - 1) {
        this.indice += index;
      }

    }
    if (indicacion === "pagina") {
      this.indice = index;

    }
    this.historialDeMostrar = this.hisotorialCortado[this.indice];

  }

  cargarHistorial() {
    let _LogInService = this._LogInService;
    this._ConsejeroService.obtenerHistorialConsejero(this._LogInService.usuario.nombreUsuario).subscribe(res => {
      res.alertas.forEach(estudiante => {
        estudiante.alertas.forEach(element => {
          let hostirialActual: historialUsr = {
            estado: element.estado,
            fecha: (element.fechaInicio as string).split("T")[0],
            idEstudiante: estudiante.id,
            nombreAlerta: element.alerta.nombre,
            nombreEstudiante: estudiante.nombres + " " + estudiante.apellido1 + estudiante.apellido2,
            origen: "Consejero"
          };
          this.historial.push(hostirialActual);
        });
      });
    }, error => {
      this.alertaPopUp = true;
      this.mensaje.cuerpo = "En este momento tenemos problemas con el servicio. sera notificado cuando funcione. Por favor intente de nuevo.";
      this.mensaje.titulo = "ERROR DEL SERVIDOR :";
      setTimeout(function () { _LogInService.cerrarSesion() }, 5000);
    });

  }
}
