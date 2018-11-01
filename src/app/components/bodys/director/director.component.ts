import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../../services/log-in.service';
import { DirectorService } from '../../../services/serviciosRest/director.service';
import { alertasIA, estudianteIA } from 'src/app/interface/interfaces';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

  opcion = false;


  constructor() {



  }
  ngOnInit() {
  }

  activar() {

    this.opcion = true;
  }



}

