import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LogisticStoreServiceService} from '../../../../../services/logisticstore/logisticstoreservice';
import {EnterpriseOrderDetailModel} from '../../../../../models/CustomerOrder/enterprise-order-detail-model';

@Component({
  selector: 'app-orderthumbnail',
  templateUrl: './orderthumbnail.component.html',
  styleUrls: ['./orderthumbnail.component.css']
})
export class OrderthumbnailComponent implements OnInit {

  ordermodel: EnterpriseOrderDetailModel;
  constructor(  public dialogRef: MatDialogRef<OrderthumbnailComponent>,
                @Inject(MAT_DIALOG_DATA) public Id: string) { }

  ngOnInit() {



  }

}
