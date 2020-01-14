import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ShipmentOrderRequestModel} from '../../../../models/shipment/shipment-order-request-model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogisticStore} from '../../../../models/LogisticStore/logistic-store';
import {BusAreaEntity} from '../../../../models/base/busareaEntity';
import {MatDialog} from '@angular/material';
import {EmitService} from '../../../../help/emit-service';
import {HttpClient} from '@angular/common/http';
import {BusAreaService} from '../../../../services/base/bus-area.service';
import {FormsControlServiceService} from '../../../../services/forms-control-service.service';
import {ShipmentOrderService} from '../../../../services/logistic/order/shipment-order.service';
import {LogisticStoreServiceService} from '../../../../services/logisticstore/logisticstoreservice';
import {LogisticStoreAuthorizeServiceService} from '../../../../services/logisticstore/logistic-store-authorize-service.service';
import {CustomerTaxServiceService} from '../../../../services/customers/customer-tax-service.service';
import {DialogservicesService} from '../../../../help/dialogservices.service';
import {TihuoType} from '../../../../modeldata/tihuotypedata';
import {TextBoxComponent} from '@syncfusion/ej2-angular-inputs';
import {CustomerTaxModle} from '../../../../models/customers/customer-tax-modle';
import {OrdercustomerComponent} from '../ordercustomer/ordercustomer.component';
import {CustomerQueryForOrdermodle} from '../../../../models/customers/customer-for-order-query-modle';
import {CustomePaymentMethod} from '../../../../modeldata/customePaymentMethod';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {OrderrouteplanComponent} from '../orderrouteplan/orderrouteplan.component';
import {Formextension} from '../../../../help/formextension';
import {OpenOrdervalidationMessages} from '../../openordervalidation';

@Component({
  selector: 'app-biz-orderoperaction',
  templateUrl: './orderoperaction.component.html',
  styleUrls: ['./orderoperaction.component.css']
})
export class OrderoperactionComponent implements OnInit {


  @Input()
  shipmentOrderRequestModel: ShipmentOrderRequestModel;

  @ViewChild('planroutetxt', {static: false})
  PlanTxt: TextBoxComponent;

  public openOrdervalidationMessages: object = OpenOrdervalidationMessages;

  public remoteFields: object = { value: 'AreaNameDesc' };

  public CustomerTaxModles: CustomerTaxModle[] = []; // 用来存储发货客户开票数据

  public taxfields: object = { text: 'Invoicetitle', value: 'Taxno' }; // 发票下拉列表

  public group: { [key: string]: any }[] = [];

  public saveform: FormGroup;

  public MyAuthonStores: LogisticStore[] = [];

  public ToSendStores: LogisticStore[] = [];

  public enbelbackuprouteplan = false; // 是否启用备选线路计算

  public displyatotalfee = 0; // 用于显示费用合计

  constructor( private dialog: MatDialog,
               public emitService: EmitService,
               private http: HttpClient,
               private bsAreaService: BusAreaService,
               private fb: FormBuilder,
               private formsControlServiceService: FormsControlServiceService,
               private shipmentOrderService: ShipmentOrderService,
               private logisticStoreServiceService: LogisticStoreServiceService,
               private logisticStoreAuthorizeServiceService: LogisticStoreAuthorizeServiceService,
               private customerTaxServiceService: CustomerTaxServiceService,
               private  dialogx: DialogservicesService) { }

