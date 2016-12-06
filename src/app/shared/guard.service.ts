import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { Observable } from "rxjs/Rx";

import { AuthService } from "./auth.service";

@Injectable()
export class GuardService {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate() {
        let isLoggedIn = this.authService.isLoggedIn();
        if (!isLoggedIn) {
            console.log("GuardService: The user is not logged in and can't navigate to this site. Redirecting to login page.");
            this.router.navigateByUrl("/login");
            return false;
        }
        return isLoggedIn;
    }
}
