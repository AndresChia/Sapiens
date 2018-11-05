import { Component, OnInit } from '@angular/core';
import { DirectorService } from '../../../../services/serviciosRest/director.service';
import { LogInService } from 'src/app/services/log-in.service';
import { historialUsr } from 'src/app/interface/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  indice = 1;
  mensaje = {
    cuerpo: "",
    titulo: ""
  }
  alertaPopUp = false;
  historial: historialUsr[] = [];
  hisotorialCortado: historialUsr[][] = [[]];
  historialDeMostrar: historialUsr[] = [];

  vehicles: Observable<Array<historialUsr>>;
  tamaño = 0;


  filtro = false;
  numeroDePags: number[];
  pagActual = 1;
  constructor(public _DirectorService: DirectorService, public _LogInService: LogInService) {
    this.cargarHistorial();

    setTimeout(() => {
      this.tamaño = this.historial.length;

      for (let index = 0; index <= Math.round(this.tamaño / 6); index++) {
        if (this.historial.length > 6) {
          this.hisotorialCortado[index] = this.historial.splice(0, 6);
        } else {
          this.hisotorialCortado[index] = this.historial;

        }
      }
      this.numeroDePags = Array(Math.round(this.tamaño / 6)).fill(1, 2).map((x, i) => i);
      this.historialDeMostrar = this.hisotorialCortado[0];


    }, 2000);
  }

  ngOnInit() {
  }

  cambioPag(index: number, indicacion: string) {

    if (indicacion === "antes") {
      if (this.indice - 1 > 0) {
        this.indice -= index;
      }

    }

    if (indicacion === "despues") {
      if (this.indice - 1 < this.numeroDePags.length - 1) {
        this.indice += index;
      }

    }
    if (indicacion === "pagina") {
      this.indice = index + 1;

    }
    this.historialDeMostrar = this.hisotorialCortado[this.indice - 1];

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
      res.forEach(alert => {

        let datos = this.getEstudiante(alert.actores);
        let hostirialActual: historialUsr = {
          estado: alert.estado,
          fecha: (alert.fechaInicio as string).split("T")[0],
          idEstudiante: datos[0],
          nombreAlerta: alert.alerta.nombre,
          nombreEstudiante: datos[1],
          origen: datos[2],
        };

        this.historial.push(hostirialActual);


      });

    }, error => {
      this.alertaPopUp = true;
      this.mensaje.cuerpo = "En este momento tenemos problemas con el servicio. sera notificado cuando funcione. Por favor intente de nuevo.";
      this.mensaje.titulo = "ERROR DEL SERVIDOR :";
      setTimeout(function () { _LogInService.cerrarSesion() }, 5000);
    });

  }

  getEstudiante(actores: any): string[] {
    let arregloActual: string[] = ["", "", ""];
    actores.forEach(element => {
      let fuenteT = false;
      let estudianteT = false;
      element.roles.forEach(element2 => {
        if (element2.rol === "fuente") {
          fuenteT = true;
          arregloActual[2] = (element.nombres + " " + element.apellido1);
        }
        if (element2.rol === "estudiante") {
          estudianteT = true;
          arregloActual[0] = element.identificacion;
          arregloActual[1] = (element.nombres + " " + element.apellido1);
        }

      });

      if (arregloActual.filter(a => a !== "").length === 3) {
        return arregloActual;
      }


    });


    return arregloActual;
  }



}
