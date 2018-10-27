import { Component, OnInit } from '@angular/core';
import { DemandaComponent } from "../demanda.component";
import { LocalStorageManager } from "../../../../../services/LocalStorage-Manager.service";
import { datoBusqueda, estudiante } from '../../../../../interface/interfaces';
import { LogInService } from '../../../../../services/log-in.service';

@Component({
    selector: 'app-consulta-demanda',
    templateUrl: './consulta-demanda.component.html',
    styleUrls: ['./consulta-demanda.component.css']
})
export class ConsultaDemandaComponent implements OnInit {

    busqueda: datoBusqueda[] = [];
    modal = false;
    estudiantes: estudiante[] = [
        {
            nombre: "carlos",
            apellido: "salfa",
            carrera: "Ingenieria de sistemas",
            semestre: 5,
            check: false,
            id: "1",
            facultad: "ingenieria"
        }

    ]
    constructor(private _ConsultardemandaService: LocalStorageManager, public _LogInService: LogInService) {
        let a: string = _ConsultardemandaService.getData("0");
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
        let constan = 0;
        this.estudiantes.forEach(element => {
            if (element.check) {
                constan++;
            }

        });

        if (constan === 0) {
            this.modal = false;
        } else {
            this.modal = true;
        }

    }

    atender() {

    }

}
