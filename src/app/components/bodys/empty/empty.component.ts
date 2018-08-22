import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../app.component";

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {

  constructor(private appComponent: AppComponent) {
    appComponent.load = false;
  }

  ngOnInit() {
  }

}
