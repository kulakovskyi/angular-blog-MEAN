import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../auth/guard/auth.guard";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuillModule} from "ngx-quill";
import {PostService} from "../shared/services/post.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: DashboardComponent, canActivate: [AuthGuard]}
    ]),
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  declarations: [
    DashboardComponent
  ],
  providers:[AuthGuard, PostService]
})

export class DashboardModule{}
