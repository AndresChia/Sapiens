import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { LogInService } from '../../../services/log-in.service';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {

  constructor(private _LogInService: LogInService) {

  }

  ngOnInit() {
  }

}
