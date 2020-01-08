import {Component, Input, OnInit} from '@angular/core';
import {AdminOrderChargeSettleService} from '../../../../../services/fnorder/admin-order-charge-settle.service';
import {OrderChargeSettleLinkModel} from '../../../../../models/fnorder/order-charge-settle-link-model';

@Component({
  selector: 'app-order-charge-course',
  templateUrl: './ordersettlecourse.component.html',
  styleUrls: ['./ordersettlecourse.component.css']
})
export class OrdersettlecourseComponent implements OnInit {


  @Input()
  SettleId: string;

  public  result: OrderChargeSettleLinkModel[];

  displayedColumns: string[] = ['Index', 'SchemeNameDesc', 'OperateUserName', 'OperateDateTime'];

  constructor(private adminOrderChargeSettleService: AdminOrderChargeSettleService) { }

  ngOnInit() {

      this.adminOrderChargeSettleService.LinkList(this.SettleId)
        .subscribe(a => {
          this.result = a;
        });
  }

}
