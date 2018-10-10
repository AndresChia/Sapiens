import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialCComponent implements OnInit {

  numeroDePags: number[];
  pagActual = 1;
  constructor() {

    this.numeroDePags = Array(2).fill(1, 2).map((x, i) => i);
  }

  ngOnInit() {
  }

  cambioPag(index: number) {


  }

}
