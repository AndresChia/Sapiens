import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogInService } from "../../../services/log-in.service";

import { Router } from "@angular/router";

@Component({
  selector: 'app-consejero',
  templateUrl: './consejero.component.html',
  styleUrls: ['./consejero.component.css']
})
export class ConsejeroComponent implements OnInit {

  url: string;

  constructor(private router: Router, public _LogInService: LogInService) {
    this.url = router.url;
  }

  ngOnInit() {


  }




}

