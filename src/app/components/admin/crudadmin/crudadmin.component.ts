import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from '../../../services/log-in.service';

@Component({
  selector: 'app-crudadmin',
  templateUrl: './crudadmin.component.html',
  styleUrls: ['./crudadmin.component.css']
})
export class CrudadminComponent implements OnInit {
  desactivar = false;
  numeradorOpcion = 0;

  constructor(private router: Router, private _LogInService: LogInService) { }

  ngOnInit() {
  }

  opcion(opc: number) {
    this.desactivar = true;
    this.numeradorOpcion = opc;
  }
  salir() {
    this._LogInService.cerrarSesionAdmin();
  }

}
