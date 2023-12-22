import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthGuard} from "./guard/auth.guard";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'auth', pathMatch: 'full'},
      {path: 'auth', component: AuthenticationComponent},
      {path: 'register', component: RegisterComponent},
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AuthLayoutComponent,
    RegisterComponent,
    AuthenticationComponent
  ],
  providers: [AuthService, AuthGuard]
})

export class AuthModule{}
