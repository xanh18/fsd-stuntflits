import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Discount} from "../../models/Discount";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  public baseUrl: string = 'http://localhost:3000/api/';
  public headers = new HttpHeaders().set('Content-Type','application/json');

  discount : any[]= [];

  constructor(private http: HttpClient)
  {

  }
  postDiscounts(title: string, category:string, expirydate:string, content: string, newprice:string, oldprice:string, shop:string, location:string)
  {
    const body =
    {
      id : null,
      title,
      category,
      expirydate,
      content,
      newprice,
      oldprice,
      shop,
      location
    }
      

    return this.http.post<{message: string, discountId: string}>(this.baseUrl+'discounts',body, {headers:this.headers})
      .subscribe(responseData =>
      {
        const Id = responseData.discountId;
        // @ts-ignore
        body.id = Id;
        this.discount.push(body);

      });
  }
  getDiscounts()
  {
    return this.http.get<{message: string; discounts: any[] }>(this.baseUrl+'discounts').pipe(map((discountData) => {
      return discountData.discounts.map( discount => {
        return {
          title: discount.title,
          category: discount.category,
          expirydate: discount.expirydate,
          content: discount.content,
          newprice: discount.newprice, 
          oldprice: discount.oldprice,
          shop: discount.shop,
          location: discount.location,
          id: discount._id
        }
      })
    }));
  }

  getDiscount(id: string)
  {
    return this.http.get<{_id: string, title:string, category:string, expirydate:string, content:string, newprice:string, oldprice:string, shop:string, location:string}>(this.baseUrl + 'discounts/' + id);
  }

  updateDiscount(id: string, title: string, category:string, expirydate:string, content: string, newprice:string, oldprice:string, shop:string, location:string){
    const discount: Discount = {id: id, title: title, category: category, expirydate: expirydate, content: content, newprice: newprice, oldprice: oldprice, shop: shop, location: location};

    return this.http.put(this.baseUrl + 'discounts/' + id, discount)
  }

  DeleteDiscount(id: string)
  {
    return this.http.delete(this.baseUrl+ 'discounts/'+ id)
  }


}
