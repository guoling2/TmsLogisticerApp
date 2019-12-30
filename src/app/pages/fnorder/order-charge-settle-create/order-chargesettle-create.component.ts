import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EmitService} from '../../../help/emit-service';
import {DailyChargeSettleService} from '../../../services/fncharge/daily-charge-settle.service';
import {LogisticStoreServiceService} from '../../../services/logisticstore/logisticstoreservice';
import {CustomerTaxModel} from '../../../models/base/customer-tax-model';
import {OrderChargeSettleService} from '../../../services/fnorder/order-charge-settle.service';
import {Formextension} from '../../../help/formextension';
import {DailyChargeSettleRequest} from '../../../models/fncharge/daily-charge-settle-request';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';
import {OrderChargeSettleRequestModel} from '../../../models/fnorder/order-charge-settle-request-model';

@Component({
  selector: 'app-order-chargesettle-create',
  templateUrl: './order-chargesettle-create.component.html',
  styleUrls: ['./order-chargesettle-create.component.css']
})
export class OrderChargesettleCreateComponent implements OnInit {

  public errormsg = '';

  public form: FormGroup;
  constructor(
              private orderChargeSettleService: OrderChargeSettleService,
              private router: Router,
              private emitService: EmitService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<OrderChargesettleCreateComponent>) { }

  ngOnInit() {

    this.form = this.fb.group({
      Settleorg: ['', Validators.required],
      Paymentmode: ['', Validators.required],
      IsOpenInvoice: false,
      Invoiceparty: '',  // 受票方
      Invoicetype: '1',  // 开票类型
      Partytaxno: '',   // 税号
      Taxrate: '',  // 税率
      FnTrxItem: '', // 开票项目
      OpenInvoiceChargeAmt: 0,
      ApplayMark: '',
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
  }

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

  save() {
    if (this.form.valid === false) {

      console.log(this.form.errors);

      alert('有问题')
      Formextension.validateAllFormFields(this.form);
      return;
    }
    const result = this.form.getRawValue() as OrderChargeSettleRequestModel;

    if (result.IsOpenInvoice === false) {
      result.Taxrate = 0; // 不开票需要将数字类型赋值
    }

    this.orderChargeSettleService.Insert(result).subscribe(a => {
       if (a.StatusCode === TmsresponseStatusCode.Succeed()) {
         this.dialogRef.close(a);
       } else {
         this.errormsg = a.Error.ErrorMsg;
       }
     });
  }
}