  ngOnInit() {

    this.logisticStoreServiceService.StoreQuery().subscribe((value: LogisticStore[]) => {

      console.log(value);
      this.ToSendStores = value;

    });
    this.logisticStoreAuthorizeServiceService.MyStores().subscribe(a => {

      this.MyAuthonStores = a;

    });
    this.http
      .get<BusAreaEntity[]>('assets/data/area.json')
      .subscribe((value: BusAreaEntity[]) => {
        value.forEach((a, index) => {
          this.group.push({ AreaID: a.AreaID, AreaNameDesc: a.AreaNameDesc });
        });
      });
    console.log(('this.shipmentOrderRequestModel.Destservice'));
    console.log((this.shipmentOrderRequestModel.Destservice));
    // @ts-ignore
    this.saveform = this.fb.group({
      CustomerOrderId: this.shipmentOrderRequestModel.CustomerOrderId,
      TrackOrderNumber: this.shipmentOrderRequestModel.TrackOrderNumber,
      IfCargoFromOrigin: this.shipmentOrderRequestModel.IfCargoFromOrigin, // 是否上门提货
      FreeTihuo: { value: false, disabled: true }, // 是否免费提货
      TihuoReturn: this.shipmentOrderRequestModel.TihuoReturn,
      OrderItemCaclProperty:  this.shipmentOrderRequestModel.OrderItemCaclProperty,
      BuinessManCode: this.shipmentOrderRequestModel.BuinessManCode,
      AskTihuoTime: this.shipmentOrderRequestModel.AskTihuoTime,
      BuinessMancommission: this.shipmentOrderRequestModel.BuinessMancommission, // { value: '', disabled: true }, // 佣金
      BuinessMancommissionIsReturn: { value: '', disabled: true }, // { value: false, disabled: true }, // 佣金已返

      OrigincustomId: this.shipmentOrderRequestModel.OrigincustomId, // 客户编码
      Origincustomname: this.shipmentOrderRequestModel.Origincustomname,
      OrigincustomLinkman: [this.shipmentOrderRequestModel.OrigincustomLinkman, Validators.required],
      Origintel: [this.shipmentOrderRequestModel.Origintel, Validators.required],
      OriginCity: this.shipmentOrderRequestModel.OriginCity,
      OriginArea: this.shipmentOrderRequestModel.OriginArea,
      OriginAddress: this.shipmentOrderRequestModel.OriginAddress,

      DestcustomId: this.shipmentOrderRequestModel.DestcustomId, // 到货客户编码
      Destcustomname: this.shipmentOrderRequestModel.Destcustomname,
      DestcustomLinkman: [this.shipmentOrderRequestModel.DestcustomLinkman, Validators.required],
      Desttel: [this.shipmentOrderRequestModel.Desttel, Validators.required],
      DestCity: this.shipmentOrderRequestModel.DestCity,
      DestArea: this.shipmentOrderRequestModel.DestArea,
      DestAddress: this.shipmentOrderRequestModel.DestAddress,
      InnerMark: this.shipmentOrderRequestModel.InnerMark,
      ShipmentOrderItems: new FormArray([]),

      Destservice: [ this.shipmentOrderRequestModel.Destservice, Validators.required], // 交货方式，
      TransportMethod: this.shipmentOrderRequestModel.TransportMethod, // 运输方式
      BeginLogisticStoreId: this.shipmentOrderRequestModel.BeginLogisticStoreId, // 始发网点
      EndLogisticStoreId: { value: this.shipmentOrderRequestModel.EndLogisticStoreId, disabled: false }, // 末端配送网点
      OrderAskLimiteDateTime: this.shipmentOrderRequestModel.OrderAskLimiteDateTime,
      RoutePlanId: this.shipmentOrderRequestModel.RoutePlanId, // 运输计划
      TransportMark: this.shipmentOrderRequestModel.TransportMark, // 运输备注
      // 增值业务
      DeclaredValue: this.shipmentOrderRequestModel.DeclaredValue, // 声明货物价值
      DeliveryFee: this.shipmentOrderRequestModel.DeliveryFee, // 保价费

      CollectionOnDeliveryAmount: this.shipmentOrderRequestModel.CollectionOnDeliveryAmount, // 代收货款
      CollectionOnDeliveryAmountFee: this.shipmentOrderRequestModel.CollectionOnDeliveryAmountFee, // 代收货款手续费

      CollectionOnDeliveryBankPeopleName: this.shipmentOrderRequestModel.CollectionOnDeliveryBankPeopleName, // 代收货款人姓名
      CollectionOnDeliveryBankNumber: this.shipmentOrderRequestModel.CollectionOnDeliveryBankNumber, // 代收货款银行账号


      InvoiceTitle: {value: this.shipmentOrderRequestModel.InvoiceTitle, disabled: true}, // 发票抬头
      IsOpenInvoice: false, // 是否开票
      // CargoReceiptNumber:'',//回单
      Needreturntrackingno: this.shipmentOrderRequestModel.Needreturntrackingno, // 是否回单
      CargoReceiptPaperShowType: this.shipmentOrderRequestModel.CargoReceiptPaperShowType, // 回单返回方式
      ConpunCode: this.shipmentOrderRequestModel.ConpunCode, // 优惠折扣代码
     // PaymentMethod: [this.shipmentOrderRequestModel.PaymentMethod, Validators.required], // 付款方式
      PaymentMethod: [this.shipmentOrderRequestModel.PaymentMethod.toString(), Validators.required], // 付款方式
      // 费用信息
      TihuoFee: this.shipmentOrderRequestModel.TihuoFee, // 提货费
      BaseTransportFee: this.shipmentOrderRequestModel.BaseTransportFee, // 基本运费
      SonhuoFee: this.shipmentOrderRequestModel.SonhuoFee, // 送货费
      AddValueFee: this.shipmentOrderRequestModel.AddValueFee, // 增值费用
      ExtendOtherFee: this.shipmentOrderRequestModel.ExtendOtherFee, // 额外费用
      RealInputLogisticFee: this.shipmentOrderRequestModel.RealInputLogisticFee // 实际费用


    });

    // 模拟添加品相的方式
    this.AddItem();

    this.subscibrefeechange(); // 金额变化~~

    this.subscibretihuocontrolstatued(); // 是否提货费用的关注

    this.subscibredestservicechange(); // 交货方式改变;

    this.subscibrechangeEndLogisticStoreId(); // 收货网点发生变化

  }
  /**
   * 订单品相
   * return FormArray
   */
  public get OrderItems(): FormArray {
    return this.saveform.get('ShipmentOrderItems') as FormArray;
  }

