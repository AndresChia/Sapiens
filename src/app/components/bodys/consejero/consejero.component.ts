import { Component } from '@angular/core';
import { LogInService } from "../../../services/log-in.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-consejero',
  templateUrl: './consejero.component.html',
  styleUrls: ['./consejero.component.css']
})
export class ConsejeroComponent {

  constructor(private router: Router, public _LogInService: LogInService) { }

}

