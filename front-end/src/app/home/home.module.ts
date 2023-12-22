import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { HomeComponent } from './components/home/home.component';
import {RouterModule} from "@angular/router";
import { HomeTopBarComponent } from './components/home-top-bar/home-top-bar.component';
import { ArticleSingleComponent } from './components/article-single/article-single.component';
import { PostsComponent } from './components/posts/posts.component';
import {PostService} from "../shared/services/post.service";
import {QuillViewComponent} from "ngx-quill";
import { PostPageComponent } from './components/post-page/post-page.component';
import {DataCategoryService} from "./services/data-category.service";
import {SortingPipe} from "../shared/pipes/sorting.pipe";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HomeComponent},
      {path: 'post/:id', component: PostPageComponent}
    ]),
    QuillViewComponent
  ],
  declarations: [
    HomeLayoutComponent,
    HomeComponent,
    HomeTopBarComponent,
    ArticleSingleComponent,
    PostsComponent,
    PostPageComponent,
    SortingPipe
  ],
  providers:[PostService, DataCategoryService]
})

export class HomeModule{}
