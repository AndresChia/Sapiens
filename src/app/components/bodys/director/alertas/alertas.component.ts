import { Component, OnInit } from '@angular/core';
import { estudiante, alerta } from '../../../../interface/interfaces';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-alertas',
    templateUrl: './alertas.component.html',
    styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {
    checkFecha = false;
    modal = true;
    estudianteActual: estudiante[];
    seleccionado = false;
    indexSelecionado: number;
    alertas: alerta[] = [
        {
            estudiante: [
                {
                    nombre: "carlos",
                    apellido: "salfa",
                    carrera: "Ingenieria de sistemas",
                    semestre: 5,
                },
                {
                    nombre: "david",
                    apellido: "somers",
                    carrera: "Ingenieria de sistemas",
                    semestre: 1,
                }

            ],
            nombreAlerta: "Problema con profesor",
            remitente: "string",
            criticidad: "Alta",
            incidencias: 1
        }

    ]


    constructor(public snackBar: MatSnackBar) { }

    ngOnInit() {
    }


    seleccionar(i: number) {

        this.estudianteActual = this.alertas[i].estudiante;
        this.seleccionado = true;


    }


    seleccionarCheck(i: number) {
        this.estudianteActual[i].check = !this.estudianteActual[i].check;
        this.indexSelecionado = i;
    }


    ActivarModalEscalar() {
        let cont = 0;
        this.estudianteActual.forEach(element => {

            if (element.check) {
                cont++;
            }

        });

        if (cont === 0) {
            this.modal = false;
        } else {
            this.modal = true;
        }


    }
    ActivarModalAtender() {
        let cont = 0;
        this.estudianteActual.forEach(element => {

            if (element.check) {
                cont++;
            }

        });

        if (cont === 0) {
            this.modal = false;
        } else {
            this.modal = true;
        }

    }


    check() {
        this.checkFecha = (!this.checkFecha);

    }


    atender() {


        this.snackBar.open("Atencion realizada", "Cerrar", {
            duration: 2000,
        });

    }

    remitir(opc: number) {

        this.snackBar.open("Remición creada", "Cerrar", {
            duration: 2000,
        });

    }

}
