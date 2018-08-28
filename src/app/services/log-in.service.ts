import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  acceso = false;
  tipo: string;
  usuario: string;
  contrasenia: string;
  load: boolean;


  constructor() {
    this.load = false;

  }
}
