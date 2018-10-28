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
  filtro = false;
  numeroDePags: number[];
  pagActual = 1;
  alertaPopUp = false;

  historial: historialUsr[] = [];

  constructor(public _ConsejeroService: ConsejeroService, public _LogInService: LogInService) {
    this.numeroDePags = Array(2).fill(1, 2).map((x, i) => i);
    this.cargarHistorial();
  }

  ngOnInit() {
  }

  cambioPag(index: number) {
  }


  filtrar(nombre, id, alerta, origen, fecha, estado) {
    if (nombre !== "" || id !== "" || alerta !== "" || origen !== "Seleccione una opción" || fecha !== ""
      || estado !== "Seleccione una opción") {
      this.filtro = true;
    }
  }

  cargarHistorial() {
    let _LogInService = this._LogInService;
    this._ConsejeroService.obtenerHistorialConsejero(this._LogInService.usuario.nombreUsuario).subscribe(res => {

      res.alertas.forEach(element => {
        let hostirialActual: historialUsr = {
          estado: "",
          fecha: "",
          idEstudiante: "",
          nombreAlerta: "",
          nombreEstudiante: " ",
          origen: "",
        };

        this.historial.push(hostirialActual);
      });
    }, error => {
      this.alertaPopUp = true;
      this.mensaje.cuerpo = "En este momento tenemos problemas con el servicio. sera notificado cuando funcione. Por favor intente de nuevo.";
      this.mensaje.titulo = "ERROR DEL SERVIDOR :";
      setTimeout(function () { this._LogInService.cerrarSesion() }, 5000);
    });

  }
}
