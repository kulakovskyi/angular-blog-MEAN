import { Pipe, PipeTransform } from '@angular/core';
import {PostInterface} from "../interfaces/post.interface";
import {PostResponseInterface} from "../interfaces/post-response.interface";

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(posts: PostResponseInterface[], category: string) {
    if(!category){
      return posts
    }
    return posts.filter(posts => posts.category.toLowerCase() == category.toLowerCase())
  }

}
