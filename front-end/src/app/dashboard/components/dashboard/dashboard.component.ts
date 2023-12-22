import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostInterface} from "../../../shared/interfaces/post.interface";
import {PostService} from "../../../shared/services/post.service";
import {Subscription} from "rxjs";
import {AlertServices} from "../../../shared/services/alert.services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{

  form!: FormGroup
  pSub$!: Subscription

  constructor(private postService: PostService,
              private alertService: AlertServices,
              private router: Router) {
  }

  ngOnInit() {
    this.initialForm()
  }

  ngOnDestroy() {
    this.pSub$?.unsubscribe()
  }

  initialForm(){
    this.form = new FormGroup({
      category: new FormControl('World', Validators.required),
      title: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required)
    })
  }

  submit() {
    if(this.form.invalid){
      return
    }
    const post: PostInterface = {
      category: this.form.value.category,
      title: this.form.value.title,
      image: this.form.value.image,
      text: this.form.value.text,
      author: JSON.parse(localStorage.getItem('user')!).login,
      date: new Date(),
    }

    this.pSub$ = this.postService.createPost(post).subscribe(res => {
      console.log(res)
      this.form.reset()
      this.alertService.success('Post created')
      this.router.navigate(['/'])

    })

  }
}
