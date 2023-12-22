import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PostService} from "../../../shared/services/post.service";
import {Observable} from "rxjs";
import {PostResponseInterface} from "../../../shared/interfaces/post-response.interface";
import {DataCategoryService} from "../../services/data-category.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit{

  posts$!: Observable<PostResponseInterface[]>
  category!: string

  constructor(private postService: PostService,
              private dataCategoryService: DataCategoryService) {
  }

  ngOnInit() {
    this.dataCategoryService.currentVariable.subscribe((variable) => {
      this.category = variable
    });
    this.posts$ = this.postService.getAllPosts()

  }

}
