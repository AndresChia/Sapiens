import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {
  forma: FormGroup;

  constructor() {

    this.forma = new FormGroup({
      rol: new FormControl()
    });

  }

  ngOnInit() {
  }

}
