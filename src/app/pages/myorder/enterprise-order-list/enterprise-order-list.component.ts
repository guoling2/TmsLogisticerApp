import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Commonsetting} from '../../../help/commonsetting';
import {Basereportservice} from '../../../services/base/basereportservice';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatTabGroup} from '@angular/material/tabs';
import {OrderDataListComponent} from './sub/order-data-list/order-data-list.component';
import {EnterpriseOrderServiceService} from '../../../services/CustomerOrder/enterprise-order-service.service';
import {EmitService} from '../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, EmitAlertMessageHelo, MessageShowType} from '../../../help/emit-alert-message';
import {OrderAcceptComponent} from './sub/order-accept/order-accept.component';
import {MatDialog} from '@angular/material/dialog';
import {DefaultdepotsettingComponent} from './sub/defaultdepotsetting/defaultdepotsetting.component';
import {TmsResponseModle} from '../../../models/tms-response.module';
import {OrderUnAcceptComponent} from './sub/order-unaccept/order-un-accept.component';
import {UpdatecarnumberComponent} from './sub/order-updatecarnumber/updatecarnumber.component';
import {LogistciOrderInterface} from '../../../pageservices/logistci-order-interface';
import {Unacceptorderrequest} from './sub/order-unaccept/unacceptorderrequest';

@Component({
  selector: 'app-enterprise-order-list',
  templateUrl: './enterprise-order-list.component.html',
  styleUrls: ['./enterprise-order-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EnterpriseOrderListComponent implements OnInit {

  gridheight: number;
  searchp: FormGroup;

  @ViewChild('tabgroup', {static: false})
  public currenttab: MatTabGroup;

  @ViewChild('gdi1', {static: false})
  public gdi1: OrderDataListComponent; // 待接单
  @ViewChild('gdi2', {static: false})  // 等待安排
  public gdi2: OrderDataListComponent;
  @ViewChild('gdi3', {static: false})  // 等待签收
  public gdi3: OrderDataListComponent;

  constructor( public dialog: MatDialog, private emitService: EmitService, private fb: FormBuilder, private service: Basereportservice, private enterpriseOrderServiceService: EnterpriseOrderServiceService) { }

  ngOnInit() {

    this.searchp = this.fb.group(
      { CustomerOrderId: '', OrigincustomPhysicalDeotName: '', DestCity: '', NotifyCarNumber: '', ConfirmOrder: '0'});
    this.gridheight = Commonsetting.GridHeight3();
  }

  searching() {

    switch (this.currenttab.selectedIndex) {
      case  0:
        this.searchp.patchValue({ConfirmOrder: '0'});
        break;
      case 1:
        this.searchp.patchValue({ConfirmOrder: '1'});
        break;
      case 2:
        this.searchp.patchValue({ConfirmOrder: '2'});
        break;
    }


    const searchable = this.searchp.getRawValue ();

    const letgrid = this.GetCurrentDataGrid();



    letgrid.SearchData(searchable);

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
    }

    console.log(interfacex);
    return  interfacex;
  }


  getorder(height: string, width: string) {


    const selectrows = this.GetCurrentDataGrid().CurrentDataGrid.getSelectedRecords();


    if (selectrows.length < 1) {
      return;
    }

    const dialogRef = this.dialog.open(OrderAcceptComponent, {
        height,
        width,
        disableClose: false,
        data: selectrows
      });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Succeed, '系统信息', '接单成功！', MessageShowType.Toast));
        this.searching();
      }

    });
   // OrderSystemOrderId
    console.log(selectrows);
  }

  opensettingdepot(s: number, s2: number) {

    const dialogRef = this.dialog.open(DefaultdepotsettingComponent, {
      minHeight: Commonsetting.GetScrollHeight() - s, // 160
      minWidth: Commonsetting.GetScrollWidth() - s2, // 500
      disableClose: false
    });
  }

  ungetorder(s: number, s2: number) {


    const selectrows = this.GetCurrentDataGrid().CurrentDataGrid.getSelectedRecords();


    if (selectrows.length !== 1) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '只能单独退单', MessageShowType.Toast));
      return;
    }


    // @ts-ignore
    const a = selectrows[0] as Unacceptorderrequest;
    const dialogRef = this.dialog.open(OrderUnAcceptComponent, {
      minHeight: s, // 160
      minWidth: s2, // 500
      data: a
    //  data: {OrderPreparedLogisticId: selectrows[0]['OrderPreparedLogisticId'], CustomerOrderId: selectrows[0].CustomerOrderId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      console.log(result);
      EmitAlertMessageHelo.ShowMessage( this.emitService, (result as TmsResponseModle), MessageShowType.Toast);
      // this.emitService.eventEmit.emit(
      //   new EmitAlertMessage(AlertMessageType.Info, '系统信息', (<TmsResponseModle>result).Info, MessageShowType.Toast));
      this.searching();
    });
}

  updatesendcar(number1: number, number2: number) {

   const  selectrows = this.GetCurrentDataGrid().CurrentDataGrid.getSelectedRecords();

   if (selectrows.length === 0) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '只能单独退单', MessageShowType.Toast));
      return;
    }

    // @ts-ignore
   const  ids = this.GetCurrentDataGrid().CurrentDataGrid.getSelectedRecords().map((a) => {
      return a['OrderPreparedLogisticId'];
    }).reverse();



   const dialogRef = this.dialog.open(UpdatecarnumberComponent, {
      minHeight: number1, // 160
      minWidth: number2, // 500
      data: ids
    });
   dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      //
      // console.log(result);
      EmitAlertMessageHelo.ShowMessage( this.emitService, (result as TmsResponseModle), MessageShowType.Toast);
      // this.emitService.eventEmit.emit(
      //   new EmitAlertMessage(AlertMessageType.Info, '系统信息', (<TmsResponseModle>result).Info, MessageShowType.Toast));
      this.searching();
    });
  }


  excelout() {
    this.GetCurrentDataGrid().CurrentDataGrid.excelExport();
  }
}
