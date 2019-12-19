import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {OrderChargeSettleService} from '../../../services/fnorder/order-charge-settle.service';
import {Router} from '@angular/router';
import {EmitService} from '../../../help/emit-service';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GridComponent} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-order-charge-settle-no-applay-list',
  templateUrl: './order-charge-settle-no-applay-list.component.html',
  styleUrls: ['./order-charge-settle-no-applay-list.component.css']
})
export class OrderChargeSettleNoApplayListComponent implements OnInit {

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  public processstatued: number;

  public selectOptions: { type?: string, mode?: string };

  public currentIndex: number;

  constructor(private orderChargeSettleService: OrderChargeSettleService,
              private router: Router,
              private emitService: EmitService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<OrderChargeSettleNoApplayListComponent>,
              @Inject(MAT_DIALOG_DATA) public selectrows: string[]) { }

  ngOnInit() {

    this.processstatued = 10;

    this.orderChargeSettleService.NoApplaySettle().subscribe(a => {

       this.grid.dataSource = a;
     });
  }

  processorder() {

    this.processstatued = 20;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectrows.length; i++) {
        setTimeout(() => {
          this.currentIndex = i;
          console.log(new Date());
          console.log(i);
          console.log(this.selectrows[i]);
          if (i === this.selectrows.length - 1) {
            this.processstatued = 30;
          }
        }, 1000 * i, i);
    }
  }
}
