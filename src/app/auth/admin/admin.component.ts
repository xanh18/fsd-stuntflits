import { Component } from '@angular/core';
import {User} from "../../models/User";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  userList : User[] = [];

  constructor(public authService: AuthService) {

  }

  getUsers()
  {
    this.authService.getUsers().subscribe((usersData) => {
      this.userList = usersData.users;
    });
  }

  ngOnInit()
  {
    this.getUsers();
  }

  handleDelete(email: string) {
    this.authService.deleteUser(email).subscribe( response => {}
    );
    this.getUsers();
  }
}
