import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettleInvoiceDetailComponent } from './settle-invoice-detail/settle-invoice-detail.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [SettleInvoiceDetailComponent],
  exports: [
    SettleInvoiceDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class FncommonModule { }
