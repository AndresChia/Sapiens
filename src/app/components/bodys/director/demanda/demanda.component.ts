import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { datoBusqueda, asignatura } from '../../../../interface/interfaces';
import { LocalStorageManager } from "../../../../services/LocalStorage-Manager.service";
import { DirectorService } from '../../../../services/serviciosRest/director.service';
import { LogInService } from 'src/app/services/log-in.service';
@Component({
    selector: 'app-demanda',
    templateUrl: './demanda.component.html',
    styleUrls: ['./demanda.component.css']
})
export class DemandaComponent implements OnInit {
    alertaPopUp = false;

    forma: FormGroup;
    mensaje = {
        cuerpo: "",
        titulo: ""
    }
    consultarBool = true;
    actual: datoBusqueda = {
        nombreAsignatura: "",
        parametro: "aprobo",
        menor: 0,
        mayor: 0,
        id: "",
        periodo_academico: "",
        anno_academico: ""
    }
    anoAcademico = "2018";
    periodoAcademico = "3";
    asignaturas: asignatura[] = [];

    busqueda: datoBusqueda[] = [];


    activarModal = false;



    constructor(private _ConsultardemandaService: LocalStorageManager, public _DirectorService: DirectorService, public _LogInService: LogInService) {
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

        this.actual.nombreAsignatura = "";
        this.actual.id = "";
        this.actual.mayor = 0;
        this.actual.menor = 0;
        this.actual.parametro = "";
        this.activarModal = true;
        this.actual.anno_academico = this.anoAcademico;
        this.actual.periodo_academico = this.periodoAcademico;
    }


    agregarAsignatura() {
        this.asignaturas.forEach(element => {

            if (element.nombre === this.actual.nombreAsignatura) {
                this.actual.id = element.id;
            }
        });

        const a = JSON.stringify(this.actual);
        this.busqueda.push(JSON.parse(a));
        this.consultarBool = false;
    }

    //FIXME: falta crear la consulta y mostrarla en otra tabla
    crearConsulta() {
        this._ConsultardemandaService.cargar(JSON.stringify(this.busqueda));
    }

    eliminarElemento(i: number) {
        this.busqueda.splice(i, 1);
        if (this.busqueda.length === 0) {
            this.consultarBool = true;
        }
    }


    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {

        let _LogInService: LogInService;
        if (this.actual.nombreAsignatura.length > 0) {
            this._DirectorService.obtenerAsignaturas(this._LogInService.usuario.nombreUsuario, this.actual.nombreAsignatura).subscribe(res => {
                this.asignaturas = [];
                res.forEach(element => {
                    let asignaturaActual: asignatura = {
                        id: element._id,
                        nombre: element.nombre,
                    }
                    this.asignaturas.push(asignaturaActual);
                });
            }, error => {
                this.alertaPopUp = true;
                this.mensaje.cuerpo = "En este momento tenemos problemas con el servicio. sera notificado cuando funcione. Por favor intente de nuevo.";
                this.mensaje.titulo = "ERROR DEL SERVIDOR :";
                setTimeout(function () { _LogInService.cerrarSesion() }, 5000);
            });

        }
    }
}



