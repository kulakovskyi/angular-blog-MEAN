import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()

export class DataCategoryService{
  private variableSource = new BehaviorSubject<string>('');
  currentVariable = this.variableSource.asObservable();

  changeVariable(newVariable: string) {
    this.variableSource.next(newVariable);
  }
}
