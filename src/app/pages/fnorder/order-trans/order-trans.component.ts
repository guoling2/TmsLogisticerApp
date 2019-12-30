import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataStateChangeEventArgs, FilterService, GridComponent, SortService} from '@syncfusion/ej2-angular-grids';
import {Basereportservice} from '../../../services/base/basereportservice';
import {Commonsetting} from '../../../help/commonsetting';
import {FinanceReport} from '../../../services/base/basereportconfig';
import {OrderthumbnailComponent} from '../../myorder/enterprise-order-list/sub/order-thumbnail/orderthumbnail.component';
import {MatDialog} from '@angular/material/dialog';
import {OrderChargesettleCreateComponent} from '../order-charge-settle-create/order-chargesettle-create.component';
import {EmitService} from '../../../help/emit-service';
import {EmitAlertMessageHelo, MessageShowType} from '../../../help/emit-alert-message';
import {SortDescriptorModel, SortSettingsModel} from '@syncfusion/ej2-grids';
import {DataGridHelp} from '../../../SyncfusionHelp/data-grid-help';
import {OrderChargeSettleNoApplayListComponent} from '../order-charge-settle-no-applay-list/order-charge-settle-no-applay-list.component';

@Component({
  selector: 'app-fn-order-trans',
  templateUrl: './order-trans.component.html',
  styleUrls: ['./order-trans.component.css'],
  providers: [SortService, FilterService]
})
export class OrderTransComponent implements OnInit {

  public pageSettings = {currentPage: 1, pageSize: 100};

  initialSort: SortSettingsModel = new class implements SortSettingsModel {
    columns: SortDescriptorModel[];
  };

  gridheight: number;

  public searchp: FormGroup;

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  constructor( private emitService: EmitService, public dialog: MatDialog, private fb: FormBuilder, private service: Basereportservice) { }

  ngOnInit() {
    this.searchp = this.fb.group(
      { OrderTrackServerId: '', BeginLogisticStoreId: ''});
    this.gridheight = Commonsetting.GridHeight0();
  }

  OpenCreateBillOrder() {
   const da = this.dialog.open(OrderChargesettleCreateComponent, {disableClose: true}).afterClosed().subscribe(

     (a => {
         if (a != null) {
           EmitAlertMessageHelo.ShowMessageWithReplaceMsg(
             this.emitService, a, '结算单创建成功', '结算单创建失败', MessageShowType.Toast);
         }

       }
   ));
  }

  AttchToBillOrder() {

    console.log(this.grid.dataSource);

    const  ids = this.grid.getSelectedRecords().map((a) => {
      // @ts-ignore
      return a.OrderLogisticDetailFeeId;
    }).reverse();


    this.dialog.open(OrderChargeSettleNoApplayListComponent, {
      disableClose: true, maxWidth: '900px', data: ids}).afterClosed().subscribe(
      (a => {
        this.searching(this.searchp);
        }
      ));
  }

  searching(a: any) {

    this.searchp = a;

    const  pagesetting = this.grid.pageSettings;
    a.pageindex = pagesetting.currentPage - 1;
    a.pagesize = pagesetting.pageSize;


    this.service.SearchReport(FinanceReport.Report_orderapplaylist, a).subscribe(result => {
      this.grid.dataSource = result;

    });
  }

  dataStateChange($event: DataStateChangeEventArgs) {
    this.searchp = DataGridHelp.GetSortObject($event, this.searchp);

    this.searching(this.searchp);

  }
}
