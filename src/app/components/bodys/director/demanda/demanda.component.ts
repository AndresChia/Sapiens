import { Component, OnInit, ViewChild } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { datoBusqueda } from "../../../../interface/interfaces";

@Component({
  selector: 'app-demanda',
  templateUrl: './demanda.component.html',
  styleUrls: ['./demanda.component.css']
})
export class DemandaComponent implements OnInit {



  actual: datoBusqueda = {
    nombreAsignatura: "",
    parametro: "aprobo",
    menor: 0,
    mayor: 0,
  }



  busqueda: datoBusqueda[] = [{
    nombreAsignatura: "calculo",
    parametro: "personalizado",
    menor: 5,
    mayor: 6
  }]


  activarModal = false;



  constructor() {


  }

  ngOnInit() {




  }





  agregarModal() {

    this.activarModal = true;

  }


  agregarAsignatura() {
    const a = JSON.stringify(this.actual);
    this.busqueda.push(JSON.parse(a));
  }

  //FIXME: falta crear la consulta y mostrarla en otra tabla
  crearConsulta() {
    console.log("falta crear donde ver la consulta y cargarla");

  }

}
