import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth.data.model';

@Injectable({ providedIn: "root" })

export class AuthService {
    constructor(private http: HttpClient) {}
    createUser(username: string, password: string, email: string) {
        const authData: AuthData = {username: username, password: password, email: email};
        this.http.post("http://localhost:3000/api/user/signup", authData)
        .subscribe(response => {
            console.log(response);
        });
    }
}