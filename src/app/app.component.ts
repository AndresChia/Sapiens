import { Component } from '@angular/core';
import { LogInService } from "./services/log-in.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sapiens';

  constructor(public _LogInService: LogInService) {
  }
}
