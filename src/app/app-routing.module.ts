import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DiscountComponent} from "./discount/discount.component";
import {AppComponent} from "./app.component";
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateDisountComponent } from './discount/create-disount/create-disount.component';


const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: 'discount', component: DiscountComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'create', component: CreateDisountComponent},
  {path: 'edit/:discountId', component: CreateDisountComponent},
  {path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
