import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {QryDailyChargeComponent} from '../fnqueries/qry-daily-charge/qry-daily-charge.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonbizmoduleModule} from '../common/commonbizmodule.module';
import {LogistictoreModule} from '../../buinesscomponent/logistore/logistictore.module';
import {BasedataModule} from '../../buinesscomponent/base/basedata.module';
import {BizBaseModuleModule} from '../base/bizbase.module';
import { BasechargeItemComponent } from './basecharge-item/basecharge-item.component';
import {InvoiceprofileComponent} from './invoiceprofile/invoiceprofile.component';
import { FnTrxItemComponent } from './fn-trx-item/fn-trx-item.component';
import {OpeninvoiceprofileDirective} from './invoiceprofile/dialoginvoiceprofile/openinvoiceprofile.directive';
import {GengerctracknumComponent} from '../base/tracknumber/command/gengerctracknum/gengerctracknum.component';
import {DialoginvoiceprofileComponent} from './invoiceprofile/dialoginvoiceprofile/dialoginvoiceprofile.component';
import {TrackNumberManagerComponent} from '../base/tracknumber/track-number-manager.component';



const routes: Routes = [
  {
    path: 'baseChargeItem',
    component: BasechargeItemComponent
  },
  {
    path: 'invoiceProfile',
    component: InvoiceprofileComponent
  },
  {
    path: 'fnTrxItem',
    component: FnTrxItemComponent
  }
];


@NgModule({
  declarations: [BasechargeItemComponent, FnTrxItemComponent, InvoiceprofileComponent, DialoginvoiceprofileComponent , OpeninvoiceprofileDirective],
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
  ],
  exports: [
    OpeninvoiceprofileDirective
  ],
  entryComponents: [GengerctracknumComponent, DialoginvoiceprofileComponent]
})
export class FnAccountModule { }
