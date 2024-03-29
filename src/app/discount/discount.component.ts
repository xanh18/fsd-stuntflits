import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {DiscountService} from "./service/discount.service";
import {Discount} from "../models/Discount";
import {map, Subscription} from "rxjs";
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit, OnDestroy{


  discounts : Discount[] = [];

  discountId: EventEmitter<string> = new EventEmitter<string>();

  userIsAuthenticated = false;
  private authStatusSub: Subscription | undefined;

  constructor(private discountService: DiscountService, private authService: AuthService, private router: Router) {
  }


  ngOnInit() {
  this.discountService.getDiscounts().subscribe((transformedDiscounts) => {
    this.discounts = transformedDiscounts
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  handleDelete(id: string) {
    this.discountService.DeleteDiscount(id).subscribe(() => {
      const updatedDiscounts = this.discounts.filter(discount => discount.id !== discount.id);
      this.discounts = updatedDiscounts;
      this.router.navigate(["/"]);
      this.discountService.getDiscounts().subscribe((transformedDiscounts) => {
        this.discounts = transformedDiscounts
        });
    })
  }

  ngOnDestroy() {
    this.authStatusSub?.unsubscribe();
  }

  ngAfterViewInit()
  {
    $(document).ready(function () {
      $("#filter-category").change(function(this: any) {

        var filterValue = $(this).find("option:selected").val()
        var panelValue =  $('#discount-posts .card-title-category').each(function(this: any, index: any ) {

          if(filterValue === "")
          {
            $(this).parent().parent().show()
          } else if(filterValue === $(this).text())
          {
            $(this).parent().parent().show()
          } else
          {
            $(this).parent().parent().hide()
          }
        });
      });
    });
  
  $(document).ready(function () {
    $("#search-shop").on("input", function(this: any) {

      var filterValue = $(this).val()
      var panelValue =  $('#discount-posts .card-title-shop').each(function(this: any, index: any ) {

        if(filterValue === "")
        {
          $(this).parent().parent().show()
        } else if(filterValue === $(this).text())
        {
          $(this).parent().parent().show()
        } else
        {
          $(this).parent().parent().hide()
        }
      });
    });
  });
}
}

