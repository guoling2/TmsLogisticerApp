import { NgModule } from '@angular/core';
import { AcceptOrderDirectiveDirective } from './bizdirective/accept-order-directive.directive';
import { CommonModule } from '@angular/common';
import { OrderTransComponent } from './order-trans/order-trans.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonbizmoduleModule} from '../common/commonbizmodule.module';
import { OrderChargesettleCreateComponent } from './order-charge-settle-create/order-chargesettle-create.component';
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
import { OrderSettleDataGridComponent } from './order-settle-admin-list/sub/order-settle-data-grid/order-settle-data-grid.component';
import { OrderSettleAdminProcessComponent } from './order-settle-admin-process/order-settle-admin-process.component';
import { OrderAddInvoiceComponent } from './order-add-invoice/order-add-invoice.component';
import {FncommonModule} from '../../buinesscomponent/fncommon/fncommon.module';
import { OrdersettlecourseComponent } from './order-settle-admin-detail/sub/ordersettlecourse/ordersettlecourse.component';
import { OrderchargeitemlistComponent } from './order-settle-admin-detail/sub/orderchargeitemlist/orderchargeitemlist.component';
import { OrderUpdateReceiveAmtComponent } from './order-settle-admin-detail/sub/order-update-receive-amt/order-update-receive-amt.component';
import { OrderForceBlanceComponent } from './order-settle-admin-detail/sub/order-force-blance/order-force-blance.component';


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
    OrderSettleAdminDetailComponent,
    OrderSettleDataGridComponent,
    AcceptOrderDirectiveDirective,
    OrderSettleAdminProcessComponent,
    OrderAddInvoiceComponent,
    OrdersettlecourseComponent,
    OrderchargeitemlistComponent,
    OrderUpdateReceiveAmtComponent,
    OrderForceBlanceComponent],
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
        FncommonModule,
    ],
   entryComponents: [
     OrderChargesettleCreateComponent, OrderChargeSettleNoApplayListComponent,
     OrderChargePrintComponent, OrderSettleAdminProcessComponent,
     OrderAddInvoiceComponent, OrderUpdateReceiveAmtComponent,
     OrderForceBlanceComponent]
})
export class FnOrderModule { }
