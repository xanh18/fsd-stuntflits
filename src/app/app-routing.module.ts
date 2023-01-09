import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DiscountComponent} from "./discount/discount.component";
import {AppComponent} from "./app.component";
import {CreateDisountComponent} from "./discount/create-disount/create-disount.component";


const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'discount', component: DiscountComponent},
  {path: 'create', component: CreateDisountComponent},
  {path: 'edit/:discountId', component: CreateDisountComponent},
  {path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
