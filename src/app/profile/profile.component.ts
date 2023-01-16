import { Component, OnInit } from "@angular/core";
import { UrlSerializer } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { User } from "../models/User";

const user = require("../models/user");

@Component({
    selector: 'sf-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
    user!: User

    constructor( private authService: AuthService) {
    }

    ngOnInit() {
        const auth = this.authService.getUserId();
        const userId = auth?.userId;
        console.log(userId);
        this.authService.getUser(userId!).subscribe(response => {
            console.log(response.user)
            this.user = response.user
          });


    }

}