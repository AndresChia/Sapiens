import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ia',
  templateUrl: './ia.component.html',
  styleUrls: ['./ia.component.css']
})
export class IaComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
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


  constructor() { }

  ngOnInit() {
  }



  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


}
