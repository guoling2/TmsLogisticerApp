import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LogisticStoreServiceService} from '../../../../../services/logisticstore/logisticstoreservice';
import {EnterpriseOrderDetailModel} from '../../../../../models/CustomerOrder/enterprise-order-detail-model';
import {EnterpriseOrderServiceService} from '../../../../../services/CustomerOrder/enterprise-order-service.service';

@Component({
  selector: 'app-orderthumbnail',
  templateUrl: './orderthumbnail.component.html',
  styleUrls: ['./orderthumbnail.component.css']
})
export class OrderthumbnailComponent implements OnInit {

  ordermodel: EnterpriseOrderDetailModel;

  constructor(private enterpriseOrderServiceService: EnterpriseOrderServiceService,
              public dialogRef: MatDialogRef<OrderthumbnailComponent>,
              @Inject(MAT_DIALOG_DATA) public Id: string) { }

  ngOnInit() {

    this.enterpriseOrderServiceService.Detail(this.Id, false).subscribe(a => {
      console.log(a);
      this.ordermodel = a; });

  }

}
