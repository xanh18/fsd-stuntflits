import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public baseUrl: string = 'http://localhost:3000/api/';
  public headers = new HttpHeaders().set('Content-Type','application/json');

  comment : any[]= [];

  constructor(private http: HttpClient)
  {

  }

  postComments(discountId: string, value: string)
  {
    const body =
      {
        id : null,
        discountId,
        value
      }
    return this.http.post<{message: string, commentId: string}>(this.baseUrl+'comments',body, {headers:this.headers})
      .subscribe(responseData =>
      {
        const Id = responseData.commentId;
        // @ts-ignore
        body.id = Id;
        this.comment.push(body);

      });
  }
  getComments(discountId: string)
  {
    return this.http.get<{message: string; comment: any[] }>(this.baseUrl+'comments/'+ discountId)
  }
}
