import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../../app.component";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { ConsejeroComponent } from "../consejero.component";
import { LogInService } from '../../../../services/log-in.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

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

  constructor(private _LogInService: LogInService, private consejeroComponent: ConsejeroComponent) {
    _LogInService.load = false;

    this.forma = new FormGroup({
      'nombre': new FormControl(''),
      'correo': new FormControl('')
    });
    this.forma.setValue(this.busqueda);


  }

  ngOnInit() { }

  seleccionar(actual: number) {
    //this.consejeroComponent.alertar();

  }

  //FIXME:
  buscar() {

    console.log("Falta buscar las alertas y ponerlas en la tabla");

  }


}

interface estudiante {
  nombre: string;
  apellido: string;
  carrera: string;
  semestre: number;
}
