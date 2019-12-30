import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataStateChangeEventArgs, GridComponent} from '@syncfusion/ej2-angular-grids';
import {Basereportservice} from '../../../services/base/basereportservice';
import {Commonsetting} from '../../../help/commonsetting';
import {FinanceReport} from '../../../services/base/basereportconfig';
import {LogistciOrderInterface} from '../../../pageservices/logistci-order-interface';
import {MatTabGroup} from '@angular/material/tabs';
import {AcceptAndFinshNodeDataGridComponent} from '../../fncharge/admin-listview/sub/accept-node-data-grid/accept-node-data-grid.component';
import {OpeninvoicedatagridComponent} from '../../fncharge/admin-listview/sub/openinvoicedatagrid/openinvoicedatagrid.component';
import {OrderSettleDataGridComponent} from './sub/order-settle-data-grid/order-settle-data-grid.component';
import {FnAdminOrderService} from '../bizdirective/fn-admin-order.service';
import {OrderEventArg} from '../bizdirective/order-event-arg';
import {OrderChargeSettleNoApplayListComponent} from '../order-charge-settle-no-applay-list/order-charge-settle-no-applay-list.component';
import {MatDialog} from '@angular/material/dialog';
import {OrderSettleAdminProcessComponent} from '../order-settle-admin-process/order-settle-admin-process.component';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';
import {IAddInvoiceRequest} from '../../fncharge/admin-listview/sub/add-invoice-profile/iadd-invoice-request';
import {AddInvoiceProfileComponent} from '../../fncharge/admin-listview/sub/add-invoice-profile/add-invoice-profile.component';
import {EmitService} from '../../../help/emit-service';
import {OrderAddInvoiceComponent} from '../order-add-invoice/order-add-invoice.component';

@Component({
  selector: 'app-order-settle-admin-list',
  templateUrl: './order-settle-admin-list.component.html',
  styleUrls: ['./order-settle-admin-list.component.css']
})
export class OrderSettleAdminListComponent implements OnInit {

  constructor( private emitService: EmitService, public dialog: MatDialog, private fb: FormBuilder, private service: Basereportservice, private fnAdminOrderService: FnAdminOrderService) { }

  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  public SelectTabIndex = 0;

  @ViewChild('tabgroup', {static: false})
  public currenttab: MatTabGroup;

  @ViewChild('noacceptgrid', {static: false})
  public noacceptgrid: OrderSettleDataGridComponent; // 待接单

  @ViewChild('openinvoicegrid', {static: false})
  public openinvoicegrid: OrderSettleDataGridComponent; // 待开票

  @ViewChild('readytofinishgrid', {static: false})
  public readytofinishgrid: OrderSettleDataGridComponent; // 待冲销

  ngOnInit() {
    this.searchp = this.fb.group(
      { ProcessStatued: '1', SettleId: ''});
    this.gridheight = Commonsetting.GridHeight0();
  }


  searching() {

    switch ( this.SelectTabIndex) {
      case 0:
        this.searchp.patchValue({ProcessStatued: '1'});
        break;
      case 1:
        this.searchp.patchValue({ProcessStatued: '40'});
        break;
      case 2:
        this.searchp.patchValue({ProcessStatued: '45'});
        break;

    }
    const searchable = this.searchp.getRawValue ();
    this.GetCurrentDataGrid().SearchData(searchable);
  }

  public GetSelectSettleIds(): string[] {

    try {
      return  this.GetCurrentDataGrid().CurrentDataGrid.getSelectedRecords().map<string>((a) => {
        // @ts-ignore
        return a.SettleId;
      }).reverse();
    } catch (e) {
      console.log('异常');
      console.log(e);
  }
  }
  private  GetCurrentDataGrid(): LogistciOrderInterface {

    let interfacex = null;
    // alert(this.currenttab.selectedIndex);
  //  console.log('获取')
    switch ( this.currenttab.selectedIndex ) {
      case 0:
        interfacex = this.noacceptgrid as LogistciOrderInterface;
        break;
      case 1:
        interfacex = this.openinvoicegrid as LogistciOrderInterface;
        break;
      case 2:
        interfacex = this.readytofinishgrid as LogistciOrderInterface;
        break;
    }

    console.log(interfacex);
    return  interfacex;
  }

  dataStateChange($event: DataStateChangeEventArgs) {

    console.log('dataStateChange');

    console.log($event);
    if ($event.action.requestType === 'paging') {
      this.searching();
    }

  }

  requestdata($event: OrderEventArg) {


  }

  processorder(showmessage: string, succeedMessage: string , actionname: string) {
    const  selectSettleIds = this.GetSelectSettleIds();

    if (selectSettleIds.length === 0) {
      return;
    }
    this.dialog.open(OrderSettleAdminProcessComponent, {
      disableClose: true, data: {
        ShowMessage: showmessage,
        SucceedMessage: succeedMessage,
        SettleIds: selectSettleIds,
        OrderAction: actionname
      }}).afterClosed().subscribe(
      (a => {
          this.searching();
        }
      ));
  }

  // 开票
  openinvoicedialog() {
    const selectedrecords = this.GetCurrentDataGrid().CurrentDataGrid.getSelectedRecords();


    if (selectedrecords.length !== 1) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '只能选择一张费用进行开票！', MessageShowType.Toast));
      return;
    }
    const profile = selectedrecords[0] as IAddInvoiceRequest;

    const dialogRef = this.dialog.open(OrderAddInvoiceComponent, {
      data: profile,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Succeed, '系统信息', '发票信息保存成功！', MessageShowType.Toast));
        this.searching();
      }

    });
  }
}
