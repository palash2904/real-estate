// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
  
//   return false;

// };

import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './pages/login/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor() {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }

//   constructor(private loginService: LoginService) {}

//   canActivate(route, state): boolean {
//     // Check if the user is authenticated by calling the method in your login service
//     const isAuthenticated = this.loginService.isLogedIn();

//     if (isAuthenticated) {
//       return true; // Allow access to the route
//     } else {
//       // Redirect the user to the login page (for demonstration purposes, assume '/login' is the login route)
//       // You can also handle redirection here or in a separate method
//       // For example, you can inject Angular's Router service and navigate to the login page
//       // this.router.navigate(['/login']);
//       return false; // Prevent access to the route
//     }
//   }
}
