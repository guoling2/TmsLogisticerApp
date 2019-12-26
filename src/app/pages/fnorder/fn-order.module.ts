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
import { OrderSettleListComponent } from './order-settle-list/order-settle-list.component';
import { OrderSettleUserDetailComponent } from './order-settle-user-detail/order-settle-user-detail.component';
import {UploaderModule} from '@syncfusion/ej2-angular-inputs';
import { OrderExcelAnalysisComponent } from './order-settle-user-detail/sub/order-excel-analysis/order-excel-analysis.component';
import { OrderChargePrintComponent } from './order-charge-print/order-charge-print.component';
import { OrderSettleAdminListComponent } from './order-settle-admin-list/order-settle-admin-list.component';
import { OrderSettleAdminDetailComponent } from './order-settle-admin-detail/order-settle-admin-detail.component';


const routes: Routes = [
  {
    path: 'order-trans-list',
    component: OrderTransComponent
  },
  {
    path: 'order-settle-list',
    component: OrderSettleListComponent
  },
  {
    path: 'order-settle-user-detail/:id',
    component: OrderSettleUserDetailComponent
  },
  {
    path: 'order-settle-admin-list',
    component: OrderSettleAdminListComponent
  },
  {
    path: 'order-settle-admin-detail/:id',
    component: OrderSettleAdminDetailComponent
  },

];

@NgModule({
  declarations: [
    OrderTransComponent,
    OrderChargesettleCreateComponent,
    OrderChargeSettleNoApplayListComponent,
    OrderChargeSettleDetailComponent,
    OrderSettleListComponent,
    OrderSettleUserDetailComponent,
    OrderExcelAnalysisComponent,
    OrderChargePrintComponent,
    OrderSettleAdminListComponent,
    OrderSettleAdminDetailComponent],
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
        UploaderModule,
    ],
   entryComponents: [OrderChargesettleCreateComponent, OrderChargeSettleNoApplayListComponent, OrderChargePrintComponent]
})
export class FnOrderModule { }
