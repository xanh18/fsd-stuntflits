import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DiscountComponent} from "./discount/discount.component";
import {AppComponent} from "./app.component";


const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'discount', component: DiscountComponent},
  {path: 'discount/edit:discountId', component: DiscountComponent},
  {path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
