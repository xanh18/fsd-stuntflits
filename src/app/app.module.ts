import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscountComponent } from './discount/discount.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule, HttpHandler, HttpHeaders, HTTP_INTERCEPTORS} from "@angular/common/http";
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { CreateDisountComponent } from './discount/create-disount/create-disount.component';
import { CommentComponent } from './discount/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    DiscountComponent,
    ProfileComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    CreateDisountComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
