import { Component, OnInit } from '@angular/core';
import { DemandaComponent } from "../demanda.component";
import { LocalStorageManager } from "../../../../../services/LocalStorage-Manager.service";
import { datoBusqueda, estudiante } from '../../../../../interface/interfaces';
import { LogInService } from '../../../../../services/log-in.service';
import { DirectorService } from 'src/app/services/serviciosRest/director.service';

@Component({
    selector: 'app-consulta-demanda',
    templateUrl: './consulta-demanda.component.html',
    styleUrls: ['./consulta-demanda.component.css']
})
export class ConsultaDemandaComponent implements OnInit {
    mensaje = {
        cuerpo: "",
        titulo: ""
    }
    alertaPopUp = false;

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
    constructor(private _ConsultardemandaService: LocalStorageManager, public _DirectorService: DirectorService, public _LogInService: LogInService) {
        let a: string = _ConsultardemandaService.getData("0");
        this.busqueda = JSON.parse(a);
        this.cargarDemandas();


    }

    ngOnInit() {
    }


    cargarDemandas() {

        let _LogInService = this._LogInService;

        let filtros_clasePost = [];
        this.busqueda.forEach(element => {
            let filtros_clase = {
                nombre: element.nombreAsignatura,
                estado: element.parametro,
                min: element.menor,
                max: element.mayor,
            };

            filtros_clasePost.push(filtros_clase);

        })

        this._DirectorService.consultaDemanda(this.busqueda[0].anno_academico, this.busqueda[0].periodo_academico, filtros_clasePost).subscribe(res => {

        }, error => {
            this.alertaPopUp = true;
            this.mensaje.cuerpo = "En este momento tenemos problemas con el servicio. sera notificado cuando funcione. Por favor intente de nuevo.";
            this.mensaje.titulo = "ERROR DEL SERVIDOR :";
            setTimeout(function () { _LogInService.cerrarSesion() }, 5000);
        });


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
