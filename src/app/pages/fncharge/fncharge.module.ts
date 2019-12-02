import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewChargeComponent } from './user-new-charge/new-charge.component';
import { ListviewComponent } from './user-listview/listview.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonbizmoduleModule} from '../common/commonbizmodule.module';
import {LogistictoreModule} from "../../buinesscomponent/logistore/logistictore.module";
import {BasedataModule} from '../../buinesscomponent/base/basedata.module';
import {BizBaseModuleModule} from '../base/bizbase.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UpdatechargeComponent } from './user-update-charge/updatecharge.component';
import { UserchargeComponent } from './sub/usercharge/usercharge.component';
import { AdminListViewComponent } from './admin-listview/admin-list-view.component';
import { AcceptNodeDataGridComponent } from './admin-listview/sub/accept-node-data-grid/accept-node-data-grid.component';
import { OpeninvoicedatagridComponent } from './admin-listview/sub/openinvoicedatagrid/openinvoicedatagrid.component';




const routes: Routes = [
  {
    path: 'newCharge',
    component: NewChargeComponent
  },
  {
    path: 'user-detail/:id',
    component: UserDetailComponent
  },
  {
    path: 'user-edit/:id',
    component: UpdatechargeComponent
  },
  {
    path: 'listview',
    component: ListviewComponent
  },
  {
    path: 'admin-list',
    component: AdminListViewComponent
  },
];


@NgModule({
  declarations: [NewChargeComponent, ListviewComponent, UserDetailComponent, UpdatechargeComponent, UserchargeComponent, AdminListViewComponent, AcceptNodeDataGridComponent, OpeninvoicedatagridComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonbizmoduleModule,
    LogistictoreModule,
    BasedataModule,
    BizBaseModuleModule,
    RouterModule.forChild(routes),
  ]
})
export class FnchargeModule { }
