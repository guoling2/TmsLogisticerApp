import {Component, OnInit, ViewChild} from '@angular/core';
import {ShipmentOrderService} from '../../../services/logistic/order/shipment-order.service';
import {ShipmentOrderRequestModel} from '../../../models/shipment/shipment-order-request-model';
import {ActivatedRoute, Router} from '@angular/router';
import {EmitService} from '../../../help/emit-service';
import {EmitAlertMessageHelo, MessageShowType} from '../../../help/emit-alert-message';
import {OrderoperactionComponent} from '../_sub/orderoperaction/orderoperaction.component';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @ViewChild('orderactionforms', {static: false})
  Orderoperactionview: OrderoperactionComponent;

  shipmentOrderRequestModel: ShipmentOrderRequestModel;

  orderLogisticDetailId: string; // 系统单号


  submitstatued = false; // 提交状态

  constructor( private router: Router,
               private route: ActivatedRoute,
               private emitService: EmitService,
               private shipmentOrderService: ShipmentOrderService) { }

  ngOnInit() {

    this.ReLoad();

  }

  ReLoad() {
    this.orderLogisticDetailId = this.route.snapshot.paramMap.get('id');

    this.shipmentOrderService.EditDetail(this.orderLogisticDetailId).subscribe(a => {

      this.shipmentOrderRequestModel = a;

      console.log(a);
    });
  }
  SaveOrder() {


    console.log(this.shipmentOrderRequestModel);

    const checkresult = this.Orderoperactionview.CheckSaveData();

    if (checkresult === false) {
      return;
    }
    this.shipmentOrderRequestModel = this.Orderoperactionview.GetFormsDate() as ShipmentOrderRequestModel;

  //  alert(this.shipmentOrderRequestModel.OrderLogisticDetailId);

    this.submitstatued = true;
    this.shipmentOrderService.Edit(this.orderLogisticDetailId, this.shipmentOrderRequestModel).subscribe(a => {
      EmitAlertMessageHelo.ShowMessage( this.emitService, a, MessageShowType.Toast);
      if (a.StatusCode === TmsresponseStatusCode.Succeed()) {

        this.submitstatued = false;
        this.ReLoad();

      }
    });
  }
}
