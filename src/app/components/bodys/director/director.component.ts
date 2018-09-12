import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../../services/log-in.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

  constructor(private _LogInService: LogInService) {
  }
  ngOnInit() {
  }

}
