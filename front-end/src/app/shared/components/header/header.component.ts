import { Component } from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {AlertServices} from "../../services/alert.services";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public authService: AuthService,
              private router: Router,
              private alertService: AlertServices) {
  }

  openMenu!: boolean

  logoutUser() {
    this.authService.logOut()
    this.router.navigate(['/account/auth'])
    this.alertService.success('You are logged out')
  }

  toggleMenu() {

  }
}
