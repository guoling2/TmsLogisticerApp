import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {Basereportservice} from '../../../services/base/basereportservice';
import {OrderChargeSettleService} from '../../../services/fnorder/order-charge-settle.service';
import {EmitService} from '../../../help/emit-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FnChargeStatus} from '../../../models/fn-charge-status.enum';
import {FinanceReport} from '../../../services/base/basereportconfig';
import {OrderChargeSettleUserModel} from '../../../models/fnorder/order-charge-settle-user-model';
import { PopupSettingsModel } from '@syncfusion/ej2-inplace-editor/src/inplace-editor/base/models-model';
import {ChangeEventArgs, TextBoxModel} from '@syncfusion/ej2-inputs';
import { InPlaceEditor, ActionEventArgs, MultiSelect } from '@syncfusion/ej2-inplace-editor';
import {TooltipModel} from '@syncfusion/ej2-popups';
import {publish} from 'rxjs/operators';
import {AdminOrderChargeSettleService} from '../../../services/fnorder/admin-order-charge-settle.service';
import {AlertMessageType, EmitAlertMessage, EmitAlertMessageHelo, MessageShowType} from '../../../help/emit-alert-message';
import {OrderChargeSettleNoApplayListComponent} from '../order-charge-settle-no-applay-list/order-charge-settle-no-applay-list.component';
import {OrderUpdateReceiveAmtComponent} from './sub/order-update-receive-amt/order-update-receive-amt.component';
import {OrderForceBlanceComponent} from './sub/order-force-blance/order-force-blance.component';
@Component({
  selector: 'app-order-settle-admin-detail',
  templateUrl: './order-settle-admin-detail.component.html',
  styleUrls: ['./order-settle-admin-detail.component.css']
})
export class OrderSettleAdminDetailComponent implements OnInit {





  public settings: PopupSettingsModel = {
    title: '财务设置',
  };
  public overviewModel: TextBoxModel = {
    placeholder: '输入财务凭证编号',
  };


model: OrderChargeSettleUserModel;

constructor(
               private adminOrderChargeSettleService: AdminOrderChargeSettleService,
               private orderChargeSettleService: OrderChargeSettleService,
               private dialog: MatDialog,
               private fb: FormBuilder,
               private emitService: EmitService,
               private router: Router,
               private route: ActivatedRoute) { }

ngOnInit() {

    const orderId = this.route.snapshot.paramMap.get('id');

    this.reloaddata();
  }

  private  reloaddata() {
    const orderId = this.route.snapshot.paramMap.get('id');
    // searchable.pageindex = pagesetting.currentPage - 1;
    // searchable.pagesize = pagesetting.pageSize;
    this.orderChargeSettleService.Detail(orderId).subscribe(a => {
      this.model = a;

    });

  }

  fiancenumchange($event: Event) {
     console.log($event);
  }

  xactionOnBlur($event: any) {

  }

  actionSuccess($event: ActionEventArgs) {

  console.log($event);

  this.adminOrderChargeSettleService.MotifyFianceNo(this.model.SettleId, $event.value)
     .subscribe(a => {
       EmitAlertMessageHelo.ShowMessage( this.emitService, a, MessageShowType.Toast);
     });

  }

  receiveamt() {

    this.dialog.open(OrderUpdateReceiveAmtComponent, {
      disableClose: true, data: this.model.SettleId}).afterClosed().subscribe(
      (a => {
          EmitAlertMessageHelo.ShowMessage( this.emitService, a, MessageShowType.Toast);
        }
      ));

  }

  forceamt() {
    this.dialog.open(OrderForceBlanceComponent, {
      disableClose: true, data: this.model.SettleId}).afterClosed().subscribe(
      (a => {
          EmitAlertMessageHelo.ShowMessage( this.emitService, a, MessageShowType.Toast);
        }
      ));
  }
}
