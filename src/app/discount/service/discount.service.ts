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
  postDiscounts(title: string, content: string, image: File)
  {

    const body = new FormData();
    body.append("title",title);
    body.append("content",content);
    body.append("image",image, title);

    return this.http.post<{message: string, discount: Discount}>(this.baseUrl+'discounts',body)
      .subscribe(responseData =>
      {
        const discount: Discount =
          {id: responseData.discount.id,
            title: title,
            content:content,
          imagePath: responseData.discount.imagePath};
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
          imagePath: discount.imagePath,
          id: discount._id
        }
      })
    }));
  }

  getDiscount(id: string)
  {
    return this.http.get<{_id: string, title:string, content:string, imagePath: string}>(this.baseUrl + 'discounts/' + id);
  }

  updateDiscount(id: string, title: string, content: string, image: File | string)
  {
    let body: Discount | FormData;
    if (typeof(image) === 'object')
    {
      body = new FormData();
      body.append("id", id)
      body.append("title",title);
      body.append("content",content);
      body.append("image",image, title);

    }else
    {
      body = {id: id, title: title, content: content, imagePath: image}
    }
    // @ts-ignore

    return this.http.put(this.baseUrl + 'discounts/' + id, body)
  }

  DeleteDiscount(id: string)
  {
    return this.http.delete(this.baseUrl+ 'discounts/'+ id)
  }


}
