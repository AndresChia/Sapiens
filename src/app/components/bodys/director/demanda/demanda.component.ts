import { Component, OnInit, ViewChild } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { datoBusqueda } from "../../../../interface/interfaces";
import { ConsultardemandaService } from "../../../../services/consultardemanda.service";
@Component({
    selector: 'app-demanda',
    templateUrl: './demanda.component.html',
    styleUrls: ['./demanda.component.css']
})
export class DemandaComponent implements OnInit {

    forma: FormGroup;

    consultarBool = true;
    actual: datoBusqueda = {
        nombreAsignatura: "",
        parametro: "aprobo",
        menor: 0,
        mayor: 0,
    }



    busqueda: datoBusqueda[] = [];


    activarModal = false;



    constructor(private _ConsultardemandaService: ConsultardemandaService) {
        this.forma = new FormGroup({
            anioAcademico: new FormControl(),
            periodoAcademico: new FormControl()
        });

        this.forma.setValue({
            anioAcademico: "2018",
            periodoAcademico: "3"
        });
    }

    ngOnInit() {




    }





    agregarModal() {


        this.activarModal = true;

    }


    agregarAsignatura() {
        const a = JSON.stringify(this.actual);
        this.busqueda.push(JSON.parse(a));
        this.consultarBool = false;
    }

    //FIXME: falta crear la consulta y mostrarla en otra tabla
    crearConsulta() {
        // console.log("falta crear donde ver la consulta y cargarla");

        this._ConsultardemandaService.cargar(JSON.stringify(this.busqueda));


    }

    eliminarElemento(i: number) {
        this.busqueda.splice(i, 1);
        if (this.busqueda.length === 0) {
            this.consultarBool = true;
        }
    }


}
