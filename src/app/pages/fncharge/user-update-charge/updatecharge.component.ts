import {Component, OnInit, ViewChild} from '@angular/core';
import {EmitService} from '../../../help/emit-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserchargeComponent} from '../sub/usercharge/usercharge.component';
import {DailyChargeSettleService} from '../../../services/fncharge/daily-charge-settle.service';
import {CustomerTaxModel} from '../../../models/base/customer-tax-model';
import {Formextension} from '../../../help/formextension';
import {DailyChargeSettleRequest} from '../../../models/fncharge/daily-charge-settle-request';
import {EmitAlertMessageHelo, MessageShowType} from '../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';
import {DailyChargeSettleDetail} from '../../../models/fncharge/daily-charge-settle-detail';

@Component({
  selector: 'app-updatecharge',
  templateUrl: './updatecharge.component.html',
  styleUrls: ['./updatecharge.component.css']
})
export class UpdatechargeComponent implements OnInit {


  public form: FormGroup;

  getsystemprofile($event: any) {


    const taxmodel = $event as CustomerTaxModel;
    if (taxmodel != null) {
      this.form.controls.Invoiceparty.setValue(taxmodel.Invoicetitle);
      // this.form.controls.Invoicetype.setValidators(Validators.required);
      this.form.controls.Partytaxno.setValue(taxmodel.Taxno);
      // this.form.controls.Taxrate.setValidators(Validators.required);
      // this.form.controls.FnTrxItem.setValidators(Validators.required);
    }

  }

  public  LoadCompliate:boolean=false;

  constructor(private fb: FormBuilder,private emitService: EmitService,private dailyChargeSettleService:DailyChargeSettleService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    const orderId = this.route.snapshot.paramMap.get('id');


    this.dailyChargeSettleService.Detail(orderId).subscribe(a=>{

      this.LoadCompliate=true;

      this.form = this.fb.group({
        SettleId: a.SettleId,
        Settleorg: [a.Settleorg, Validators.required],
        Chargeparty: [a.Chargeparty, Validators.required],
        ChargeItem: [a.ChargeItem, Validators.required],
        ChargeAmt: a.ChargeAmt,
        Chargedirection: [ a.Chargedirection.toString(), Validators.required],
        CaclType:a.CaclType,
        PayMoneyType: a.PayMoneyType,
        IsOpenInvoice: a.IsOpenInvoice,
        Invoiceparty: a.Invoiceparty,  // 受票方
        Invoicetype: a.Invoicetype.toString(),  // 开票类型
        Partytaxno:  a.Partytaxno,   // 税号
        Taxrate: a.Taxrate.toString(),  // 税率
        FnTrxItem: a.FnTrxItem, // 开票项目s
      });

      this.form.get('IsOpenInvoice').valueChanges.subscribe(($event) => {


        if ($event === true) {

          this.form.controls.Invoiceparty.setValidators(Validators.required);
          this.form.controls.Invoicetype.setValidators(Validators.required);
          this.form.controls.Partytaxno.setValidators(Validators.required);
          this.form.controls.Taxrate.setValidators(Validators.required);
          this.form.controls.FnTrxItem.setValidators(Validators.required);
        } else {


          this.form.controls.Invoiceparty.clearValidators();

          this.form.controls.Invoicetype.clearValidators();
          this.form.controls.Partytaxno.clearValidators();
          this.form.controls.Taxrate.clearValidators();
          this.form.controls.FnTrxItem.clearValidators();

          this.form.updateValueAndValidity();
        }
      });
    })
  }

  savedata() {

    if (this.form.valid === false) {

      //  alert('有错误');
      console.log(this.form);
      Formextension.validateAllFormFields(this.form);
      return;
    }

    const result = this.form.getRawValue() as DailyChargeSettleDetail;

    if (result.IsOpenInvoice === false) {
      result.Taxrate = 0; // 不开票需要将数字类型赋值
    }

    this.dailyChargeSettleService.Update(result).subscribe(a => {
      EmitAlertMessageHelo.ShowMessage(this.emitService, a, MessageShowType.Toast);

      if (a.StatusCode === TmsresponseStatusCode.Succeed()) {
        this.router.navigateByUrl('/biz/fncharge/user-detail/' + a.Data.toString());
        // alert('成功')
      }
    });
  }
}
