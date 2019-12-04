import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LogisticStore} from '../../../models/LogisticStore/logistic-store';
import {LogisticStoreServiceService} from '../../../services/logisticstore/logisticstoreservice';
import {Formextension} from '../../../help/formextension';
import {CustomerTaxModel} from '../../../models/base/customer-tax-model';
import {DailyChargeSettleItemService} from '../../../services/fncharge/DailychargesettleItem.service';
import {DailyChargeSettleRequest} from '../../../models/fncharge/daily-charge-settle-request';
import {EmitAlertMessageHelo} from '../../../help/emit-alert-message';
import {EmitService} from '../../../help/emit-service';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';
import {Router} from '@angular/router';
import {UserchargeComponent} from '../sub/usercharge/usercharge.component';

@Component({
  selector: 'app-new-charge',
  templateUrl: './new-charge.component.html',
  styleUrls: ['./new-charge.component.css']
})
export class NewChargeComponent implements OnInit {

  public form: FormGroup;
  public logistticstores: LogisticStore[]|any;


  @ViewChild('userchargeform', {static: false})
  public  userchargeform: UserchargeComponent;


  constructor(private router: Router, public emitService: EmitService,
              private dailyChargeSettleItemService: DailyChargeSettleItemService,
              private logisticStoreServiceService: LogisticStoreServiceService,
              private fb: FormBuilder) { }

  ngOnInit() {

    this.logisticStoreServiceService.StoreQuery().subscribe((value: LogisticStore[]) => {this.logistticstores = value; });

    this.form = this.fb.group({
      SettleId: '系统生成',
      Settleorg: ['', Validators.required],
      Chargeparty: ['', Validators.required],
      ChargeItem: ['', Validators.required],
      ChargeAmt: 0,
      Methodtype: ['', Validators.required],
      Methodcount: 1,
      Chargedirection: ['', Validators.required],
      CaclType: '',
      PayMoneyType: '',
      IsOpenInvoice: false,
      Invoiceparty: '',  // 受票方
      Invoicetype: '1',  // 开票类型
      Partytaxno: '',   // 税号
      Taxrate: '',  // 税率
      FnTrxItem: '' // 开票项目
    });


  }

  savedata() {


    this.userchargeform.savedata();
    // const  control= this.form.controls['Settleorg'];

    // if (this.form.valid === false) {
    //
    // //  alert('有错误');
    //   console.log(this.form);
    //   Formextension.validateAllFormFields(this.form);
    //   return;
    // }
    // const result=<DailyChargeSettleRequest>this.form.getRawValue();
    //
    // if(result.IsOpenInvoice===false){
    //   result.Taxrate=0; //不开票需要将数字类型赋值
    // }
    // this.dailyChargeSettleItemService.Insert(result).subscribe(a=>{
    //   EmitAlertMessageHelo.ShowMessage(this.emitService,a);
    //
    //   if (a.StatusCode==TmsresponseStatusCode.Succeed()){
    //     this.router.navigateByUrl('/biz/fncharge/user-detail/'+a.Data.toString());
    //     //alert('成功')
    //   }
    // });
  }
  //
  // getsystemprofile($event: any) {
  //
  //
  //   const taxmodel = $event as CustomerTaxModel;
  //   if (taxmodel != null) {
  //     this.form.controls.Invoiceparty.setValue(taxmodel.Invoicetitle);
  //     // this.form.controls.Invoicetype.setValidators(Validators.required);
  //     this.form.controls.Partytaxno.setValue(taxmodel.Taxno);
  //     // this.form.controls.Taxrate.setValidators(Validators.required);
  //     // this.form.controls.FnTrxItem.setValidators(Validators.required);
  //   }
  //
  // }
}
