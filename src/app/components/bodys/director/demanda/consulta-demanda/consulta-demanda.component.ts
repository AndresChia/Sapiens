import { Component, OnInit } from '@angular/core';
import { DemandaComponent } from "../demanda.component";
import { ConsultardemandaService } from "../../../../../services/consultardemanda.service";
import { datoBusqueda } from '../../../../../interface/interfaces';
import { LogInService } from '../../../../../services/log-in.service';

@Component({
  selector: 'app-consulta-demanda',
  templateUrl: './consulta-demanda.component.html',
  styleUrls: ['./consulta-demanda.component.css']
})
export class ConsultaDemandaComponent implements OnInit {

  busqueda: datoBusqueda[] = [];


  constructor(private _ConsultardemandaService: ConsultardemandaService, private _LogInService: LogInService) {
    let a = localStorage.getItem("0");
    this.busqueda = JSON.parse(a);
    _LogInService.tipo = "admin";

  }

  ngOnInit() {
  }



  cerrar() {
    window.close();
  }
}
