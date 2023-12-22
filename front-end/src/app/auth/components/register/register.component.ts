import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserInterface} from "../../../shared/interfaces/user.interface";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { Subscription} from "rxjs";
import {UserResponseInterface} from "../../../shared/interfaces/user-response.interface";
import {AlertServices} from "../../../shared/services/alert.services";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy{

  form!: FormGroup
  submitted = false
  rSub$!: Subscription

  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertServices) {
  }

  ngOnInit() {
    this.initializeForm()
  }

  ngOnDestroy() {
      this.rSub$?.unsubscribe()
  }

  register() {
    if(this.form.invalid) return
    const user: UserInterface = {...this.form.value}
    this.rSub$ = this.authService.registerUser(user)
      .subscribe((res: UserResponseInterface) => {
        this.alertService.success('User successfully created')
        this.router.navigate(['/account/auth'])
    }, () => {
        this.alertService.danger('Error: This user already exists')
      })
  }

  initializeForm(){
    this.form = new FormGroup({
      name: new FormControl(null),
      login: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ])
    })
  }




}
