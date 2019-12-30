import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Commonsetting} from '../../../help/commonsetting';
import {
  AcceptAndFinshNodeDataGridComponent,
} from './sub/accept-node-data-grid/accept-node-data-grid.component';
import {LogistciOrderInterface} from '../../../pageservices/logistci-order-interface';
import {MatTabGroup} from '@angular/material/tabs';
import {AdminDailyChargeSettleService} from '../../../services/fncharge/admin-daily-charge-settle.service';
import {TmssaveconfirmEvent} from '../../../directive/tmssaveconfirm.directive';
import {EmitService} from '../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, EmitAlertMessageHelo, MessageShowType} from '../../../help/emit-alert-message';
import {OpeninvoicedatagridComponent} from './sub/openinvoicedatagrid/openinvoicedatagrid.component';
import {AddInvoiceProfileComponent} from './sub/add-invoice-profile/add-invoice-profile.component';
import {MatDialog} from '@angular/material/dialog';
import {IAddInvoiceRequest} from './sub/add-invoice-profile/iadd-invoice-request';

@Component({
  selector: 'app-admin-list-view',
  templateUrl: './admin-list-view.component.html',
  styleUrls: ['./admin-list-view.component.css']
})
export class AdminListViewComponent implements OnInit {

  gridheight: number;
  searchp: FormGroup;


  @ViewChild('tabgroup', {static: false})
  public currenttab: MatTabGroup;

  @ViewChild('gdi1', {static: false})
  public gdi1: AcceptAndFinshNodeDataGridComponent; // 待接单

  @ViewChild('gdi2', {static: false})
  public gdi2: OpeninvoicedatagridComponent; // 待开票

  @ViewChild('gdi3', {static: false})
  public gdi3: AcceptAndFinshNodeDataGridComponent; // 待冲销


  public SelectTabIndex = 0;
  constructor(private dialog: MatDialog, private emitService: EmitService, private fb: FormBuilder, private adminDailyChargeSettleService: AdminDailyChargeSettleService) { }

  ngOnInit() {
    this.searchp = this.fb.group(
      { ProcessStatued: '', Chargeparty: ''});
    this.gridheight = Commonsetting.GridHeight2l();
  }
  /**
   * 获取当前使用的表格
   */
  private  GetCurrentDataGrid(): LogistciOrderInterface {

    let interfacex = null;
    // alert(this.currenttab.selectedIndex);
    switch (  this.currenttab.selectedIndex ) {
      case 0:
        interfacex = this.gdi1 as LogistciOrderInterface;
        break;
      case 1:
        interfacex = this.gdi2 as LogistciOrderInterface;
        break;
      case 2:
        interfacex = this.gdi3 as LogistciOrderInterface;
        break;
      // case 1:
      //   interfacex = <LogistciOrderInterface>this.gdi2;
      //   break;
      // case 2:
      //   interfacex = <LogistciOrderInterface> this.gdi3;
      //   break;
    }

    console.log(interfacex);
    return  interfacex;
  }

  searching() {

    const searchable = this.searchp.getRawValue ();

    this.GetCurrentDataGrid().SearchData(searchable);

  }

  orderaction(action: TmssaveconfirmEvent) {

    if (action.ActionFlag === false) {
      return;
    }

    const  rowds = this.GetCurrentDataGrid().CurrentDataGrid.getSelectedRecords().map<string>((a) => {
      // @ts-ignore
      return a.SettleId;
    }).reverse();

    if (rowds.length === 0) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '必须先选择数据在进行操作！', MessageShowType.Toast));
      return;
    }
   //  let result: Observable<TmsResponseModle>;

    switch (action.ExtendData) {

      case '3': // 冲销完成
        this.finish(rowds);
        break;

      case '2': // 完成开票
        this.finishinvoice(rowds);
        break;

      case '1': // 接单
        this.acceptorder(rowds, 1);
        break;
      case '0': // 退单

        this.acceptorder(rowds, 2);
        break;
    }
  }
  // 开票完成
  finishinvoice(ids: string[]) {


    ids.forEach((a, b) => {

      this.adminDailyChargeSettleService.FinishInvoice(a).subscribe(result => {
        EmitAlertMessageHelo.ShowMessage(this.emitService, result, MessageShowType.Alert);
      });

      if (ids.length === 1) {
        this.searching();
      } else if (b === ids.length - 1) {
        this.searching();
      }

    });

  }
  acceptorder(ids: string[], type: number) {

    ids.forEach((a, b) => {

      if (type === 1) {
        this.adminDailyChargeSettleService.Accept(a).subscribe(result => {
          EmitAlertMessageHelo.ShowMessage(this.emitService, result, MessageShowType.Alert);
          this.searching();
        });
      } else if (type === 2) {
        this.adminDailyChargeSettleService.UnAccept(a).subscribe(result => {
          EmitAlertMessageHelo.ShowMessage(this.emitService, result, MessageShowType.Alert);
          this.searching();
        });
      }
    });


  }

  private finish(ids: string[]) {
    ids.forEach((a, b) => {

      this.adminDailyChargeSettleService.Finish(a).subscribe(result => {
        EmitAlertMessageHelo.ShowMessage(this.emitService, result, MessageShowType.Toast);
        this.searching();
      });

      // if (ids.length === 1) {
      //   this.searching();
      // } else if (b === ids.length - 1) {
      //   this.searching();
      // }

    });

  }
  openinvoicedialog(width: string, height: string, panelClass: string) {

    const selectedrecords = this.GetCurrentDataGrid().CurrentDataGrid.getSelectedRecords();

    if (selectedrecords.length > 1) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '只能选择一张费用进行开票！', MessageShowType.Toast));
      return;
    }
    const profile = selectedrecords[0] as IAddInvoiceRequest;

    const dialogRef = this.dialog.open(AddInvoiceProfileComponent, {
      data: profile,
      width,  // 350
      height,   // 100
      panelClass,
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
