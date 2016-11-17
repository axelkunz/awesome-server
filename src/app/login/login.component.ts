import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../user.service";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {

    username: string;
    password: string;
    isLocked: boolean = false;
    errorMsg: string;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router: Router
    ) { }

    onClick() {
        this.isLocked = true;
        this.authService.login(this.username, this.password).then(() => {
            this.router.navigateByUrl("/");
        }).catch(err => {
            this.errorMsg = err;
            this.isLocked = false;
        });
    }
}
