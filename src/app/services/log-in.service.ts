import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LogInService {

  acceso = false;
  tipo: string;
  usuario: string;
  contrasenia: string;
  load: boolean;


  url = "http://localhost:1337/";

  constructor(private http: Http) {
    this.load = false;
  }

  entrarLog() {

    // this.http.post("http://localhost:1337/auth/local/login?username=achia&password=12345678",).map(data => {

    //   console.log(data);
    // });

  }



}
