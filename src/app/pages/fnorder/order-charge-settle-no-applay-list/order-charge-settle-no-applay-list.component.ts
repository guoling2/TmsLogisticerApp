import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {OrderChargeSettleService} from '../../../services/fnorder/order-charge-settle.service';
import {Router} from '@angular/router';
import {EmitService} from '../../../help/emit-service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GridComponent, RowSelectEventArgs} from '@syncfusion/ej2-angular-grids';
import {OrderChargeSettleModel} from '../../../models/fnorder/order-charge-settle-model';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';
import {ProcessStatued} from '../../../models/process-statued.enum';

@Component({
  selector: 'app-order-charge-settle-no-applay-list',
  templateUrl: './order-charge-settle-no-applay-list.component.html',
  styleUrls: ['./order-charge-settle-no-applay-list.component.css']
})
export class OrderChargeSettleNoApplayListComponent implements OnInit {

  constructor(private orderChargeSettleService: OrderChargeSettleService,
              private router: Router,
              private emitService: EmitService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<OrderChargeSettleNoApplayListComponent>,
              @Inject(MAT_DIALOG_DATA) public selectrows: string[]) { }

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  public processstatued: ProcessStatued; // 处理的类型

  public selectOptions: { type?: string, mode?: string };

  public currentIndex = 0; // 当前处理的进去

  public selectedSettleId: string;

  public ErrorMsg = '';

  ngOnInit() {

    this.processstatued = ProcessStatued.Pending;

    this.orderChargeSettleService.NoApplaySettle().subscribe(a => {

       this.grid.dataSource = a;
     });
  }

  processorder() {

    this.processstatued = ProcessStatued.Processing;

   // let process = 1;
    for (let i = 0; i < this.selectrows.length; i++) {
        setTimeout(() => {


          this.orderChargeSettleService.AttchFee({
            OrderLogisticDetailFeeId: this.selectrows[i],
            SettleId: this.selectedSettleId
          }).subscribe(a => {

            if (a.StatusCode !== TmsresponseStatusCode.Succeed()) {

              this.ErrorMsg = a.Error.ErrorMsg;
            }
            this.currentIndex = i;
            if (this.currentIndex === this.selectrows.length - 1 ) {
              this.processstatued = ProcessStatued.Finish;
            }
          });

        }, 300 * i, i, this.selectrows);
    }
  }
  selectrow($event: RowSelectEventArgs) {

    const settlemodel = $event.data as OrderChargeSettleModel;

    if (settlemodel != null) {
      this.selectedSettleId = settlemodel.SettleId;
    }

  }

  processordertest() {
    this.processstatued = ProcessStatued.Processing;

    // let process = 1;
    for (let i = 0; i < this.selectrows.length; i++) {
      setTimeout(() => {

        this.currentIndex = i;

        if (i / 2 === 0) {
          this.ErrorMsg = '随机错误';
        }
        if (this.currentIndex === this.selectrows.length - 1 ) {
          this.processstatued = ProcessStatued.Finish;
        }
      }, 1000 * i, i, this.selectrows);
    }
  }
}
