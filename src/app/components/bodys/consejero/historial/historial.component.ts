import { Component, OnInit } from '@angular/core';
import { ConsejeroService } from '../../../../services/serviciosRest/consejero.service';
import { LogInService } from '../../../../services/log-in.service';
import { historialUsr, alerta } from '../../../../interface/interfaces';

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
  indice = 1;
  paginado = false;
  filtro = false;
  numeroDePags: number[];
  pagActual = 1;
  alertaPopUp = false;
  alertas: alerta[] = [];

  historial: historialUsr[] = [];
  hisotorialCortado: historialUsr[][] = [[]];
  historialDeMostrar: historialUsr[] = [];
  tamaño = 0;


  constructor(public _ConsejeroService: ConsejeroService, public _LogInService: LogInService) {
    this.cargarHistorial();
    this.cargarAlertasRol();
    setTimeout(() => {
      this.tamaño = this.historial.length;

      for (let index = 0; index <= Math.round(this.tamaño / 6); index++) {
        if (this.historial.length > 6) {
          this.hisotorialCortado[index] = this.historial.splice(0, 6);
        } else {
          this.hisotorialCortado[index] = this.historial;

        }
      }
      this.numeroDePags = Array(Math.round(this.tamaño / 6) + 1).fill(1, 2).map((x, i) => i);
      this.historialDeMostrar = this.hisotorialCortado[0];


    }, 2000);

  }

  ngOnInit() {
  }



  filtrar(nombre, id, alertaP, origen, fecha, estado) {
    if (nombre !== "" || id !== "" || alertaP !== "" || origen !== "Seleccione una opción" || fecha !== ""
      || estado !== "Seleccione una opción") {
      this.filtro = true;
    }
  }


  cambioPag(index: number, indicacion: string) {

    if (indicacion === "antes") {
      if (this.indice - 1 > 0) {
        this.indice -= index;
      }

    }

    if (indicacion === "despues") {
      if (this.indice - 1 < Math.round(this.tamaño / 6)) {
        this.indice += index;
      }

    }
    if (indicacion === "pagina") {
      this.indice = index + 1;

    }
    this.historialDeMostrar = this.hisotorialCortado[this.indice - 1];

  }

  cargarHistorial() {
    let _LogInService = this._LogInService;
    this._ConsejeroService.obtenerHistorialConsejero(this._LogInService.usuario.nombreUsuario).subscribe(res => {
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


  cargarAlertasRol() {
    let _LogInService = this._LogInService;
    this._ConsejeroService.obtenerAlertasConsejero().subscribe(res => {
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

}
