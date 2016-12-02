import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class GuardService {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate() {
        // return this.checkIfLoggedIn();
        return true;
    }

    private checkIfLoggedIn(): boolean {
        let loggedIn: boolean = this.authService.isLoggedIn();
        if (!loggedIn) {
            console.log("GuardService: The user is not logged in and can't navigate to this site. Redirecting to login page.");
            this.router.navigateByUrl("/login");
        }
        return loggedIn;
    }
}
