import { Component, OnInit } from '@angular/core';
import { estudiante, alerta } from '../../../../interface/interfaces';
import { MatSnackBar } from '@angular/material';
import { LogInService } from 'src/app/services/log-in.service';
import { DirectorService } from '../../../../services/serviciosRest/director.service';

@Component({
    selector: 'app-alertas',
    templateUrl: './alertas.component.html',
    styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {
    mensaje = {
        cuerpo: "",
        titulo: ""
    }
    alertaPopUp = false;
    checkFecha = false;
    modal = true;
    estudianteActual: estudiante[];
    seleccionado = false;
    indexSelecionado: number;
    alertas: alerta[] = []


    constructor(public snackBar: MatSnackBar, public _LogInService: LogInService, public _DirectorService: DirectorService) { }

    ngOnInit() {
        this.mostrarAlertasAgrupadas();
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


    mostrarAlertasAgrupadas() {
        this.alertas = []
        let _LogInService = this._LogInService;
        this._DirectorService.obtenerAlertasAgrupadas(this._LogInService.usuario.nombreUsuario).subscribe(res => {
            res.forEach(element => {
                let alertaAgregar: alerta = {
                    nombreAlerta: element.nombre,
                    descripcion: element.descripcion,
                    criticidad: element.criticidad,
                    temporalidad: element.temporalidad,
                    id: element.id,
                    incidencias: element.incidencias,
                    tipo: element.temporalidad,
                }
                this.alertas.push(alertaAgregar);

                element.intervenciones.forEach(element2 => {

                });
            });
        }, error => {
            this.alertaPopUp = true;
            this.mensaje.cuerpo = "En este momento tenemos problemas con el servicio. sera notificado cuando funcione. Por favor intente de nuevo.";
            this.mensaje.titulo = "ERROR DEL SERVIDOR :";
            setTimeout(function () { _LogInService.cerrarSesion() }, 5000);
        });
    }



}
