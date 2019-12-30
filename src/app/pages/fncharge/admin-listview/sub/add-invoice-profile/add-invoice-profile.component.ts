import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IAddInvoiceRequest} from './iadd-invoice-request';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminDailyChargeSettleService} from '../../../../../services/fncharge/admin-daily-charge-settle.service';
import {Formextension} from '../../../../../help/formextension';
import {DailyChargeSettleRequest} from '../../../../../models/fncharge/daily-charge-settle-request';
import {InvoiceRequest} from '../../../../../models/fncharge/invoice-request';
import {TmsresponseStatusCode} from '../../../../../models/tms-response.module';
import {AdminOrderChargeSettleService} from '../../../../../services/fnorder/admin-order-charge-settle.service';

@Component({
  selector: 'app-add-invoice-profile',
  templateUrl: './add-invoice-profile.component.html',
  styleUrls: ['./add-invoice-profile.component.css']
})
export class AddInvoiceProfileComponent implements OnInit {

  public form: FormGroup;
  errormsg = '';

  constructor(private adminOrderChargeSettleService: AdminDailyChargeSettleService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddInvoiceProfileComponent>, @Inject(MAT_DIALOG_DATA) public xselect: IAddInvoiceRequest) { }

  ngOnInit() {
    this.form = this.fb.group({
      SettleId: [this.xselect.SettleId, Validators.required],
      Invoicetaxno: ['', Validators.required],
      Invoiceamount: this.xselect.Invoiceamt,
      InvoiceType: '纸质发票'
    });
  }

  openvoice() {


    if (this.form.valid === false) {

      //  alert('有错误');
      console.log(this.form);
      Formextension.validateAllFormFields(this.form);
      return;
    }
    const result = this.form.getRawValue() as InvoiceRequest;

    this.adminOrderChargeSettleService.OpenInvoice(result).subscribe(a => {

      if (a.StatusCode !== TmsresponseStatusCode.Succeed()) {

        this.errormsg = a.Error.ErrorMsg;
      } else {

        this.dialogRef.close(a);
      }
    });

  }
}
