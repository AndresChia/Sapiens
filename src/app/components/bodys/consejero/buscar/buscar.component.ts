import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../../app.component";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { ConsejeroComponent } from "../consejero.component";
import { LogInService } from '../../../../services/log-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  url: string;


  busquedaBool = false;


  forma: FormGroup;

  busqueda: any = {

    nombre: "",
    correo: ""

  };

  estudiantes: estudiante[] = [
    {
      id: "1",
      nombre: "carlos",
      apellido: "salda",
      carrera: "sistemas",
      semestre: 1
    }
  ];

  constructor(private _LogInService: LogInService, private consejeroComponent: ConsejeroComponent, private router: Router) {
    _LogInService.load = false;

    this.forma = new FormGroup({
      'nombre': new FormControl(''),
      'correo': new FormControl('')
    });
    this.forma.setValue(this.busqueda);

    this.url = router.url;

  }

  ngOnInit() { }

  seleccionar(actual: number) {
    //this.consejeroComponent.alertar();
    this.router.navigate([this.router.url, this.estudiantes[actual].id]);
  }

  //FIXME:
  buscar() {

    console.log("Falta buscar las alertas y ponerlas en la tabla");

    this.busquedaBool = true;


  }


}

interface estudiante {
  id: string;
  nombre: string;
  apellido: string;
  carrera: string;
  semestre: number;
}
