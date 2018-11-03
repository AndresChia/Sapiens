import { Component, OnInit } from '@angular/core';
import { alerta, anotacion, datosAcademicos, alertaSemestre, datosDemograficos, estudiante } from '../../../../../interface/interfaces';
import { LocalStorageManager } from 'src/app/services/LocalStorage-Manager.service';
import { ConsejeroService } from '../../../../../services/serviciosRest/consejero.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  historialAlerta: alertaSemestre[][] = [];
  academicos: datosAcademicos[][] = [];

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

  alertaPopUp = false;

  mensaje = {
    cuerpo: "",
    titulo: ""
  }
  demograficoActual: datosDemograficos = {
    id: "",
    genero: "",
    nacimiento: "",
    estado_civil: "",
    pais: "",
    ciudad: "",
    grupo_etnico: "",
    descripcion_etnica: "",
    pricipal: "",
    tipo_discapacidad: "",
    descripcion_discapacidad: "",
  };

  academicosActual: datosAcademicos[] = [];
  alertasEstudiante: alertaSemestre[] = [];
  idEstudiante = "";
  estudiantes: estudiante[] = [];
  demograficos: datosDemograficos[] = [];


  constructor(public _LocalStorageManager: LocalStorageManager, public _ConsejeroService: ConsejeroService) {

    this.idEstudiante = _LocalStorageManager.getDataParametros("3");
    this.cargarInfo();
  }

  ngOnInit() {
  }

  seleccionar(index: number) {

  }

  cargarInfo() {

    this._ConsejeroService.obtenerEstudiantes(this.idEstudiante, undefined).subscribe(res => {
      this.estudiantes = [];
      res.forEach(element => {
        let estudianteActual: estudiante = {
          id: element.id,
          nombre: element.nombres,
          apellido: element.apellido1 + " " + element.apellido2,
          carrera: element.carrera,
          semestre: 1,
          facultad: element.facultad,
          identificacion: element.identificacion
        };
        let dtosDemograficos: datosDemograficos = {
          id: element.id,
          genero: element.Sexo,
          nacimiento: element.F_Nacimiento,
          estado_civil: element.Estado_Civil,
          pais: element.Pais,
          ciudad: element.Estado_Depto,
          grupo_etnico: element.Grupo_Etnico,
          descripcion_etnica: element.Descripcion,
          pricipal: element.Principal,
          tipo_discapacidad: element.Discapacidad,
          descripcion_discapacidad: element.Descripcion_discapacidad,
        }

        let compiladoAcademicos: datosAcademicos[] = [];
        element.info_semestres.forEach(element2 => {
          let datAcademicos: datosAcademicos = {
            creditosAprobados: element2.creditos_aprobados,
            creditosRetirados: element2.creditos_retirados,
            promedio: element2.promedio,
            semestre: element2.numero_semestre,
          }
          compiladoAcademicos.push(datAcademicos);
        });
        let compiladoAlertas: alertaSemestre[] = [];
        element.alertas.forEach(element3 => {
          let datAlerta: alertaSemestre = {
            alerta: element3.alerta.nombre,
            creador: "FALTA",
            fecha: (element3.fechaInicio as string).split("T")[0],
            semestre: "FALTA",
          }
          compiladoAlertas.push(datAlerta);
        });
        this.historialAlerta.push(compiladoAlertas);
        this.academicos.push(compiladoAcademicos);
        this.demograficos.push(dtosDemograficos);
        this.estudiantes.push(estudianteActual);
      });
      this.estudiantes = this.estudiantes.slice(0, 6);


      this.demograficoActual = this.demograficos[0];
      this.academicosActual = this.academicos[0];
      this.alertasEstudiante = this.historialAlerta[0];

    }, error => {
      this.alertaPopUp = true;
      this.mensaje.cuerpo = "En este momento tenemos problemas con el servicio. sera notificado cuando funcione. Por favor intente de nuevo.";
      this.mensaje.titulo = "ERROR DEL SERVIDOR :";
      setTimeout(function () { this._LogInService.cerrarSesion() }, 5000);
    });
  }



}
