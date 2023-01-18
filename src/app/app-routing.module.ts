import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DiscountComponent} from "./discount/discount.component";
import {AppComponent} from "./app.component";
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreateDisountComponent } from './discount/create-disount/create-disount.component';
import { AuthGuard } from './auth/auth.guard';
import {AdminComponent} from "./auth/admin/admin.component";


const routes: Routes = [
  {path: '', component: DiscountComponent},
  {path: 'home', component: AppComponent},
  {path: 'discount', component: DiscountComponent},
  {path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'create', component: CreateDisountComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent},
  {path: 'edit/:discountId', component: CreateDisountComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
