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

  alertasInArt: alertasIA[] = [];
  actualGraph: any;



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

  calcularGrafica(index: number) {

    localStorage.setItem("graficaEdad", JSON.stringify(this.edad(index)));
    localStorage.setItem("graficaGenero", JSON.stringify(this.genero(index)));
    localStorage.setItem("graficaPromedio", JSON.stringify(this.promedio(index)));
    localStorage.setItem("graficaPuntajeLectura", JSON.stringify(this.lenturaCritica(index)));
    localStorage.setItem("graficaPuntajeMatema", JSON.stringify(this.matematica(index)));
    localStorage.setItem("graficaCalifiGlobal", JSON.stringify(this.global(index)));



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

    let Graph: graficas = {
      titulo: this.alertasInArt[index].nombreAlerta,
      barChartData: [],
      barChartLabels: [],
    };

    Graph.barChartLabels = ["< 18", "19 - 21", "22 - 24", " > 25 "];

    let menora18 = 0;
    let de19a21 = 0;
    let de22a24 = 0;
    let mayora25 = 0;
    this.alertasInArt[index].Estudiante.forEach(element2 => {
      if (element2.edad <= 18) {
        menora18++;
      }
      if (element2.edad >= 19 && element2.edad <= 21) {
        de19a21++;
      }
      if (element2.edad >= 22 && element2.edad <= 24) {
        de22a24++;
      }
      if (element2.edad >= 25) {
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

    return Graph;

  }

  genero(index: number) {

    let Graph: graficas = {
      titulo: this.alertasInArt[index].nombreAlerta,
      barChartData: [],
      barChartLabels: [],
    };

    Graph.barChartLabels = ["M", "F"];
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

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, f],
      label: "F",
    }

    Graph.barChartData.push(dataBarchart);

    return Graph;
  }

  promedio(index: number) {
    let Graph: graficas = {
      titulo: this.alertasInArt[index].nombreAlerta,
      barChartData: [],
      barChartLabels: [],
    };

    Graph.barChartLabels = ["0 - 1", "1.1 - 2", "2.1 - 3", "3.1 - 4", "4.1 - 5"];
    let de0a1 = 0;
    let de1a2 = 0;
    let de2a3 = 0;
    let de3a4 = 0;
    let de4a5 = 0;

    this.alertasInArt[index].Estudiante.forEach(element2 => {

      if (element2.promedio_ponderado >= 0 && element2.promedio_ponderado <= 1) {
        de0a1++;
      }

      if (element2.promedio_ponderado >= 1.1 && element2.promedio_ponderado <= 2) {
        de1a2++;
      }

      if (element2.promedio_ponderado >= 2.1 && element2.promedio_ponderado <= 3) {
        de2a3++;
      }

      if (element2.promedio_ponderado >= 3.1 && element2.promedio_ponderado <= 4) {
        de3a4++;
      }

      if (element2.promedio_ponderado >= 4.1 && element2.promedio_ponderado <= 5) {
        de4a5++;
      }

    });

    let dataBarchart = {
      data: [de0a1, 0, 0, 0, 0],
      label: "de 0 a 1",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, de1a2, 0, 0, 0],
      label: "de 1.1 a 2",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, 0, de2a3, 0, 0],
      label: "de 2.1 a 3",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, 0, 0, de3a4, 0],
      label: "de 3.1 a 4",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, 0, 0, 0, de4a5],
      label: "de 4.1 a 5",
    }

    Graph.barChartData.push(dataBarchart);


    return Graph;

  }


  lenturaCritica(index: number) {
    let Graph: graficas = {
      titulo: this.alertasInArt[index].nombreAlerta,
      barChartData: [],
      barChartLabels: [],
    };

    Graph.barChartLabels = ["0 - 1", "1.1 - 2", "2.1 - 3", "3.1 - 4", "4.1 - 5"];
    let de0a1 = 0;
    let de1a2 = 0;
    let de2a3 = 0;
    let de3a4 = 0;
    let de4a5 = 0;

    this.alertasInArt[index].Estudiante.forEach(element2 => {

      if (element2.Puntaje_Lectura_Critica >= 0 && element2.Puntaje_Lectura_Critica <= 1) {
        de0a1++;
      }

      if (element2.Puntaje_Lectura_Critica >= 1.1 && element2.Puntaje_Lectura_Critica <= 2) {
        de1a2++;
      }

      if (element2.Puntaje_Lectura_Critica >= 2.1 && element2.Puntaje_Lectura_Critica <= 3) {
        de2a3++;
      }

      if (element2.Puntaje_Lectura_Critica >= 3.1 && element2.Puntaje_Lectura_Critica <= 4) {
        de3a4++;
      }

      if (element2.Puntaje_Lectura_Critica >= 4.1 && element2.Puntaje_Lectura_Critica <= 5) {
        de4a5++;
      }

    });

    let dataBarchart = {
      data: [de0a1, 0, 0, 0, 0],
      label: "de 0 a 1",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, de1a2, 0, 0, 0],
      label: "de 1.1 a 2",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, 0, de2a3, 0, 0],
      label: "de 2.1 a 3",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, 0, 0, de3a4, 0],
      label: "de 3.1 a 4",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, 0, 0, 0, de4a5],
      label: "de 4.1 a 5",
    }

    Graph.barChartData.push(dataBarchart);


    return Graph;
  }

  matematica(index: number) {
    let Graph: graficas = {
      titulo: this.alertasInArt[index].nombreAlerta,
      barChartData: [],
      barChartLabels: [],
    };

    Graph.barChartLabels = ["0 - 1", "1.1 - 2", "2.1 - 3", "3.1 - 4", "4.1 - 5"];
    let de0a1 = 0;
    let de1a2 = 0;
    let de2a3 = 0;
    let de3a4 = 0;
    let de4a5 = 0;

    this.alertasInArt[index].Estudiante.forEach(element2 => {

      if (element2.Puntaje_Matematica >= 0 && element2.Puntaje_Matematica <= 1) {
        de0a1++;
      }

      if (element2.Puntaje_Matematica >= 1.1 && element2.Puntaje_Matematica <= 2) {
        de1a2++;
      }

      if (element2.Puntaje_Matematica >= 2.1 && element2.Puntaje_Matematica <= 3) {
        de2a3++;
      }

      if (element2.Puntaje_Matematica >= 3.1 && element2.Puntaje_Matematica <= 4) {
        de3a4++;
      }

      if (element2.Puntaje_Matematica >= 4.1 && element2.Puntaje_Matematica <= 5) {
        de4a5++;
      }

    });

    let dataBarchart = {
      data: [de0a1, 0, 0, 0, 0],
      label: "de 0 a 1",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, de1a2, 0, 0, 0],
      label: "de 1.1 a 2",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, 0, de2a3, 0, 0],
      label: "de 2.1 a 3",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, 0, 0, de3a4, 0],
      label: "de 3.1 a 4",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, 0, 0, 0, de4a5],
      label: "de 4.1 a 5",
    }

    Graph.barChartData.push(dataBarchart);


    return Graph;

  }

  global(index: number) {
    let Graph: graficas = {
      titulo: this.alertasInArt[index].nombreAlerta,
      barChartData: [],
      barChartLabels: [],
    };

    Graph.barChartLabels = ["0 - 1", "1.1 - 2", "2.1 - 3", "3.1 - 4", "4.1 - 5"];
    let de0a1 = 0;
    let de1a2 = 0;
    let de2a3 = 0;
    let de3a4 = 0;
    let de4a5 = 0;

    this.alertasInArt[index].Estudiante.forEach(element2 => {

      if (element2.Calif_Global >= 0 && element2.Calif_Global <= 1) {
        de0a1++;
      }

      if (element2.Calif_Global >= 1.1 && element2.Calif_Global <= 2) {
        de1a2++;
      }

      if (element2.Calif_Global >= 2.1 && element2.Calif_Global <= 3) {
        de2a3++;
      }

      if (element2.Calif_Global >= 3.1 && element2.Calif_Global <= 4) {
        de3a4++;
      }

      if (element2.Calif_Global >= 4.1 && element2.Calif_Global <= 5) {
        de4a5++;
      }

    });

    let dataBarchart = {
      data: [de0a1, 0, 0, 0, 0],
      label: "de 0 a 1",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, de1a2, 0, 0, 0],
      label: "de 1.1 a 2",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, 0, de2a3, 0, 0],
      label: "de 2.1 a 3",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, 0, 0, de3a4, 0],
      label: "de 3.1 a 4",
    }

    Graph.barChartData.push(dataBarchart);

    dataBarchart = {
      data: [0, 0, 0, 0, de4a5],
      label: "de 4.1 a 5",
    }

    Graph.barChartData.push(dataBarchart);


    return Graph;

  }

}


interface graficas {
  titulo: string;
  barChartLabels: string[];
  barChartData: data[];

}

interface data {
  data: number[];
  label: string;
}
