import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LogInService } from './services/log-in.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(public _LogInService: LogInService, private router: Router) {


  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log(this._LogInService.usuario.acceso);

    if (this._LogInService.usuario.acceso) {
      if (this._LogInService.usuario.tipo === "consejero") {
        if (state.url.split('/')[1] !== "consejero") {
          this.router.navigate(["consejero", this._LogInService.usuario.id]);
        }

      }
      if (this._LogInService.usuario.tipo === "estudiante") {
        if (state.url.split('/')[1] !== "estudiante") {
          this.router.navigate(["estudiante", this._LogInService.usuario.id]);
        }
      }
      if (this._LogInService.usuario.tipo === "profesor") {
        if (state.url.split('/')[1] !== "profesor") {
          this.router.navigate(["profesor", this._LogInService.usuario.id]);
        }
      }

      if (this._LogInService.usuario.tipo === "director") {
        if (state.url.split('/')[1] !== "director") {
          this.router.navigate(["director", this._LogInService.usuario.id]);
        }
      }

      if (this._LogInService.usuario.tipo === "admin") {
        console.log(state.url.split('/').length);

        if (state.url.split('/')[1] !== "admin") {
          this.router.navigate(["/admin"]);
          return true;
        }
        if (state.url.split('/').length === 2) {
          this.router.navigate(["/admin", this._LogInService.usuario.id]);
        }


      }


    } else {

      if (state.url.split('/')[1] === "admin") {
        console.log(state.url.split('/').length);
        if (state.url.split('/').length > 2) {
          this.router.navigate(["/admin"]);
          return false;
        }
        return true;

      }



      this.router.navigate(['Home']);
      return false;

    }
    return true;
  }
  //FIXME: falta
  canActivateChild() {

    console.log("hola2");

    if (this._LogInService.usuario.acceso) {
      if (this._LogInService.usuario.tipo === "consejero") {

      }
      if (this._LogInService.usuario.tipo === "estudiante") {

      }
      if (this._LogInService.usuario.tipo === "profesor") {

      }
      if (this._LogInService.usuario.tipo === "admin") {
        console.log("adminnn");
      }
      if (this._LogInService.usuario.tipo === "director") {

      }
    } else {

      this.router.navigate(['Home']);
      return false;

    }
    return true;
  }

}
