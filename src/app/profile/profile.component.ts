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
    user!: User;

    constructor( private authService: AuthService) {
    }

    ngOnInit() {

    }

}