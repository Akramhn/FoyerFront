import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRole } from 'src/app/Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantGuardGuard implements CanActivate {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);

  constructor(private route: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userconnect.role==UserRole.ETUDIANT)
      return true
    else {
      this.route.navigateByUrl('/accessdenied')
      return false
    }
  }
  
}
