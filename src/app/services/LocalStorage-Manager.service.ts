import { Injectable } from '@angular/core';
import { datoBusqueda } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManager {

  constructor() {
  }

  cargar(valor: string) {
    localStorage.setItem("0", valor);
  }

  getData(idItem: string): string {
    return localStorage.getItem("0");
  }
}