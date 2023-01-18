import {Component, OnInit} from '@angular/core';
import {DiscountService} from "../service/discount.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Discount} from "../../models/Discount";
import {FormControl, FormGroup, NgForm, Validator, Validators} from "@angular/forms";
import {mimeType} from "./mime-type.validator";

@Component({
  selector: 'app-create-disount',
  templateUrl: './create-disount.component.html',
  styleUrls: ['./create-disount.component.css']
})
export class CreateDisountComponent  implements  OnInit{
  private mode = "create";
  private discountId! : string | null;
  discount!: Discount;
  form!: FormGroup;
  imagePreview!: string;

  constructor(public discountService: DiscountService, public route: ActivatedRoute){

  }

  ngOnInit() {
    this.form = new FormGroup({
        title: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        categories: new FormControl(null, {validators: [Validators.required]}),
        expirydate: new FormControl(null, {validators: [Validators.required]}),
        content: new FormControl(null, {validators: [Validators.required]}),
        newprice: new FormControl(null, {validators: [Validators.required]}),
        oldprice: new FormControl(null, {validators: [Validators.required]}),
        shop: new FormControl(null, {validators: [Validators.required]}),
        location: new FormControl(null, {validators: [Validators.required]}),
        image: new FormControl(null,{ validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('discountId'))
      {
        this.mode = 'edit';
        this.discountId = paramMap.get('discountId') as string;
        this.discountService.getDiscount(this.discountId).subscribe(discountData =>{
          this.discount = {id: discountData._id, 
            title: discountData.title, 
            categories: discountData.categories, 
            expirydate: discountData.expirydate, 
            content: discountData.content, 
            newprice: discountData.newprice, 
            oldprice: discountData.oldprice, 
            shop: discountData.shop, 
            location: discountData.location, 
            user: discountData.user, 
            imagePath: discountData.imagePath}
        });
        this.form.setValue({
          title: this.discount.title, 
          categories: this.discount.categories, 
          expirydate: this.discount.expirydate, 
          content: this.discount.content, 
          newprice: this.discount.newprice, 
          oldprice: this.discount.oldprice, 
          shop: this.discount.shop, 
          location: this.discount.location, 
          image: this.discount.imagePath });
      } else
      {
        this.mode = 'create';
        this.discountId = null;
      }

    })
  }

  onAddPost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === "create")
    {
      // console.log(this.form.value.categories)
      this.discountService.postDiscounts(this.form.value.title, this.form.value.categories, this.form.value.expirydate, this.form.value.content, this.form.value.newprice, this.form.value.oldprice, this.form.value.shop, this.form.value.location, this.form.value.user, this.form.value.image)
    } else {
      this.discountService.updateDiscount(this.discountId!, this.form.value.title, this.form.value.categories, this.form.value.expirydate, this.form.value.content, this.form.value.newprice, this.form.value.oldprice, this.form.value.shop, this.form.value.location, this.form.value.image).subscribe(() => {})

    }
    this.form.reset();
  }

  onImagePicked(event: Event)
  {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    console.log(this.imagePreview);
    reader.readAsDataURL(file!);
  }
}
