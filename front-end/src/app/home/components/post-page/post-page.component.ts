import {Component, OnInit} from '@angular/core';
import {Observable, switchMap} from "rxjs";
import {PostInterface} from "../../../shared/interfaces/post.interface";
import {PostService} from "../../../shared/services/post.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostResponseInterface} from "../../../shared/interfaces/post-response.interface";
import {AuthService} from "../../../auth/services/auth.service";
import {AlertServices} from "../../../shared/services/alert.services";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit{

  post$!: Observable<PostResponseInterface>
  login!: string

  constructor(private postService: PostService,
              private route:ActivatedRoute,
              private authService: AuthService,
              private alertService: AlertServices,
              private router: Router) {
  }

  ngOnInit() {

    if(this.authService.isAuthenticated()){
      this.login = JSON.parse(localStorage.getItem('user')!).login
    }

    this.post$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postService.getPostById(params['id'])
        })
      )
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe(res => {
      this.alertService.success('Post deleted')
      this.router.navigate(['/'])
    })
  }
}
