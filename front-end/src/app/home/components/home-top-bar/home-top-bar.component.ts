import { Component } from '@angular/core';
import {DataCategoryService} from "../../services/data-category.service";

@Component({
  selector: 'app-home-top-bar',
  templateUrl: './home-top-bar.component.html',
  styleUrls: ['./home-top-bar.component.scss']
})
export class HomeTopBarComponent {

  category!: string

  constructor(private dataCategoryService: DataCategoryService) {
  }

  setCategory(category: string) {
    this.dataCategoryService.changeVariable(category);
  }
}
