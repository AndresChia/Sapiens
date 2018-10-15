import { Component, OnInit } from '@angular/core';
import { estudiante, persona } from 'src/app/interface/interfaces';

@Component({
  selector: 'app-asociarrol',
  templateUrl: './asociarrol.component.html',
  styleUrls: ['./asociarrol.component.css']
})
export class AsociarrolComponent implements OnInit {
  actualRol: string;
  busqueda = false;
  selecionado = false;
  personas: persona[] = [
    {
      id: 1,
      nombre: "a",
      apellido: "string",
      identificacion: "string",
      tipoIdentificacion: "string",
      genero: "string",
      direccion: "string",
      correo: "string",
      telefono: "string",
      rol: "Estudiante",
      check: false,
    }
  ]

  roles = [];
  rolesTotal = ["Estudiante", "Profesor", "Director", "Admin", "Consejero"];
  constructor() { }
  ngOnInit() {
  }

  buscar(nombre, correo, id) {
    if (nombre !== "" || correo !== "" || id !== "") {
      this.busqueda = true;
    }

  }
  seleccionarCheck(index: number) {
    this.roles = [];

    for (let i = 0; i < this.personas.length; i++) {
      if (i !== index) {
        this.personas[i].check = false;
      }
    }

    this.selecionado = true;
    this.personas[index].check = !this.personas[index].check;

    let bandera = false;
    for (let i = 0; i < this.personas.length; i++) {
      if (this.personas[i].check === true) {
        bandera = true;
      }
    }

    if (bandera === false) {
      this.selecionado = false;
    } else {

      let aux = 0;
      this.rolesTotal.forEach(element => {
        if (this.rolesTotal[index] !== element) {
          this.roles.push(this.rolesTotal[aux]);
        }
        aux++;
      });

      this.actualRol = this.personas[index].rol;

    }

  }

  cambiarRol() {
    this.busqueda = false;
    this.selecionado = false;

  }

}
