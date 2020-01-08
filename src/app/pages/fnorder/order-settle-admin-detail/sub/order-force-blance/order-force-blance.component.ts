import {Component, Inject, OnInit} from '@angular/core';
import {AdminOrderChargeSettleService} from '../../../../../services/fnorder/admin-order-charge-settle.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TmsresponseStatusCode} from '../../../../../models/tms-response.module';
import {el} from 'date-fns/locale';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-force-blance',
  templateUrl: './order-force-blance.component.html',
  styleUrls: ['./order-force-blance.component.css'],
  providers: [NgbAlertConfig]
})
export class OrderForceBlanceComponent implements OnInit {


  message: string;
  stopbtn = false;
  displayforcebtn = false;

  constructor(
              private adminOrderChargeSettleService: AdminOrderChargeSettleService,
              public dialogRef: MatDialogRef<OrderForceBlanceComponent>,
              @Inject(MAT_DIALOG_DATA) public SettleId: string) { }

  ngOnInit() {

    this.processorder(false);
  }


  processorder(force: boolean) {


    this.message = '处理中';

    this.stopbtn = true;

    setTimeout(() => {
      this.adminOrderChargeSettleService.ForceFinishAmt(this.SettleId, force)
        .subscribe(a => {

          this.stopbtn = false;
          if (a.StatusCode !== TmsresponseStatusCode.Succeed()) {

            if (a.Error.Code === 'force') {
              this.displayforcebtn = true;
              this.message = a.Error.ErrorMsg;
            } else {
              this.dialogRef.close(a);
            }
          } else {
            this.dialogRef.close(a);
          }
        });
    }, 500);
  }

  forceamt() {
    this.processorder(true);
  }
}
