import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderChargeSettleExcelService} from '../../../../../services/fnorder/order-charge-settle-excel.service';
import {OrderChargeExcelAnalysisRequest} from '../../../../../models/fnorder/order-charge-excel-analysis-request';
import {TmsresponseStatusCode} from '../../../../../models/tms-response.module';
import {OrderChargeExcelAnalysisModel} from '../../../../../models/fnorder/order-charge-excel-analysis-model';
import {ProcessStatued} from '../../../../../models/process-statued.enum';
import {doubleTap, EditService, GridComponent} from '@syncfusion/ej2-angular-grids';
import {ReturnType} from '@syncfusion/ej2-grids/src/grid/base/type';
import {filter} from 'rxjs/operators';
import {EmitService} from '../../../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, EmitAlertMessageHelo, MessageShowType} from '../../../../../help/emit-alert-message';
import {OnItemAttchSucceedEventArg} from '../../../on-item-attch-succeed-event-arg';
import {OrderChargeSettleService} from '../../../../../services/fnorder/order-charge-settle.service';
import {Commonsetting} from '../../../../../help/commonsetting';

@Component({
  selector: 'app-order-excel-analysis',
  templateUrl: './order-excel-analysis.component.html',
  styleUrls: ['./order-excel-analysis.component.css'],
  providers: [EditService]
})
export class OrderExcelAnalysisComponent implements OnInit {
  gridheight: number;
  public orderChargeExcelAnalysisRequestForm: FormGroup;

  public selectfile: File;

  public  analysisdatasource: OrderChargeExcelAnalysisModel[];

  public displayedColumns: string[] = ['ExcelOrderId'];

  public uploadinfo: string;

  public processstatued: ProcessStatued = ProcessStatued.Pending; // 处理的类型

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  public totalrecord: number;

  @Output('onItemAttchSucceed') onItemAttchSucceedEvent: EventEmitter<OnItemAttchSucceedEventArg> = new EventEmitter();

  @Output('onAttchFinished') onAttchFinished: EventEmitter<number> = new EventEmitter();

  @Input('SettleId') SettleId: string;

  constructor(private orderChargeSettleService: OrderChargeSettleService, private emitService: EmitService, private fb: FormBuilder, private orderChargeSettleExcelService: OrderChargeSettleExcelService) { }



  ngOnInit() {

 //   this.onItemAttchSucceedEvent = new EventEmitter<OnItemAttchSucceedEventArg>();
    this.gridheight = Commonsetting.GridHeightshort3();
    this.orderChargeExcelAnalysisRequestForm = this.fb.group({
      AnalysisModel: ['', Validators.required]
    });
  }


  onFileSelect2($event: any ) {

    console.log($event.target.files);
    // this.selectfile = $event.files[0] as File;
    // console.log($event);
    this.selectfile = $event.target.files[0] as File;

    document.getElementById('uploadname').setAttribute('value', this.selectfile.name);
  }

  browseClick() {

    document.getElementById('fileInput').click(); return false;
    // console.log(x);
    // document.getElementById('fileInput').querySelector('button').click(); return false;
    // document.getElementById('fileInput').querySelector('button').click(); return false;
  }

  uploadfile() {

    if (this.orderChargeExcelAnalysisRequestForm.valid === false) {

      alert('错误');
      return;
    }

    const  x = this.orderChargeExcelAnalysisRequestForm.getRawValue() as OrderChargeExcelAnalysisRequest;

    x.ExcelFile = this.selectfile;

    this.processstatued = ProcessStatued.Processing;

    this.uploadinfo = '正在上传文件，并解析数据。。。。。';

    this.orderChargeSettleExcelService.Analysis(x).subscribe(a => {

      this.processstatued = ProcessStatued.Finish;

      if (a.StatusCode === TmsresponseStatusCode.Succeed()) {

         this.analysisdatasource = a.Data as OrderChargeExcelAnalysisModel[];
         this.totalrecord = this.analysisdatasource.length ;
        // console.log(dataresult);
       }
     // console.log(a);
    });

  }

  attchfile() {

    this.processstatued = ProcessStatued.Processing;


    const  indexx = this.analysisdatasource.findIndex(A => A.HasError === false);

    if (indexx === -1) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '没有可以处理的数据', MessageShowType.Toast));
      return;
    }

    for (let i = 0; i < this.analysisdatasource.length; i++) {

      const data = this.analysisdatasource[i];

      setTimeout(() => {

        if (data.HasError) {
        //  this.uploadinfo = '已处理' + (i + 1) + '/' + this.totalrecord + '条数据';
          return;
        }


        this.orderChargeSettleService.AttchFee({
          OrderLogisticDetailFeeId: data.OrderLogisticDetailFeeId,
          SettleId: this.SettleId
        }).subscribe(a => {
          this.uploadinfo = '已处理' + (i + 1) + '/' + this.totalrecord + '条数据';

          if (a.StatusCode === TmsresponseStatusCode.Succeed()) {

            this.onItemAttchSucceedEvent.emit({
              OrderLogisticDetailFeeId: data.OrderLogisticDetailFeeId,
              ItemFee: data.SystemAmt
            });
            this.grid.deleteRecord('OrderLogisticDetailFeeId', data.OrderLogisticDetailFeeId);
          } else {
            data.ErrorMsg = a.Error.ErrorMsg;
            data.HasError = true;
          }

          if (i === this.totalrecord - 1) {
            this.uploadinfo = '';
            this.processstatued = ProcessStatued.Finish;
            this.onAttchFinished.emit(this.totalrecord);
          }
        });

      }, 300 * i, i, this.totalrecord, data);
    }



  }
  attchfiledemo() {

    this.processstatued = ProcessStatued.Processing;


    const  indexx = this.analysisdatasource.findIndex(A => A.HasError === false);

    if (indexx === -1) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '没有可以处理的数据', MessageShowType.Toast));
      return;
     }
    for (let i = 0; i < this.analysisdatasource.length; i++) {

      const data = this.analysisdatasource[i];

      setTimeout(() => {

        this.uploadinfo = '已处理' + (i + 1) + '/' + this.totalrecord + '条数据';


        try {
          if (i % 5 === 0) {
            data.ErrorMsg = '异常';
            data.HasError = true;
          } else {

            data.HasError = false;
          }
        } catch (e) {
          console.log(data);
          console.log(data);
          console.log(e);
        }


        if (data.HasError === false) {

          this.onItemAttchSucceedEvent.emit({
            OrderLogisticDetailFeeId: data.OrderLogisticDetailFeeId,
            ItemFee: data.SystemAmt
          });
          this.grid.deleteRecord('OrderLogisticDetailFeeId', data.OrderLogisticDetailFeeId);
        }

        if (i === this.totalrecord - 1) {
          this.uploadinfo = '';
          this.processstatued = ProcessStatued.Finish;
          this.onAttchFinished.emit(this.totalrecord);
         }
      }, 300 * i, i, this.totalrecord, data);
    }
  }

  changed($event: any) {

  }
}