  /**
   *  添加品相
   */
  private AddItem() {

    this.shipmentOrderRequestModel.ShipmentOrderItems.forEach((a, b) => {
      this.OrderItems.push(
        this.fb.group({
          OrderItemId: a.OrderItemId,
          Package: [a.Package, Validators.required],
          PackingType: a.PackingType,
          PackageCount: a.PackageCount,
          PackageVolM: a.PackageVolM,
          PackageWeightKg: a.PackageWeightKg,
          PackageLength: a.PackageLength,
          PackageWidth: a.PackageWidth,
          PackageHigh: a.PackageHigh
        })
      );

    });

  }
  /**
   * 订阅交货改变
   */
  private subscibredestservicechange(): void {
    this.saveform.get('Destservice').valueChanges.subscribe(($event: string) => {

      switch ($event) {

        case TihuoType.TihuoForganxian30:
        case TihuoType.TihuoForganxian50:  // 根据逻辑判断是否启用备用线路按钮

          this.enbelbackuprouteplan = true;
          break;
        default:
          this.enbelbackuprouteplan = false;
          break;
      }

      console.log($event);
    });

  }

  /**
   * 订阅费用变化
   */
  private subscibrefeechange(): void {

    const InputValueChange = ($event) => {

      this.displyatotalfee = Number(this.saveform.get('TihuoFee').value)
        + Number(this.saveform.get('BaseTransportFee').value)
        + Number(this.saveform.get('SonhuoFee').value)
        + Number(this.saveform.get('AddValueFee').value)
        + Number(this.saveform.get('ExtendOtherFee').value);

      this.saveform.patchValue({ RealInputLogisticFee: this.displyatotalfee });
    };

    this.saveform.get('TihuoFee').valueChanges.subscribe(InputValueChange);
    this.saveform.get('BaseTransportFee').valueChanges.subscribe(InputValueChange);
    this.saveform.get('SonhuoFee').valueChanges.subscribe(InputValueChange);
    this.saveform.get('AddValueFee').valueChanges.subscribe(InputValueChange);
    this.saveform.get('ExtendOtherFee').valueChanges.subscribe(InputValueChange);

  }

  // 如果收货网点是空 需要重置线路计划和展示的信息
  private subscibrechangeEndLogisticStoreId(): void {
    this.saveform.get('EndLogisticStoreId').valueChanges.subscribe(($event) => {

      if ($event === null) {
        this.saveform.get('RoutePlanId').patchValue('');
        this.PlanTxt.value = '';
      }


    });

  }

  // 提货状态的改变
  private subscibretihuocontrolstatued(): void {

    this.saveform.get('FreeTihuo').valueChanges.subscribe(($event) => {

      if ($event === true) {
        this.saveform.get('TihuoFee').enable();
        this.saveform.get('FreeTihuo').enable();

      } else {
        this.saveform.get('TihuoFee').setValue('0');
        this.saveform.get('TihuoFee').disable();
        this.saveform.get('FreeTihuo').disable();
      }
    });
  }

