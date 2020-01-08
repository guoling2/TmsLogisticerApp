import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AdminOrderChargeSettleService} from '../../../../../services/fnorder/admin-order-charge-settle.service';
import {OrderChargeDashbordModel} from '../../../../../models/fnorder/order-charge-dashbord-model';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {FinanceReport} from '../../../../../services/base/basereportconfig';
import {Basereportservice} from '../../../../../services/base/basereportservice';

@Component({
  selector: 'app-order-charge-item-list',
  templateUrl: './orderchargeitemlist.component.html',
  styleUrls: ['./orderchargeitemlist.component.css']
})
export class OrderchargeitemlistComponent implements OnInit {


  @Input()
  SettleId: string;

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  dashbord: OrderChargeDashbordModel;

  constructor(private service: Basereportservice, private adminOrderChargeSettleService: AdminOrderChargeSettleService) { }

  ngOnInit() {

    this.adminOrderChargeSettleService.OrderChargeDashbord(this.SettleId)
      .subscribe(a => {
        this.dashbord = a;
      });

    this.service.SearchReport(FinanceReport.Report_OrderChargeSettleItemForAdminSettleIdQuery,
      {SettleId: this.SettleId, PageIndex: 0, PageSize: 100000})
      .subscribe(a => {

        this.grid.dataSource = a.result;
      });
  }

}
