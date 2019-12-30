import {Component, Inject, OnInit} from '@angular/core';
import {AdminDailyChargeSettleService} from '../../../services/fncharge/admin-daily-charge-settle.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IAddInvoiceRequest} from '../../fncharge/admin-listview/sub/add-invoice-profile/iadd-invoice-request';
import {Formextension} from '../../../help/formextension';
import {InvoiceRequest} from '../../../models/fncharge/invoice-request';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';
import {FnAdminOrderService} from '../bizdirective/fn-admin-order.service';
import {AdminOrderChargeSettleService} from '../../../services/fnorder/admin-order-charge-settle.service';

@Component({
  selector: 'app-order-add-invoice',
  templateUrl: './order-add-invoice.component.html',
  styleUrls: ['./order-add-invoice.component.css']
})
export class OrderAddInvoiceComponent implements OnInit {

  public form: FormGroup;
  errormsg = '';

  constructor(private adminOrderChargeSettleService: AdminOrderChargeSettleService, private fnAdminOrderService: FnAdminOrderService, private fb: FormBuilder, public dialogRef: MatDialogRef<OrderAddInvoiceComponent>, @Inject(MAT_DIALOG_DATA) public xselect: IAddInvoiceRequest) { }

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

      console.log(a);

      if (a.StatusCode !== TmsresponseStatusCode.Succeed()) {

        this.errormsg = a.Error.ErrorMsg;
      } else {

        this.dialogRef.close(a);
      }
    });

  }
}
