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
      //console.log(state.url.split('/') + " parent");

      if (this._LogInService.usuario.tipo === "consejero") {
        if (state.url.split('/')[1] === "consejero") {
          return true;
        }
        return false;
      }

      if (this._LogInService.usuario.tipo === "profesor") {
        if (state.url.split('/')[1] === "profesor") {
          return true;
        }
        return false;
      }

      if (this._LogInService.usuario.tipo === "estudiante") {
        if (state.url.split('/')[1] === "estudiante") {
          return true;
        }
        return false;
      }


      if (this._LogInService.usuario.tipo === "director") {
        if (state.url.split('/')[1] === "director") {
          return true;
        }
        return false;
      }

      if (this._LogInService.usuario.tipo === "admin") {
        if (state.url.split('/')[1] === "admin") {
          return true;
        }
        return false;
      }


    } else {
      if (state.url.split('/')[1] === "Home") {
        return true;
      }
      if (state.url.split('/')[1] === "admin") {
        return true;
      }
      return false;
    }

    return false;
  }
  //FIXME: falta
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    //console.log(state.url.split('/') + " child");


    return true;
  }
}
