import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../../../services/log-in.service';
import { DirectorService } from '../../../../services/serviciosRest/director.service';
import { alertasIA, estudianteIA } from 'src/app/interface/interfaces';

@Component({
  selector: 'app-ia',
  templateUrl: './ia.component.html',
  styleUrls: ['./ia.component.css']
})
export class IaComponent implements OnInit {

  opcion = false;
  mensaje = {
    cuerpo: "",
    titulo: ""
  }
  alertaPopUp = false;

  alertasInArt: alertasIA[] = [];



  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false

  };
  public barChartLabels: string[] = ['Alerta 1', 'Alerta ', 'Alerta 3', 'Alerta 4', 'Alerta 5', 'Alerta 6', 'Alerta 7'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {
      data: [65, 59, 80, 81, 56, 55, 40, 30],
      label: 'Incidencias'
    }
  ];


  constructor(public _LogInService: LogInService, public _DirectorService: DirectorService) {

    this.obtenerIA();


  }
  ngOnInit() {
  }



  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }



  obtenerIA() {

    let _LogInService = this._LogInService;
    this._DirectorService.ia("ingenieria industrial").subscribe(res => {
      res.forEach(element => {

        let estudianteActual: estudianteIA = {
          apellido: element.apellido1,
          edad: element.edad,
          genero: element.Sexo,
          id: element.id,
          nombreEstudiante: element.nombres,
          promedio_ponderado: element.promedio_ponderado,
          Puntaje_Lectura_Critica: element.Puntaje_Lectura_Critica,
          Puntaje_Matematica: element.Puntaje_Matematica,
          Calif_Global: element.Calif_Global,
        };
        this.guardarAlerta(element.alertas_ia, estudianteActual);


      });


    }, error => {
      this.alertaPopUp = true;
      this.mensaje.cuerpo = "En este momento tenemos problemas con el servicio. sera notificado cuando funcione. Por favor intente de nuevo.";
      this.mensaje.titulo = "ERROR DEL SERVIDOR :";
      setTimeout(function () { _LogInService.cerrarSesion() }, 5000);
    });



  }
  guardarAlerta(alertas_ia: Array<any>, estudiante: estudianteIA) {

    alertas_ia.forEach(element1 => {
      let banderaAlerta = false;

      let alertaAux: alertasIA = {
        criticidad: element1.criticidad,
        Estudiante: [],
        nombreAlerta: element1.nombre,
      }
      alertaAux.Estudiante.push(estudiante);



      this.alertasInArt.forEach(element2 => {
        if (element2.nombreAlerta === element1) {
          banderaAlerta = true;
          element2.Estudiante.push(estudiante);
        }

      });




      if (banderaAlerta === false) {
        this.alertasInArt.push(alertaAux);
      }


    })


  }




}
