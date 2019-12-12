import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LogisticStoreServiceService} from '../../../../../services/logisticstore/logisticstoreservice';
import {EnterpriseOrderDetailModel} from '../../../../../models/CustomerOrder/enterprise-order-detail-model';
import {EnterpriseOrderServiceService} from '../../../../../services/CustomerOrder/enterprise-order-service.service';
import {OrderDataListComponent} from '../order-data-list/order-data-list.component';
import {GridComponent} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-orderthumbnail',
  templateUrl: './orderthumbnail.component.html',
  styleUrls: ['./orderthumbnail.component.css']
})
export class OrderthumbnailComponent implements OnInit {

  orderModel: EnterpriseOrderDetailModel;

  displayedColumns: string[] = ['PackageName', 'TotalQty', 'TotalWeight', 'TotalVol','PackageType'];

  constructor(private enterpriseOrderServiceService: EnterpriseOrderServiceService,
              public dialogRef: MatDialogRef<OrderthumbnailComponent>,
              @Inject(MAT_DIALOG_DATA) public Id: string) { }

  ngOnInit() {


   // this.orderModel = new EnterpriseOrderDetailModel();
    console.log(this.dialogRef);
    this.enterpriseOrderServiceService.Detail(this.Id, true).subscribe(a => {
      console.log(a);

      this.orderModel = a; });

  }

}
