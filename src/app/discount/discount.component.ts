import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from "@angular/forms";
import {DiscountService} from "./service/discount.service";

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit{

  enteredTitle = "";
  enteredContent = "";


  constructor(private discountService: DiscountService) {
  }


  ngOnInit() {
  //  this.name.valueChanges.subscribe(data => console.log(data));
  }


  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.discountService.postDiscounts(form.value.title, form.value.content).subscribe(() => {});
    form.resetForm();
  }
}
