import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyOrderListComponent} from './list/list.component';
import {OpenMyorderComponent} from './create/openorder.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule} from '@syncfusion/ej2-angular-dropdowns';
import {LogistictoreModule} from '../../buinesscomponent/logistore/logistictore.module';
import {BasedataModule} from '../../buinesscomponent/base/basedata.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { OrdercustomerComponent } from './_sub/ordercustomer/ordercustomer.component';
import {CustomeraddressaddComponent} from '../logisticcustomer/_sub/customeraddressadd/customeraddressadd.component';
import {CustomertaxaddComponent} from '../logisticcustomer/_sub/customertaxadd/customertaxadd.component';
import { OrderrouteplanComponent } from './_sub/orderrouteplan/orderrouteplan.component';
import { PriceanalysisComponent } from './_sub/priceanalysis/priceanalysis.component';
import { DetailComponent } from './detail/detail.component';
import { OrderitemtagprintComponent } from './_sub/orderitemtagprint/orderitemtagprint.component';
import { SimpleorderdetailComponent } from './simpleorderdetail/simpleorderdetail.component';
import { EnterpriseOrderListComponent } from './enterprise-order-list/enterprise-order-list.component';
import { OrderDataListComponent } from './enterprise-order-list/sub/order-data-list/order-data-list.component';
import { EnterpriseOrderDetailComponent } from './enterprise-order-detail/enterprise-order-detail.component';
import { OrderAcceptComponent } from './enterprise-order-list/sub/order-accept/order-accept.component';
import {LogisticOrderDataListComponent} from './list/sub/order-data-list/order-data-list.component';
import { LogistictrackComponent } from './detail/sub/logistictrack/logistictrack.component';
import { OrderchangerouteComponent } from './_sub/orderchangeroute/orderchangeroute.component';
import { DefaultdepotsettingComponent } from './enterprise-order-list/sub/defaultdepotsetting/defaultdepotsetting.component';
import { OrderUnAcceptComponent } from './enterprise-order-list/sub/order-unaccept/order-un-accept.component';
import { UpdatecarnumberComponent } from './enterprise-order-list/sub/order-updatecarnumber/updatecarnumber.component';
import { OrderthumbnailComponent } from './enterprise-order-list/sub/order-thumbnail/orderthumbnail.component';
import { OrderCancelSendComponent } from './enterprise-order-list/sub/order-cancel-send/order-cancel-send.component';
import { EditComponent } from './edit/edit.component';
import { OrderoperactionComponent } from './_sub/orderoperaction/orderoperaction.component';


const routes: Routes = [
  {
    path: 'list',
    component: MyOrderListComponent
  },
  {
    path: 'enterprise-orders',
    component: EnterpriseOrderListComponent
  },
  {
    path: 'create',
    component: OpenMyorderComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'enterprise-order-detail/:id',
    component: EnterpriseOrderDetailComponent
  }
];

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    LogistictoreModule,
    BasedataModule

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [MyOrderListComponent, OpenMyorderComponent, OrdercustomerComponent,
    OrderrouteplanComponent, PriceanalysisComponent, DetailComponent, OrderitemtagprintComponent,
    OrderDataListComponent,
    EnterpriseOrderListComponent, EnterpriseOrderDetailComponent,
    OrderAcceptComponent, LogisticOrderDataListComponent, LogistictrackComponent, OrderchangerouteComponent, DefaultdepotsettingComponent, OrderUnAcceptComponent, UpdatecarnumberComponent, OrderthumbnailComponent, OrderCancelSendComponent, EditComponent, OrderoperactionComponent],
  entryComponents: [
    OrdercustomerComponent, OrderrouteplanComponent, PriceanalysisComponent, OrderthumbnailComponent,
    OrderitemtagprintComponent, OrderAcceptComponent, OrderchangerouteComponent, DefaultdepotsettingComponent, OrderUnAcceptComponent, UpdatecarnumberComponent, OrderCancelSendComponent]
})
export class LogistcimyorderModule { }
