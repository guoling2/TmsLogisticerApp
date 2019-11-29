import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LogisticStore} from '../../../../../models/LogisticStore/logistic-store';
import {LogisticStoreServiceService} from '../../../../../services/logisticstore/logisticstoreservice';
import {EnterpriseOrderServiceService} from '../../../../../services/CustomerOrder/enterprise-order-service.service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../../help/emit-alert-message';
import {DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import {TmsresponseStatusCode} from '../../../../../models/tms-response.module';
import {TextBoxComponent} from '@syncfusion/ej2-angular-inputs';
import {DateTimePickerComponent} from 'ej-angular2';
import {DateTimePicker} from '@syncfusion/ej2-calendars';
import format from 'date-fns/format';
@Component({
  selector: 'app-order-accept',
  templateUrl: './order-accept.component.html',
  styleUrls: ['./order-accept.component.css']
})
export class OrderAcceptComponent implements OnInit {
  ErrorMsg: string;
  logistticstores: LogisticStore[];
  public logisticstorefiled: Object = { text: 'StoreName', value: 'StoreId' };

  @ViewChild('sample', {static: false})  public listObj: DropDownListComponent;

  @ViewChild('tihuonumbertxt', {static: false}) public tihuonumbertxt: TextBoxComponent;

  @ViewChild('submitdatetime', {static: false}) public submitdatetime: DateTimePicker;

  public PlanCarTime: Date;

  constructor(private enterpriseOrderServiceService: EnterpriseOrderServiceService,
              public dialogRef: MatDialogRef<OrderAcceptComponent>,
              private logisticStoreServiceService: LogisticStoreServiceService,
              @Inject(MAT_DIALOG_DATA) public selectrows: Object[]) { }

  ngOnInit() {

    //this.PlanCarTime=new Date();

    this.logisticStoreServiceService.StoreQuery().subscribe((value: LogisticStore[]) => {
      this.logistticstores = value;
    });
  }

  SaveData($event: MouseEvent) {



   // console.log(this.listObj.value);

   // alert(this.submitdatetime.value);

   // console.log(this.submitdatetime.value);

    let cartime='';
   // alert(this.PlanCarTime);

     if(this.PlanCarTime!==undefined){
       cartime= format(this.PlanCarTime, 'yyyy-MM-dd HH:mm:ss');
     }
    this.selectrows.forEach((a, index) => {
      this.enterpriseOrderServiceService.AcceptOrder({
        OrderPreparedLogisticId: a['OrderPreparedLogisticId'],
        PlanCarTime:cartime,
        BeginLogisticStoreId: this.listObj.value === null ? '' : this.listObj.value.toString(),
        NotifyCarNumber: this.tihuonumbertxt.value

      }).subscribe(result => {

        if (result.StatusCode !== TmsresponseStatusCode.Succeed()) {
            this.ErrorMsg = result.Error.ErrorMsg;
        } else {

          if (index ===  this.selectrows.length - 1) {
            this.dialogRef.close(true);
          }
        }

        //
        // if()
        // this.emitService.eventEmit.emit(
        //   new EmitAlertMessage(AlertMessageType.Info,
        //     '系统信息', result.Info, MessageShowType.Toast));


      });
    });
  }

  close() {
    this.dialogRef.close();

  }
}
