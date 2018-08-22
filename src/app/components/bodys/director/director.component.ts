import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../../app.component";

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

  constructor(private appComponent: AppComponent) {
    appComponent.load = false;
  }
  ngOnInit() {
  }

}
