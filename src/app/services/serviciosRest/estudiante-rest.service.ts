import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstudianteRestService {

  url = "http://localhost:1337/";


  constructor(private http: Http, private router: Router) { }


  obtenerConsejeros(id: number) {

    return this.http.get(this.url + "Facultad/" + id + "/Consejeros").pipe(
      map(res => {
        return res.json();
      }));

  }
}
