import { Component, OnInit } from '@angular/core';
import { estudiante, alerta } from '../../../../interface/interfaces';
import { MatSnackBar } from '@angular/material';
import { LogInService } from 'src/app/services/log-in.service';
import { DirectorService } from '../../../../services/serviciosRest/director.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
import { LocalStorageManager } from '../../../../services/LocalStorage-Manager.service';

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

    estudiantesAgrupados: any[] = [];
    estudiantesAgrupadosBien: any[] = [];
    alertaSeleccionada: alerta;
    estudiantes: estudiante[] = [];

    constructor(public snackBar: MatSnackBar, public _LogInService: LogInService, public _DirectorService: DirectorService, public router: Router, public _LocalStorageManager: LocalStorageManager) { }

    ngOnInit() {
        this.mostrarAlertasAgrupadas();
    }


    seleccionar(i: number) {


        this.estudianteActual = this.estudiantesAgrupadosBien[i];
        this.seleccionado = true;
        this.alertaSeleccionada = this.alertas[i];

    }


    seleccionarCheck(i: number) {


        this.estudianteActual[i].check = !this.estudianteActual[i].check;
        this.indexSelecionado = i;
        if (this.estudianteActual[i].check) {
            this.estudiantes.push(this.estudianteActual[i]);
            //agregar
        } else {
            //eliminar
            for (let index = 0; index < this.estudiantes.length; index++) {
                if (this.estudianteActual[i].id === this.estudiantes[index].id) {
                    this.estudiantes.splice(index, 1);
                }
            }
        }

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
            horizontalPosition: "center",
            panelClass: ['snackbar'],
            verticalPosition: "top"
        });

        let Idalerta = this.obtenerIDalerta(this.alertaSeleccionada.nombreAlerta);

        for (let index = 0; index < this.estudiantes.length; index++) {
            this._DirectorService.atender(
                Idalerta,
                this._LogInService.usuario.nombreUsuario,
                this.estudiantes[index].identificacion,
                this._LogInService.usuario.nombreUsuario,
                this._LogInService.usuario.nombreUsuario,
                this.estudiantes[index].intervencion
            ).subscribe(res => {
            });
        }


        this.mostrarAlertasAgrupadas();


    }

    remitir(opc: number) {

        this.snackBar.open("Remición creada", "Cerrar", {
            duration: 2000,
            horizontalPosition: "center",
            panelClass: ['snackbar'],
            verticalPosition: "top"
        });


        let _LogInService: LogInService;
        let Remitidoa = "";
        if (opc === 1) {
            Remitidoa = "caps";
        } else {
            Remitidoa = "aulas_aprendizaje";

        }

        let Idalerta = this.obtenerIDalerta(this.alertaSeleccionada.nombreAlerta);

        for (let index = 0; index < this.estudiantes.length; index++) {
            this._DirectorService.remitir(
                Idalerta,
                this.estudiantes[index].intervencion,
                this._LogInService.usuario.nombreUsuario,
                this.estudiantes[index].identificacion,
                Remitidoa).subscribe(res => {
                });
        }


        this.mostrarAlertasAgrupadas();

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

                this.estudiantesAgrupados = [];
                element.intervenciones.forEach(element2 => {
                    let estudiantesPush: estudiante = {

                        id: element2.estudiante.identificacion,
                        nombre: element2.estudiante.nombres,
                        apellido: element2.estudiante.apellido1 + " " + element2.estudiante.apellido2,
                        carrera: "Falta",
                        semestre: 1,
                        check: false,
                        facultad: "Ingenieria",
                        identificacion: element2.estudiante.identificacion,
                        intervencion: element2._id

                    }

                    this.estudiantesAgrupados.push(estudiantesPush);
                });

                this.estudiantesAgrupadosBien.push(this.estudiantesAgrupados);

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

    cargarDatosInformacionExtra(index: number) {

        let x = this.estudianteActual[index];
        this._LocalStorageManager.cargarParametro("3", x.id);
    }

    obtenerIDalerta(nombreAlerta: string): string {
        let idActual = "";
        this.alertas.forEach(element => {
            if (nombreAlerta === element.nombreAlerta) {
                idActual = element.id;
            }
        })

        return idActual;
    }


}
