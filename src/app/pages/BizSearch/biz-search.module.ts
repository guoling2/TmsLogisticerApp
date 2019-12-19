import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EnterpriseOrdersComponent } from './enterprise-orders/enterprise-orders.component';


const routes: Routes = [
  {
    path: 'enterprise-orders',
    component: EnterpriseOrdersComponent
  }
];


@NgModule({
  declarations: [EnterpriseOrdersComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class BizSearchModule { }
