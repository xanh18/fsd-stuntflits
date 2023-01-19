import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import {User} from "../models/User";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdmin: boolean = false;
  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;
  user!: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    if (this.authService.getUserId() != undefined)
    {
      let userObject = this.authService.getUserId();
      let userid = userObject?.userId
      this.authService.getUser(userid!).subscribe(user=>{
        this.user = user.user;
        if(this.user.role == "admin")
        {
          this.isAdmin = true;
        }
      });
    }
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }



  openProfile() {
    const auth = this.authService.getUserId();
    const userId = auth?.userId
    return this.router.navigate(['/profile', userId]);
  }
}
