import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../../app.component";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { ConsejeroComponent } from "../consejero.component";
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {


  forma: FormGroup;

  busqueda: any = {

    nombre: "",
    correo: ""

  };

  estudiantes: estudiante[] = [
    {
      nombre: "carlos",
      apellido: "salda",
      carrera: "sistemas",
      semestre: 1
    },
    {
      nombre: "pedro",
      apellido: "salda",
      carrera: "sistemas",
      semestre: 2
    },
    {
      nombre: "juan",
      apellido: "salda",
      carrera: "sistemas",
      semestre: 1
    }
  ];

  constructor(private appComponent: AppComponent, private consejeroComponent: ConsejeroComponent) {
    appComponent.load = false;

    this.forma = new FormGroup({
      'nombre': new FormControl(''),
      'correo': new FormControl('')
    });
    this.forma.setValue(this.busqueda);


  }

  ngOnInit() { }

  seleccionar(actual: number) {
    console.log(this.estudiantes[actual]);
    this.consejeroComponent.alertar();

  }


  buscar() {

    console.log(this.forma.value.nombre);
    console.log(this.forma.value.correo);


  }


}

interface estudiante {
  nombre: string;
  apellido: string;
  carrera: string;
  semestre: number;
}
