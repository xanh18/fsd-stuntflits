import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  public baseUrl: string = 'http://localhost:3000/api/';
  public headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http: HttpClient)
  {

  }
  postDiscounts(title: string, content: string)
  {
    const body =
    {
      title,
      content
    }


    return this.http.post(this.baseUrl+'discounts',body, {headers:this.headers});
  }

}