  // 选择开票的事件
  IsOpenInvoiceChange($event: boolean) {

    if ($event) {
      this.saveform.get('InvoiceTitle').enable();
    } else {
      this.saveform.get('InvoiceTitle').patchValue('');
      this.saveform.get('InvoiceTitle').disable();
    }

    console.log($event);
  }

  // 选择客户  1 发货 2收货
  choecustomer($event: MouseEvent, numberx: number, heightx: string, widthx: string) {


    if ($event.clientX === 0) {
      return;
    }
    console.log($event);

    const dialogRef = this.dialog.open(OrdercustomerComponent, {
      height: heightx,
      width: widthx,
      disableClose: false,
      data: numberx
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == null) {
        return;
      }
      const customertype = result[0] as number;
      const selectcustomer = result[1] as CustomerQueryForOrdermodle;

      if (customertype === 1) {
        this.saveform.patchValue({ OrigincustomId: selectcustomer.CustomerId });
        this.saveform.patchValue({ Origincustomname: selectcustomer.Name });
        this.saveform.patchValue({ OrigincustomLinkman: selectcustomer.LinkMan });
        this.saveform.patchValue({ Origintel: selectcustomer.LinkTel });
        this.saveform.patchValue({ OriginArea: selectcustomer.Area });
        this.saveform.patchValue({ OriginAddress: selectcustomer.LinkAddress });

        if (selectcustomer.Ismonth) {
          this.saveform.patchValue({PaymentMethod: CustomePaymentMethod.PaymentMehodDataForMonth});
        }

      } else {
        this.saveform.patchValue({ DestcustomId: selectcustomer.CustomerId });
        this.saveform.patchValue({ Destcustomname: selectcustomer.Name });
        this.saveform.patchValue({ DestcustomLinkman: selectcustomer.LinkMan });
        this.saveform.patchValue({ Desttel: selectcustomer.LinkTel });
        this.saveform.patchValue({ DestArea: selectcustomer.Area });
        this.saveform.patchValue({ DestAddress: selectcustomer.LinkAddress });
      }

      // this.CustomerTaxModles = this.customerTaxServiceService.Search(selectcustomer.CustomerId);


      const x = this.CustomerTaxModles;
      this.customerTaxServiceService.Search(selectcustomer.CustomerId).subscribe((a) => {
        if (a.length > 0) {

          if (x.length > 0) {

            x.forEach((c, index) => {

              if (c.SelectType === customertype.toString()) {

                x.splice(index, 1);
              }

            });
          }

          this.CustomerTaxModles = [];
          a.forEach((item, index) => {
            item.SelectType = customertype.toString();
            this.CustomerTaxModles.push(item);
          });
          this.CustomerTaxModles = this.CustomerTaxModles.concat(x);
        }

      });

    });
  }

   // 用来进行参考使用的
  caclorderroute(heightx: string, widthx: string) {

    let s1 = this.saveform.get('BeginLogisticStoreId').value as string;
    let s2 = this.saveform.get('EndLogisticStoreId').value as string;

    if (s1 === null) {
      s1 = '';
    }
    if (s2 === null) {
      s2 = '';
    }

    if (s1.length === 0 || s2.length === 0) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '网点参数错误！', MessageShowType.Toast));
      return;
    }

    const dialogRef = this.dialog.open(OrderrouteplanComponent, {
      height: heightx,
      width: widthx,
      disableClose: false,
      data: new Array<string>(s1, s2, this.saveform.get('RoutePlanId').value)
    });

    dialogRef.afterClosed().subscribe(result => {

      this.saveform.get('RoutePlanId').patchValue(result[0]);
      this.PlanTxt.value = result[1];

    });


  }

  // 检测保存数据是否正确
  public CheckSaveData(): boolean {
    if (this.saveform.valid === false) {
      Formextension.getFormValidationErrorsAndEmit(this.saveform, this.openOrdervalidationMessages, this.emitService);
      return false;
    }

    return true;

  }

  public GetFormsDate(): any {

    return  this.saveform.getRawValue();
  }
}
