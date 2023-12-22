import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()

export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService,
              private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean>| Promise<boolean> | boolean {
    if(this.authService.isAuthenticated()){
      return true
    } else {
      this.authService.logOut()
      return this.router.navigate(['account/auth'], {
        queryParams: {
          loginAgain: true
        }
      })
    }
  }
}
