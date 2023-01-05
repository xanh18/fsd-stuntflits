import {Component, OnInit} from '@angular/core';
import {DiscountService} from "../service/discount.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Discount} from "../../models/Discount";
import {NgForm} from "@angular/forms";
import { SchemaTypeOptions } from 'mongoose';

@Component({
  selector: 'app-create-disount',
  templateUrl: './create-disount.component.html',
  styleUrls: ['./create-disount.component.css']
})
export class CreateDisountComponent  implements  OnInit{
  private mode = "create";
  private discountId! : string | null;
  discount!: Discount;


  constructor(public discountService: DiscountService, public route: ActivatedRoute){

  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('discountId'))
      {
        this.mode = 'edit';
        this.discountId = paramMap.get('discountId') as string;
        this.discountService.getDiscount(this.discountId).subscribe(discountData =>{
          this.discount = {id: discountData._id, title: discountData.title, category: discountData.category, expirydate: discountData.expirydate, content: discountData.content, newprice: discountData.newprice, oldprice: discountData.oldprice, shop: discountData.shop, location: discountData.location}
        });
      } else
      {
        this.mode = 'create';
        this.discountId = null;
      }

    })
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === "create")
    {
      this.discountService.postDiscounts(form.value.title, form.value.category, form.value.expirydate, form.value.content, form.value.newprice, form.value.oldprice, form.value.shop, form.value.location)
    } else {
      this.discountService.updateDiscount(this.discountId!, form.value.title, form.value.category, form.value.expirydate, form.value.content, form.value.newprice, form.value.oldprice, form.value.shop, form.value.location).subscribe(() => {})

    }
    form.resetForm();
  }
}
