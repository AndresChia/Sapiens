import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../../../services/log-in.service';
import { DirectorService } from '../../../../services/serviciosRest/director.service';
import { alertasIA, estudianteIA } from 'src/app/interface/interfaces';
import { estudiante } from '../../../../interface/interfaces';

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

  alertasInArt: alertasIA[] = [{
    nombreAlerta: "repetir",
    criticidad: "Alta",
    Estudiante: [{
      nombreEstudiante: "juan",
      apellido: "paez",
      Calif_Global: 3.4,
      edad: 16,
      genero: "M",
      id: "1",
      promedio_ponderado: 3.4,
      Puntaje_Lectura_Critica: 3.2,
      Puntaje_Matematica: 3.3,
    }, {
      nombreEstudiante: "laura",
      apellido: "tino",
      Calif_Global: 3.1,
      edad: 18,
      genero: "F",
      id: "1",
      promedio_ponderado: 3.6,
      Puntaje_Lectura_Critica: 3.0,
      Puntaje_Matematica: 1.0,
    }],
  }, {
    criticidad: "Media",
    nombreAlerta: "repetir2",
    Estudiante: [{
      nombreEstudiante: "albet",
      apellido: "sanch",
      Calif_Global: 3.4,
      edad: 27,
      genero: "M",
      id: "1",
      promedio_ponderado: 3.4,
      Puntaje_Lectura_Critica: 3.2,
      Puntaje_Matematica: 3.3,
    }, {
      nombreEstudiante: "clau",
      apellido: "somers",
      Calif_Global: 3.1,
      edad: 23,
      genero: "M",
      id: "1",
      promedio_ponderado: 3.6,
      Puntaje_Lectura_Critica: 3.0,
      Puntaje_Matematica: 1.0,
    }],


  }];

  cargar: boolean[] = [];

  graficas: graficas[] = [];

  op: option = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
  }

  dat: data[] = [{
    data: [],
    label: ""
  }
  ];

  actualGraph: graficas = {
    barChartType: 'bar',
    barChartLegend: true,
    barChartLabels: [],
    barChartOptions: this.op,
    barChartData: this.dat,
  };

  constructor(public _LogInService: LogInService, public _DirectorService: DirectorService) {

    // this.obtenerIA();
    this.eliminar();


  }
  ngOnInit() {
  }

  eliminar() {
    for (let index = 0; index < this.alertasInArt.length; index++) {
      this.graficas.push(this.actualGraph);
      this.cargar[index] = false;
    }

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
    this._DirectorService.ia("ingenieria industrial", this._LogInService.usuario.nombreUsuario).subscribe(res => {
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
  guardarAlerta(alertas_ia: Array<any>, estudianteI: estudianteIA) {

    alertas_ia.forEach(element1 => {
      let banderaAlerta = false;

      let alertaAux: alertasIA = {
        criticidad: element1.criticidad,
        Estudiante: [],
        nombreAlerta: element1.nombre,
      }
      alertaAux.Estudiante.push(estudianteI);



      this.alertasInArt.forEach(element2 => {
        if (element2.nombreAlerta === element1) {
          banderaAlerta = true;
          element2.Estudiante.push(estudianteI);
        }

      });




      if (banderaAlerta === false) {
        this.alertasInArt.push(alertaAux);
      }


    })


  }



  edad(index: number) {
    this.cargar[index] = true;
    let Graph: graficas = this.actualGraph;
    this.graficas[index] = Graph;

    Graph.barChartLabels = ["< 18", "19 - 21", "22 - 24", " > 25 "]
    let menora18 = 0;
    let de19a21 = 0;
    let de22a24 = 0;
    let mayora25 = 0;
    this.alertasInArt[index].Estudiante.forEach(element2 => {
      if (element2.edad < 18) {
        menora18++;
      }
      if (element2.edad > 19 && element2.edad < 21) {
        de19a21++;
      }
      if (element2.edad > 22 && element2.edad < 24) {
        de22a24++;
      }
      if (element2.edad > 25) {
        mayora25++;
      }
    });





    let dataBarchart = {
      data: [menora18],
      label: "> 18",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [de19a21],
      label: "19 - 21",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [de22a24],
      label: "22 - 24",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [mayora25],
      label: "< 25 ",
    }

    Graph.barChartData.push(dataBarchart);


    this.graficas[index] = Graph;

  }

  genero(index: number) {
    this.cargar[index] = true;

    this.actualGraph.barChartData = [];


    this.actualGraph.barChartLabels = ["M", "F"]
    let m = 0;
    let f = 0;
    this.alertasInArt[index].Estudiante.forEach(element2 => {

      if (element2.genero === "M") {
        m++;
      }

      if (element2.genero === "F") {
        f++;
      }

    });



    let dataBarchart = {
      data: [m, 0],
      label: "M",
    }

    this.actualGraph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, f],
      label: "F",
    }

    this.actualGraph.barChartData.push(dataBarchart);



  }

  promedio(index: number) {
    this.actualGraph.barChartLabels = ["< 2", "2.1 - 3", "3.1 - 4", "4.1 - 5 "]
    let menora2 = 0;
    let de21a3 = 0;
    let de31a4 = 0;
    let de41a5 = 0;
    this.alertasInArt.forEach(element => {
      element.Estudiante.forEach(element2 => {
        if (element2.edad) {

        }
      });

    });
  }


}



interface graficas {
  barChartLabels: string[];
  barChartType: string;
  barChartLegend: boolean;
  barChartOptions: option;
  barChartData: data[];

}


interface option {
  scaleShowVerticalLines: boolean;
  responsive: boolean;
  maintainAspectRatio: boolean;
}

interface data {
  data: number[];
  label: string;
}
