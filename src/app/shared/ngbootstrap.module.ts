import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbAlert, NgbAlertModule, NgbModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [],
  imports: [NgbTabsetModule, NgbAlertModule],
  exports: [NgbTabsetModule, NgbAlertModule]
})
export class NgbootstrapModule { }
