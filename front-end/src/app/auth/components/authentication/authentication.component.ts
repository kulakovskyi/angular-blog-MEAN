import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AlertServices} from "../../../shared/services/alert.services";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Subscription} from "rxjs";
import {UserLoginInterface} from "../../../shared/interfaces/user-login.interface";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy{

  form!: FormGroup
  submitted = false
  lSub$!: Subscription

  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertServices) {
  }

  ngOnInit() {
    this.initializeForm()
  }

  ngOnDestroy() {
    this.lSub$?.unsubscribe()
  }

  login() {
    if(this.form.invalid) return
    const user: UserLoginInterface = {...this.form.value}
    this.lSub$ = this.authService.authUser(user).subscribe(res => {
      this.alertService.success('Success logged in')
      this.authService.storeUser(res.token, res.user)
      this.router.navigate(['/dashboard'])
    }, (error) => {
      this.alertService.danger('Error: ' + error.error.error)
    })
  }

  initializeForm(){
    this.form = new FormGroup({
      login: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ])
    })
  }

}
