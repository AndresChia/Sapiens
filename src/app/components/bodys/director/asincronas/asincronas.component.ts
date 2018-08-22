import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asincronas',
  templateUrl: './asincronas.component.html',
  styleUrls: ['./asincronas.component.css']
})
export class AsincronasComponent implements OnInit {

  alertas: string[] = ["1", "2", "1"];

  constructor() {}

  ngOnInit() {}

  seleccionar(actual) {
    console.log(actual);
  }
}
