import { Injectable } from '@angular/core';
import { datoBusqueda } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConsultardemandaService {



  constructor() {

  }

  cargar(valor: string) {
    localStorage.setItem("0", valor);
  }
}
