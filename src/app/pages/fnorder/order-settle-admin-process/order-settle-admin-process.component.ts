import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FnAdminOrderService} from '../bizdirective/fn-admin-order.service';
import {OrderEventArg} from '../bizdirective/order-event-arg';
import {ProcessStatued} from '../../../models/process-statued.enum';
import {OrderProcessRequest} from '../order-process-request';
import {EmitService} from '../../../help/emit-service';
import {EmitAlertMessageHelo, MessageShowType} from '../../../help/emit-alert-message';
import {TmsResponseModle, TmsresponseStatusCode} from '../../../models/tms-response.module';
import {AdminOrderChargeSettleService} from '../../../services/fnorder/admin-order-charge-settle.service';
import {Observable} from 'rxjs';
import {OrderAction} from '../order-action';

@Component({
  selector: 'app-order-settle-admin-process',
  templateUrl: './order-settle-admin-process.component.html',
  styleUrls: ['./order-settle-admin-process.component.css']
})
export class OrderSettleAdminProcessComponent implements OnInit {

  public processstatued: ProcessStatued; // 处理的类型

  public currentIndex = 0; // 当前处理的进去

  public ErrorMsg = '';


  constructor(
    private adminOrderChargeSettleService: AdminOrderChargeSettleService,
    public dialogRef: MatDialogRef<OrderSettleAdminProcessComponent>,
    @Inject(MAT_DIALOG_DATA)public processrequest: OrderProcessRequest) { }

  ngOnInit() {

    this.processstatued = ProcessStatued.Pending;


  }


  public  processdatatest() {

    this.processstatued = ProcessStatued.Processing;

    // let process = 1;
    for (let i = 0; i < this.processrequest.SettleIds.length; i++) {


      setTimeout(() => {

        this.currentIndex += 1;

        if (i % 4 === 0) {
          this.ErrorMsg = '随机错误';
        }

        console.log(this.currentIndex);
        //
        // console.log(processdata);
        //
        // EmitAlertMessageHelo.ShowMessageWithReplaceMsg(
        //   this.emitService, new TmsResponseModle(0, '1', null), '结算单创建成功', '结算单创建失败', MessageShowType.Toast);
        if (i === this.processrequest.SettleIds.length - 1 ) {
          this.processstatued = ProcessStatued.Finish;
        }
      }, 1000 * i, i, this.processrequest);
    }
  }

  processdata() {
    this.processstatued = ProcessStatued.Processing;

    // let process = 1;
    for (let i = 0; i < this.processrequest.SettleIds.length; i++) {

      setTimeout(() => {

        const processdata = this.processrequest.SettleIds[i]; // 当前处理的数据

        this.processdata2(processdata, this.processrequest.OrderAction)
          .subscribe(a => {

            this.currentIndex ++;

            if (a.StatusCode !== TmsresponseStatusCode.Succeed()) {

              this.ErrorMsg = a.Error.ErrorMsg;
            }
            console.log(this.currentIndex);
            console.log(this.processrequest.SettleIds.length);
            if (i === this.processrequest.SettleIds.length - 1 ) {
              this.processstatued = ProcessStatued.Finish;
            }
          });
      }, 1000 * i, i, this.processrequest);
    }
  }


  processdata2(settleId: string, action: string): Observable<TmsResponseModle> {

    let response;

   // alert(action);

    switch (action) {

      case OrderAction.Accepet:
        response = this.orderaccept(settleId);
        break;
      case OrderAction.Invoiceed:
        response = this.finishinvoice(settleId);
        break;
      case OrderAction.Settled:
        response = this.finish(settleId);
        break;
    }

    return response;
  }

  orderaccept(settleId: string): Observable<TmsResponseModle> {

   return  this.adminOrderChargeSettleService.Accept(settleId);
  }
  finishinvoice(settleId: string): Observable<TmsResponseModle> {

    return  this.adminOrderChargeSettleService.FinishInvoice(settleId);
  }

  finish(settleId: string): Observable<TmsResponseModle> {

    return  this.adminOrderChargeSettleService.Finish(settleId);
  }
}
