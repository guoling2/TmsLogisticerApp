import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTransComponent } from './order-trans/order-trans.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonbizmoduleModule} from '../common/commonbizmodule.module';
import { OrderChargesettleCreateComponent } from './order-chargesettle-create/order-chargesettle-create.component';
import { OrderChargeSettleNoApplayListComponent } from './order-charge-settle-no-applay-list/order-charge-settle-no-applay-list.component';
import { OrderChargeSettleDetailComponent } from './order-charge-settle-detail/order-charge-settle-detail.component';
import {LogistictoreModule} from '../../buinesscomponent/logistore/logistictore.module';
import {BasedataModule} from '../../buinesscomponent/base/basedata.module';
import {FnAccountModule} from '../FnAccount/fn-account.module';


const routes: Routes = [
  {
    path: 'order-trans-list',
    component: OrderTransComponent
  }
];

@NgModule({
  declarations: [
    OrderTransComponent,
    OrderChargesettleCreateComponent,
    OrderChargeSettleNoApplayListComponent,
    OrderChargeSettleDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonbizmoduleModule,
    RouterModule.forChild(routes),
    LogistictoreModule,
    BasedataModule,
    FnAccountModule,
  ],
   entryComponents: [OrderChargesettleCreateComponent, OrderChargeSettleNoApplayListComponent]
})
export class FnOrderModule { }
