import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../app.component";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private appComponent: AppComponent) {
    appComponent.load = false;
  }

  ngOnInit() {
  }

}
