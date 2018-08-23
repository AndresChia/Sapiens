import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

@Component({
  selector: 'app-consejero',
  templateUrl: './consejero.component.html',
  styleUrls: ['./consejero.component.css']
})
export class ConsejeroComponent implements OnInit {

  url;

  constructor(private router: Router) {
    this.router.navigate([router.url, "busqueda"]);
    this.url = router.url;
  }

  ngOnInit() { }

  alertar() {

    this.router.navigate([this.url, "alertar"]);

  }

  regresar() {
    this.router.navigate([this.url, "busqueda"]);
  }



}

