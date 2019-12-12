import {Component, Inject, OnInit} from '@angular/core';
import {EnterpriseOrderServiceService} from '../../../../../services/CustomerOrder/enterprise-order-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CancelSendOrderRequest, Unacceptorderrequest} from '../order-unaccept/unacceptorderrequest';
import {TmsresponseStatusCode} from '../../../../../models/tms-response.module';

@Component({
  selector: 'app-order-cancel-send',
  templateUrl: './order-cancel-send.component.html',
  styleUrls: ['./order-cancel-send.component.css']
})
export class OrderCancelSendComponent implements OnInit {


  InputCancelReason: string;

  errormsg = '';

  constructor(private enterpriseOrderServiceService: EnterpriseOrderServiceService,
              public dialogRef: MatDialogRef<OrderCancelSendComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CancelSendOrderRequest) { }

  ngOnInit() {
  }

  save() {


    this.data.CancelReason = this.InputCancelReason;

    this.enterpriseOrderServiceService.CancelSend(this.data).subscribe(a => {

      if (a.StatusCode !== TmsresponseStatusCode.Succeed()) {

        this.errormsg = a.Error.ErrorMsg;

      } else {
        this.dialogRef.close(a);
      }

    });

  }
}
