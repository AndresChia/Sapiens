import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {
  forma: FormGroup;

  constructor() {

    this.forma = new FormGroup({
      rol: new FormControl('0')
    });
  }

  ngOnInit() {
  }

}
