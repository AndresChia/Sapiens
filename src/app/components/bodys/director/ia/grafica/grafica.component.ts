import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  //edad
  public EdadbarChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public EdadbarChartLabels: string[] = [];
  public EdadbarChartType = 'bar';
  public EdadbarChartLegend = true;
  public EdadbarChartData: any[] = [];

  //genero
  public GenerobarChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public GenerobarChartLabels: string[] = [];
  public GenerobarChartType = 'bar';
  public GenerobarChartLegend = true;
  public GenerobarChartData: any[] = [];

  //Promedio acumulado


  public PromacumbarChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public PromacumbarChartLabels: string[] = [];
  public PromacumbarChartType = 'bar';
  public PromacumbarChartLegend = true;
  public PromacumbarChartData: any[] = [];

  //lectura


  public lecturabarChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public lecturabarChartLabels: string[] = [];
  public lecturabarChartType = 'bar';
  public lecturabarChartLegend = true;
  public lecturabarChartData: any[] = [];


  //matematica


  public matematicabarChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public matematicabarChartLabels: string[] = [];
  public matematicabarChartType = 'bar';
  public matematicabarChartLegend = true;
  public matematicabarChartData: any[] = [];


  //global


  public globalbarChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public globalbarChartLabels: string[] = [];
  public globalbarChartType = 'bar';
  public globalbarChartLegend = true;
  public globalbarChartData: any[] = [];

  titulo = "";
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  constructor() {

    let edad = JSON.parse(localStorage.getItem("graficaEdad"));
    this.EdadbarChartData = edad.barChartData;
    this.EdadbarChartLabels = edad.barChartLabels;
    this.titulo = edad.titulo;
    let genero = JSON.parse(localStorage.getItem("graficaGenero"));
    this.GenerobarChartData = genero.barChartData;
    this.GenerobarChartLabels = genero.barChartLabels;
    let promedioAcum = JSON.parse(localStorage.getItem("graficaPromedio"));
    this.PromacumbarChartData = promedioAcum.barChartData;
    this.PromacumbarChartLabels = promedioAcum.barChartLabels;
    let lectura = JSON.parse(localStorage.getItem("graficaPuntajeLectura"));
    this.lecturabarChartData = lectura.barChartData;
    this.lecturabarChartLabels = lectura.barChartLabels;
    let matematica = JSON.parse(localStorage.getItem("graficaPuntajeMatema"));
    this.matematicabarChartData = matematica.barChartData;
    this.matematicabarChartLabels = matematica.barChartLabels;
    let global = JSON.parse(localStorage.getItem("graficaCalifiGlobal"));
    this.globalbarChartData = global.barChartData;
    this.globalbarChartLabels = global.barChartLabels;
  }

  ngOnInit() {
  }

}
