import {Component, OnInit, ViewChild} from '@angular/core';
import {EmitService} from '../../../help/emit-service';
import {DailyChargeSettleService} from '../../../services/fncharge/daily-charge-settle.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderChargeSettleService} from '../../../services/fnorder/order-charge-settle.service';
import {OrderChargeSettleUserModel} from '../../../models/fnorder/order-charge-settle-user-model';
import {TmssaveconfirmEvent} from '../../../directive/tmssaveconfirm.directive';
import {Observable} from 'rxjs';
import {TmsResponseModle, TmsresponseStatusCode} from '../../../models/tms-response.module';
import {AlertMessageType, EmitAlertMessage, EmitAlertMessageHelo, MessageShowType} from '../../../help/emit-alert-message';
import {Basereportservice} from '../../../services/base/basereportservice';
import {FinanceReport} from '../../../services/base/basereportconfig';
import {DailyChargeSettleItemModel} from '../../../models/fncharge/daily-charge-settle-detail';
import {UploaderComponent} from '@syncfusion/ej2-angular-inputs';
import {EmitType} from '@syncfusion/ej2-base';
import {SelectedEventArgs} from '@syncfusion/ej2-inputs';
import {FileInfo} from '@syncfusion/ej2-inputs/src/uploader/uploader';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnItemAttchSucceedEventArg} from '../on-item-attch-succeed-event-arg';
import {OrderchangerouteComponent} from '../../myorder/_sub/orderchangeroute/orderchangeroute.component';
import {MatDialog} from '@angular/material';
import {OrderChargePrintComponent} from '../order-charge-print/order-charge-print.component';
import {FnChargeStatus} from '../../../models/fn-charge-status.enum';

@Component({
  selector: 'app-order-settle-user-detail',
  templateUrl: './order-settle-user-detail.component.html',
  styleUrls: ['./order-settle-user-detail.component.css']
})
export class OrderSettleUserDetailComponent implements OnInit {

  model: OrderChargeSettleUserModel;

  datasource: object[] = [];

  // 'FinishAmt', 'NoFinishAmt', 'RealAmt',
  displayedColumns = [
    'Action', 'OrderTrackServerId', 'Origincustomname', 'DesctcustomName',
    'OriginCity', 'DestCity', 'Chargetype', 'Chargeitem',
     'Innertype', 'Direction', 'ApplayAmt', 'FeeHappendTime'];

  @ViewChild('defaultupload', {static: false})
  public uploadObj: UploaderComponent;

  public useractionflag = true; //可以操作


  constructor(
            private dialog: MatDialog,
            private fb: FormBuilder,
            private service: Basereportservice,
            private orderChargeSettleService: OrderChargeSettleService,
            private emitService: EmitService,
            private router: Router,
            private route: ActivatedRoute) { }

  ngOnInit() {


    this.reloaddata();
  }

  bizclick(action: TmssaveconfirmEvent) {
    if (action.ActionFlag === false) {
      return;
    }
    let result: Observable<TmsResponseModle>;
    switch (action.ExtendData.toString()) {
      case 'del':
        result = this.DelData();
        break;
      case 'submit':
        result = this.SubmitDate();
        break;
      case  'refresh':
        break;
      case 'edit':
      //  this.router.navigateByUrl('/biz/fncharge/user-edit/' + this.dailycharge.SettleId);
        break;
    }
    if (result !== undefined) {

      result.subscribe(a => {

        EmitAlertMessageHelo.ShowMessage(this.emitService, a, MessageShowType.Toast);

        if (a.StatusCode === TmsresponseStatusCode.Succeed()) {

          switch (action.ExtendData.toString()) {
            case 'del':
              this.router.navigateByUrl('/biz/fn-order/order-trans-list');
              break;
            case 'submit':
              this.reloaddata();
              break;
          }
        }
      });
    }
  }

  private  SubmitDate(): Observable<TmsResponseModle> {

    return  this.orderChargeSettleService.Submit(this.model.SettleId);
  }
  private DelData(): Observable<TmsResponseModle> {

    return  this.orderChargeSettleService.Delete(this.model.SettleId);
  }

  /**
   * 打印应收结算单
   */
  printfnbill() {
    const dialogRef = this.dialog.open(OrderChargePrintComponent, {
      disableClose: true,
      data: this.model.SettleId
    });

  }
  attchsucceed($event: OnItemAttchSucceedEventArg) {

    console.log($event);
    this.model.ChargeAmt += $event.ItemFee;

  }

  attchfinished() {

    this.emitService.eventEmit.emit(
      new EmitAlertMessage(AlertMessageType.Succeed, '系统信息', '附加完成', MessageShowType.Toast));

    this.reloaddata();
  }

  private  reloaddata() {
    const orderId = this.route.snapshot.paramMap.get('id');
    // searchable.pageindex = pagesetting.currentPage - 1;
    // searchable.pagesize = pagesetting.pageSize;
    this.orderChargeSettleService.Detail(orderId).subscribe(a => {
      this.model = a;

      if (a.ProcessStatued !== FnChargeStatus.Insert) {
        this.useractionflag = false;
      }
    });

    this.service.SearchReport(FinanceReport.Report_OrderChargeSettleItemForSettleIdQuery,
      {SettleId: orderId, PageIndex: 0, PageSize: 100000})
      .subscribe(a => {

        this.datasource = a.result;
      });
  }
  // 移除
  itemdel($event: TmssaveconfirmEvent) {

    if ($event.ActionFlag === false) {
      return;
    }
    this.orderChargeSettleService.RemoveAttchFee(this.model.SettleId, $event.ExtendData.toString())
      .subscribe(a => {
        EmitAlertMessageHelo.ShowMessage( this.emitService, a, MessageShowType.Toast);
        this.reloaddata();
      });

    // this.orderChargeSettleService.D
  }
}
