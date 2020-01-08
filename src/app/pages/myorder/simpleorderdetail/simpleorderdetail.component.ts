import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Priceanalysisparameter} from '../priceanalysisparameter';
import {ShipmentOrderService} from '../../../services/logistic/order/shipment-order.service';
import {ShipmentOrderSimpleModel} from '../../../models/shipment/shipment-order-simple-model';
import {OrderFlowMessageEntity} from '../../../models/order-flow-message';
import {OrderFlowMessageServices} from '../../../services/base/orderflowmessageservices';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-simpleorderdetail',
  templateUrl: './simpleorderdetail.component.html',
  styleUrls: ['./simpleorderdetail.component.css']
})
export class SimpleorderdetailComponent implements OnInit {


  ShipmentOrder: ShipmentOrderSimpleModel;

  messresult: OrderFlowMessageEntity[];

  constructor(  public dialogRef: MatDialogRef<SimpleorderdetailComponent>, private orderFlowMessageServices: OrderFlowMessageServices, private shipmentOrderService: ShipmentOrderService, @Inject(MAT_DIALOG_DATA) public parameter: string) { }

  ngOnInit() {

    this.shipmentOrderService.simpledetail(this.parameter).subscribe(a => {

      this.ShipmentOrder = a;
    });


  }

  openindex($event: MatTabChangeEvent) {


    if ($event.index === 1) {

      this.orderFlowMessageServices.Search(this.ShipmentOrder.OrderTrackServerId).subscribe((a) => {

        this.messresult = a;
      });
    }

  }
}
