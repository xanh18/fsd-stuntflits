import {Component, OnInit} from '@angular/core';
import {DiscountService} from "../service/discount.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Discount} from "../../models/Discount";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-create-disount',
  templateUrl: './create-disount.component.html',
  styleUrls: ['./create-disount.component.css']
})
export class CreateDisountComponent  implements  OnInit{
  enteredTitle = "";
  enteredContent = "";
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
          this.discount = {id: discountData._id, title: discountData.title, content: discountData.content}
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
      this.discountService.postDiscounts(form.value.title, form.value.content)
    } else {
      this.discountService.updateDiscount(this.discountId!, form.value.title, form.value.content).subscribe(() => {})

    }
    form.resetForm();
  }
}
