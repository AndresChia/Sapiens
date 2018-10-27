import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})

export class HistorialCComponent implements OnInit {
  filtro = false;
  numeroDePags: number[];
  pagActual = 1;

  constructor() {
    this.numeroDePags = Array(2).fill(1, 2).map((x, i) => i);
  }

  ngOnInit() {
  }

  cambioPag(index: number) {
  }


  filtrar(nombre, id, alerta, origen, fecha, estado) {
    if (nombre !== "" || id !== "" || alerta !== "" || origen !== "Seleccione una opción" || fecha !== ""
      || estado !== "Seleccione una opción") {
      this.filtro = true;
    }
  }

}
