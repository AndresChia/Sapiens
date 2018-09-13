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
    } else {

      this.router.navigate(['Home']);
      return false;

    }
    return true;
  }
  //FIXME: falta
  canActivateChild() {
    if (this._LogInService.usuario.acceso) {
      if (this._LogInService.usuario.tipo === "consejero") {
        //console.log(state.url);
      }
      if (this._LogInService.usuario.tipo === "estudiante") {

      }
      if (this._LogInService.usuario.tipo === "profesor") {

      }
      if (this._LogInService.usuario.tipo === "admin") {

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
