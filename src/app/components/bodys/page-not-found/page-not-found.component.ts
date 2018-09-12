import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { LogInService } from '../../../services/log-in.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private _LogInService: LogInService) {
  }

  ngOnInit() {
  }

}
