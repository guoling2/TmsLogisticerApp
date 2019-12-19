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
import {ExcelExportProperties} from '@syncfusion/ej2-grids';
import {DateTimeHelp} from '../../../help/date-forma';
import {OrderCancelSendComponent} from './sub/order-cancel-send/order-cancel-send.component';

@Component({
  selector: 'app-enterprise-order-list',
  templateUrl: './enterprise-order-list.component.html',
  styleUrls: ['./enterprise-order-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EnterpriseOrderListComponent implements OnInit {

  constructor(
    public dialog: MatDialog, private emitService: EmitService, private fb: FormBuilder, private service: Basereportservice, private enterpriseOrderServiceService: EnterpriseOrderServiceService) { }

  gridheight: number;
  searchp: FormGroup;

  @ViewChild('tabgroup', {static: false})
  public currenttab: MatTabGroup;


  @ViewChild('preordergrid', {static: false})
  public preordergrid: OrderDataListComponent; // 订单待接

  @ViewChild('seconedpreordergrid', {static: false})
  public seconedpreordergrid: OrderDataListComponent; // 二次预约

  @ViewChild('updatesendcargrid', {static: false})  // 车辆预约
  public updatesendcargrid: OrderDataListComponent;

  @ViewChild('orderissendedgrid', {static: false})  // 货物出厂
  public orderissendedgrid: OrderDataListComponent;

  exceltip = false;
  SelectTabIndex = 0;

  ngOnInit() {

    // this.currenttab.selectedIndex = 0;

    this.searchp = this.fb.group(
      {
        CustomerOrderId: '',
        DesctcustomName: '',
        OrigincustomPhysicalDeotName: '',
        DestCity: '',
        NotifyCarNumber: '',
        ConfirmOrder: '0',
        CreateDatetime1: '',
        CreateDatetime2: ''});
    this.gridheight = Commonsetting.GridHeightshort();
  }

  private GetSearchParameter(): any {
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
      case 3:
        this.searchp.patchValue({ConfirmOrder: '3'});
        break;
    }


    // const newCreateDatetime1 = (this.searchp.controls.CreateDatetime1.value as Date).toDateString();
    //
    // const  newchange1 = DateTimeHelp.ChangeDate(this.searchp.controls.CreateDatetime1.value);
    //
    // this.searchp.patchValue({CreateDatetime1:  newchange1});
    //
    // const  newchange2 = DateTimeHelp.ChangeDate(this.searchp.controls.CreateDatetime2.value);
    //
    // this.searchp.patchValue({CreateDatetime2:  newchange2});


    const searchable = this.searchp.getRawValue ();

    searchable.CreateDatetime1 = DateTimeHelp.ChangeDate(this.searchp.controls.CreateDatetime1.value, true);

    searchable.CreateDatetime2 = DateTimeHelp.ChangeDate(this.searchp.controls.CreateDatetime2.value, false);

    console.log(searchable);

    return searchable;
  }
  searching() {

   const  searchable = this.GetSearchParameter();

   console.log(searchable);

   const letgrid = this.GetCurrentDataGrid();
   // alert('查询');
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
        interfacex = this.preordergrid as LogistciOrderInterface; // 订单待接
        break;
      case 1:
        interfacex = this.seconedpreordergrid as LogistciOrderInterface; // 二次预约
        break;
      case 2:
        interfacex = this.updatesendcargrid as LogistciOrderInterface; // 车辆预约
        break;
      case 3:
        interfacex = this.orderissendedgrid as LogistciOrderInterface; // 货物出厂
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
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择订单', MessageShowType.Toast));
      return;
    }

    // @ts-ignore
   const  ids = this.GetCurrentDataGrid().CurrentDataGrid.getSelectedRecords().map((a) => {
      // @ts-ignore
     return a.OrderPreparedLogisticId;
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

    if (this.exceltip === false) {
      alert('请注意只能导出本页数据');
    }

    this.exceltip = true;



    this.GetCurrentDataGrid().ExcelOut(null);
   //  let appendExcelExportProperties: ExcelExportProperties = {
   //    multipleExport: { type: 'AppendToSheet', blankRows: 2 }
   //  };
   //  this.GetCurrentDataGrid().CurrentDataGrid.excelExport(appendExcelExportProperties, true);


   // this.GetCurrentDataGrid().CurrentDataGrid.excelExport(appendExcelExportProperties, true);
  }

  cancelsendorder(number1: number, number2: number) {

    const  selectrows = this.GetCurrentDataGrid().CurrentDataGrid.getSelectedRecords();

    if (selectrows.length === 0) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择订单', MessageShowType.Toast));
      return;
    }

    // @ts-ignore
    const  ids = this.GetCurrentDataGrid().CurrentDataGrid.getSelectedRecords().map((a) => {
      // @ts-ignore
      return a.OrderPreparedLogisticId;
    }).reverse();


    const dialogRef = this.dialog.open(OrderCancelSendComponent, {
      minHeight: number1, // 160
      minWidth: number2, // 500
      data: {OrderPreparedLogisticIds: ids}
    });

    dialogRef.afterClosed().subscribe(result => {
      EmitAlertMessageHelo.ShowMessage( this.emitService, (result as TmsResponseModle), MessageShowType.Toast);
      this.searching();
    });
  }

  /**
   * Excel报单
   */
  excelupcar() {

  }
}
