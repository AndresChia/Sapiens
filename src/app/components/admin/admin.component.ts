import { Component, OnInit } from '@angular/core';
import { LogInService } from '../../services/log-in.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private _LogInService: LogInService) {

    _LogInService.tipo = "admin";

  }

  ngOnInit() {
  }

}
