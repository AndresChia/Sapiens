import { Component, OnInit } from '@angular/core';
import { LogInService } from "../../services/log-in.service";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public _LogInService: LogInService) { }

  ngOnInit() {
  }

}
