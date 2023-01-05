import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthData } from './auth.data.model';

@Injectable({ providedIn: "root" })

export class AuthService {
    private isAuthenticated = false;
    private token: string | undefined;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient) {}

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
      }
    
      getAuthStatusListener() {
        return this.authStatusListener.asObservable();
      }

    createUser(password: string, email: string) {
        const authData: AuthData = {password: password, email: email};
        this.http.post("http://localhost:3000/api/user/signup", authData)
        .subscribe(response => {
            console.log(response);
        });
    }

    login(email: string, password: string) {
        const authData: AuthData = {email: email, password: password};
        this.http.post<{token: string}>("http://localhost:3000/api/user/login", authData)
          .subscribe(response => {
            const token = response.token;
            this.token = token;
            this.authStatusListener.next(true);
          })
      }

      logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["/"]);
      }
}