import { Component, OnInit } from '@angular/core';
import { DirectorService } from '../../../../services/serviciosRest/director.service';
import { LogInService } from 'src/app/services/log-in.service';
import { historialUsr } from 'src/app/interface/interfaces';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  indice = 0;
  mensaje = {
    cuerpo: "",
    titulo: ""
  }
  alertaPopUp = false;
  historial: historialUsr[] = [];
  hisotorialCortado: historialUsr[][] = [[]];
  historialDeMostrar: historialUsr[] = [];
  filtro = false;
  numeroDePags: number[];
  pagActual = 1;
  constructor(public _DirectorService: DirectorService, public _LogInService: LogInService) {
    this.cargarHistorial();

    setTimeout(() => {


      for (let index = 0; index < Math.round(this.historial.length / 7); index++) {
        this.hisotorialCortado[index] = this.historial.splice(6 * (index + 1), 7);
      }
      this.numeroDePags = Array(Math.round(this.historial.length / 7)).fill(1, 2).map((x, i) => i);
      this.historialDeMostrar = this.hisotorialCortado[0];
    }, 1000);
  }

  ngOnInit() {
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


  filtrar(nombre, id, alerta, origen, fecha, estado) {
    if (nombre !== "" || id !== "" || alerta !== "" || origen !== "Seleccione una opción" || fecha !== ""
      || estado !== "Seleccione una opción") {
      this.filtro = true;
    }

  }


  cargarHistorial() {
    let _LogInService = this._LogInService;
    this._DirectorService.obtenerHistorialDirector(this._LogInService.usuario.nombreUsuario).subscribe(res => {
      res.forEach(estudiante => {
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
