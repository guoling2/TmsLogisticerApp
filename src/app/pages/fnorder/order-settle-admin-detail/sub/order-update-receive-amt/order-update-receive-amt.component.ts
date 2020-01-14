import {Component, Inject, Input, OnInit} from '@angular/core';
import {AdminOrderChargeSettleService} from '../../../../../services/fnorder/admin-order-charge-settle.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IAddInvoiceRequest} from '../../../../fncharge/admin-listview/sub/add-invoice-profile/iadd-invoice-request';

@Component({
  selector: 'app-order-update-receive-amt',
  templateUrl: './order-update-receive-amt.component.html',
  styleUrls: ['./order-update-receive-amt.component.css']
})
export class OrderUpdateReceiveAmtComponent implements OnInit {
  errormsg = '';

  inputamt: number;

  constructor(private adminOrderChargeSettleService: AdminOrderChargeSettleService,
              public dialogRef: MatDialogRef<OrderUpdateReceiveAmtComponent>,
              @Inject(MAT_DIALOG_DATA) public SettleId: string) { }

  ngOnInit() {

  }

  UpdateReceiveAmt() {


    console.log(this.inputamt);

    this.adminOrderChargeSettleService.UpdateReceiveAmt(this.SettleId, this.inputamt)
      .subscribe(a => {

        this.dialogRef.close(a);
      });

  }
}
