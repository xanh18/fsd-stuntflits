import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Discount} from "../../models/Discount";
import {map} from "rxjs";
import { UrlSerializer } from '@angular/router';

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
  postDiscounts(title: string, categories: string, expirydate: string, content: string, user: string, newprice: string, oldprice: string, shop: string, location: string, image: File)
  {

    const body = new FormData();
    body.append("title",title);
    body.append("categories", categories);
    body.append("expirydate", expirydate);
    body.append("content", content);
    body.append("newprice",newprice);
    body.append("oldprice",oldprice);
    body.append("shop",shop);
    body.append("location",location);
    body.append("image",image, title);

    return this.http.post<{message: string, discount: Discount}>(this.baseUrl+'discounts',body)
      .subscribe(responseData =>
      {
        const discount: Discount =
          {id: responseData.discount.id,
            title: title,     
            categories: categories, 
            expirydate:expirydate, 
            content: content, 
            newprice:newprice, 
            oldprice:oldprice, 
            shop:shop, 
            location:location,
            user: user,
          imagePath: responseData.discount.imagePath};
        this.discount.push(body);
      });
  }
  getDiscounts()
  {
    return this.http.get<{message: string; discounts: any[] }>(this.baseUrl+'discounts').pipe(map((discountData) => {
      return discountData.discounts.map( discount => {
        return {
          id: discount._id,
          user: discount.user,
          title: discount.title,
          categories: discount.categories,
          expirydate: discount.expirydate,
          content: discount.content,
          newprice: discount.newprice, 
          oldprice: discount.oldprice,
          shop: discount.shop,
          location: discount.location,
          imagePath: discount.imagePath
        }
      })
    }));
  }

  getDiscount(id: string)
  {
    return this.http.get<{_id: string, title: string, categories:string, expirydate:string, content: string, newprice:string, oldprice:string, shop:string, location:string, user: string, imagePath: string}>(this.baseUrl + 'discounts/' + id);
  }

  updateDiscount(id: string, title: string, categories:string, expirydate:string, content: string, newprice:string, oldprice:string, shop:string, location:string, image: File | string)
  {
    let body: Discount | FormData;
    if (typeof(image) === 'object')
    {
      body = new FormData();
      body.append("id", id)
      body.append("title",title);
      body.append("categories", categories);
      body.append("expirydate", expirydate);
      body.append("content",content);
      body.append("newprice", newprice);
      body.append("oldprice", oldprice);
      body.append("shop", shop);
      body.append("location", location);
      body.append("image",image, title);

    }else
    {
      body = {
        id: id, 
        title: title, categories: categories, expirydate:expirydate, 
        content: content, newprice:newprice, oldprice:oldprice, shop:shop, location:location, 
        imagePath: image, 
        user: null
      };
    }
    // @ts-ignore

    return this.http.put(this.baseUrl + 'discounts/' + id, body)
  }

  DeleteDiscount(id: string)
  {
    return this.http.delete(this.baseUrl+ 'discounts/'+ id)
  }


}
