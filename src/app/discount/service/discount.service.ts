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
  postDiscounts(title: string, content: string)
  {
    const body =
    {
      id : null,
      title,
      content
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
          content: discount.content,
          id: discount._id
        }
      })
    }));
  }

  getDiscount(id: string)
  {
    return this.http.get<{_id: string, title:string, content:string}>(this.baseUrl + 'discounts/' + id);
  }

  updateDiscount(id: string, title: string, content: string)
  {
    const discount: Discount = {id: id, title: title, content: content};

    return this.http.put(this.baseUrl + 'discounts/' + id, discount)
  }

  DeleteDiscount(id: string)
  {
    return this.http.delete(this.baseUrl+ 'discounts/'+ id)
  }


}
