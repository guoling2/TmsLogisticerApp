import {Component, Inject, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Commonsetting} from '../../../help/commonsetting';

@Component({
  selector: 'app-order-charge-print',
  templateUrl: './order-charge-print.component.html',
  styleUrls: ['./order-charge-print.component.css']
})
export class OrderChargePrintComponent implements OnInit {

  iframe: SafeResourceUrl;

  height = '1000px';

  constructor(private sanitizer: DomSanitizer, public dialogRef: MatDialogRef<OrderChargePrintComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {

    const urldata = 'https://print.trandawl.cn/FnOrder/Index?settleId=' + this.data;

    //const urldata = 'http://localhost:65003/FnOrder/Index?settleId=' + this.data;

    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(
      urldata);

    this.height = (Commonsetting.GetScrollHeight() - 200) + 'px';  // 设定iframe高度
  }

}
