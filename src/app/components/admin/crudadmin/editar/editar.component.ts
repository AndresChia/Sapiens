import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  forma: FormGroup;

  constructor() {
    this.forma = new FormGroup({
      rol: new FormControl('0')
    });
  }

  ngOnInit() {
  }

}
