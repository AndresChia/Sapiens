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
  mensaje = {
    cuerpo: "",
    titulo: ""
  }
  alertaPopUp = false;
  historial: historialUsr[] = [];

  filtro = false;
  numeroDePags: number[];
  pagActual = 1;
  constructor(public _DirectorService: DirectorService, public _LogInService: LogInService) {
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
    this._DirectorService.obtenerHistorialDirector(this._LogInService.usuario.nombreUsuario).subscribe(res => {

      res[0].alertas.forEach(element => {
        let hostirialActual: historialUsr = {
          estado: element.estado,
          fecha: (element.fechaInicio as string).split("T")[0],
          idEstudiante: element.alerta.id,
          nombreAlerta: element.alerta.nombre,
          nombreEstudiante: "FALTA",
          origen: "FALTA",
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
