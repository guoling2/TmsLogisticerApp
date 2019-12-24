import {Component, OnInit, ViewChild} from '@angular/core';
import {EmitService} from '../../../help/emit-service';
import {DailyChargeSettleService} from '../../../services/fncharge/daily-charge-settle.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderChargeSettleService} from '../../../services/fnorder/order-charge-settle.service';
import {OrderChargeSettleUserModel} from '../../../models/fnorder/order-charge-settle-user-model';
import {TmssaveconfirmEvent} from '../../../directive/tmssaveconfirm.directive';
import {Observable} from 'rxjs';
import {TmsResponseModle, TmsresponseStatusCode} from '../../../models/tms-response.module';
import {EmitAlertMessageHelo, MessageShowType} from '../../../help/emit-alert-message';
import {Basereportservice} from '../../../services/base/basereportservice';
import {FinanceReport} from '../../../services/base/basereportconfig';
import {DailyChargeSettleItemModel} from '../../../models/fncharge/daily-charge-settle-detail';
import {UploaderComponent} from '@syncfusion/ej2-angular-inputs';
import {EmitType} from '@syncfusion/ej2-base';
import {SelectedEventArgs} from '@syncfusion/ej2-inputs';
import {FileInfo} from '@syncfusion/ej2-inputs/src/uploader/uploader';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  public selectfile: File;

  public orderChargeExcelAnalysisRequestForm: FormGroup;

  constructor(
            private fb: FormBuilder,
            private service: Basereportservice,
            private orderChargeSettleService: OrderChargeSettleService,
            private emitService: EmitService,
            private router: Router,
            private route: ActivatedRoute) { }

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    // searchable.pageindex = pagesetting.currentPage - 1;
    // searchable.pagesize = pagesetting.pageSize;
    this.orderChargeSettleService.Detail(orderId).subscribe(a => {
        this.model = a;
    });

    this.service.SearchReport(FinanceReport.Report_OrderChargeSettleItemForSettleIdQuery,
      {SettleId: orderId, PageIndex: 0, PageSize: 100000})
      .subscribe(a => {

        this.datasource = a.result;
      });

    this.orderChargeExcelAnalysisRequestForm = this.fb.group({
      AnalysisModel: ['', Validators.required],
      ExcelFile: '',
    });
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
            //  this.ReloadData();
              break;
          }
        }
      });
    }
  }

  private DelData(): Observable<TmsResponseModle> {

    return  this.orderChargeSettleService.Delete(this.model.SettleId);
  }


  onFileSelect2($event: any ) {

    console.log($event.target.files);
     // this.selectfile = $event.files[0] as File;
     // console.log($event);
    this.selectfile = $event.target.files[0] as File;
    document.getElementById('uploadname').setAttribute('value', this.selectfile.name);
  }
  // public onFileSelect: EmitType<Object> = (args: any) => {
  //   this.uploadInput = args.filesData[0].name;
  //   this.selectfile = args.filesData[0].rawFile;
  // };
  browseClick() {

    document.getElementById('fileInput').click(); return false;
    // console.log(x);
   // document.getElementById('fileInput').querySelector('button').click(); return false;
   // document.getElementById('fileInput').querySelector('button').click(); return false;
  }

  uploadfile() {

     console.log(this.orderChargeExcelAnalysisRequestForm.getRawValue());
  }
}
