import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CommentService} from "../service/comment.service";
import {Comment} from "../../models/Comment";
import {Observable} from "rxjs";
import {Discount} from "../../models/Discount";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{

  enteredValue = "";

  @Input() discountId!: string;

  comments: any[] = [];
  comment?: Comment;


  constructor(public commentService: CommentService) {
  }
  ngOnInit()
  {
    this.commentService.getComments(this.discountId).subscribe(comments => {

      this.comments = comments.comment;
    })
  }


  onAddComment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.commentService.postComments(this.discountId, form.value.enteredValue)

    form.resetForm();
  }

}
