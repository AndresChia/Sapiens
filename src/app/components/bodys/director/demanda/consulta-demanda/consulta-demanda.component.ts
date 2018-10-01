import { Component, OnInit } from '@angular/core';
import { DemandaComponent } from "../demanda.component";
import { ConsultardemandaService } from "../../../../../services/consultardemanda.service";
import { datoBusqueda, estudiante } from '../../../../../interface/interfaces';
import { LogInService } from '../../../../../services/log-in.service';

@Component({
    selector: 'app-consulta-demanda',
    templateUrl: './consulta-demanda.component.html',
    styleUrls: ['./consulta-demanda.component.css']
})
export class ConsultaDemandaComponent implements OnInit {

    busqueda: datoBusqueda[] = [];

    estudiantes: estudiante[] = [
        {
            nombre: "carlos",
            apellido: "salfa",
            carrera: "Ingenieria de sistemas",
            semestre: 5,
            check: false,
        }

    ]
    constructor(private _ConsultardemandaService: ConsultardemandaService, private _LogInService: LogInService) {
        let a = localStorage.getItem("0");
        this.busqueda = JSON.parse(a);

    }

    ngOnInit() {
    }



    cerrar() {
        window.close();
    }



    seleccionarCheck(i: number) {
        this.estudiantes[i].check = !this.estudiantes[i].check;
    }


    citar() {


    }

    atender() {

    }

}
