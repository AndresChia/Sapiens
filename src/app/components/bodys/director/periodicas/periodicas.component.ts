import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-periodicas',
  templateUrl: './periodicas.component.html',
  styleUrls: ['./periodicas.component.css']
})
export class PeriodicasComponent implements OnInit {
  periodos: string[] = ["1", "2", "1"];

  constructor() { }

  ngOnInit() {
  }


  seleccionar(i) {


  }
}
