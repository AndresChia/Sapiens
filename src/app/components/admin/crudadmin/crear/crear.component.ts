import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  forma: FormGroup;

  constructor() {

    this.forma = new FormGroup({
      rol: new FormControl('0')
    });


  }

  ngOnInit() {
  }

}
