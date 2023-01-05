import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {DiscountService} from "./service/discount.service";
import {Discount} from "../models/Discount";
import {map} from "rxjs";

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit{

  discounts : Discount[] = [];

  discountId: EventEmitter<string> = new EventEmitter<string>();

  constructor(private discountService: DiscountService) {
  }


  ngOnInit() {
  this.discountService.getDiscounts().subscribe((transformedDiscounts) => {
    this.discounts = transformedDiscounts
    })
  }

  handleDelete(id: string) {
    this.discountService.DeleteDiscount(id).subscribe(() => {
      const updatedDiscounts = this.discounts.filter(discount => discount.id !== discount.id);
      this.discounts = updatedDiscounts;
    })
  }
}
