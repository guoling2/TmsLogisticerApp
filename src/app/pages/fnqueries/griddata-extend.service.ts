import { Injectable } from '@angular/core';
import {Basereportservice} from '../../services/base/basereportservice';
import {GridComponent} from '@syncfusion/ej2-angular-grids';

@Injectable({
  providedIn: 'root'
})
export class GriddataExtendService {

  constructor(private service: Basereportservice) { }

}
