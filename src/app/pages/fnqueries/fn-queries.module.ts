import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QryDailyChargeComponent } from './qry-daily-charge/qry-daily-charge.component';
import {RouterModule, Routes} from '@angular/router';
import {NewChargeComponent} from '../fncharge/user-new-charge/new-charge.component';
import {UserDetailComponent} from '../fncharge/user-detail/user-detail.component';
import {UpdatechargeComponent} from '../fncharge/user-update-charge/updatecharge.component';
import {ListviewComponent} from '../fncharge/user-listview/listview.component';
import {AdminListViewComponent} from '../fncharge/admin-listview/admin-list-view.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonbizmoduleModule} from '../common/commonbizmodule.module';
import {LogistictoreModule} from '../../buinesscomponent/logistore/logistictore.module';
import {BasedataModule} from '../../buinesscomponent/base/basedata.module';
import {BizBaseModuleModule} from '../base/bizbase.module';



const routes: Routes = [
  {
    path: 'QryDailyCharge',
    component: QryDailyChargeComponent
  }
];


@NgModule({
  declarations: [QryDailyChargeComponent],
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
export class FnQueriesModule { }
