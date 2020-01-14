import {FormArray, Validators} from '@angular/forms';

import {publish} from 'rxjs/operators';

export class ShipmentOrderRequestModel {

  public SystemOrderId: string;
  public CustomerOrderId: boolean;
  public TrackOrderNumber: boolean;
  public IfCargoFromOrigin: boolean; // 是否上门提货
  public FreeTihuo: boolean; // 是否免费提货
  public TihuoReturn: boolean;
  public OrderItemCaclProperty: string;
  public BuinessManCode: string;
  public AskTihuoTime ?: Date;
  public BuinessMancommission: number; // { value: '', disabled: true }, // 佣金
  public BuinessMancommissionIsReturn: boolean; // { value: false, disabled: true }, // 佣金已返

  public OrigincustomId: string; // 客户编码
  public Origincustomname: string;
  public OrigincustomLinkman: string;
  public Origintel: string;
  public OriginCity: string;
  public OriginArea: string;
  public OriginAddress: string;

  public DestcustomId: string; // 到货客户编码
  public Destcustomname: string;
  public DestcustomLinkman: string;
  public Desttel: string;
  public DestCity: string;
  public DestArea: string;
  public DestAddress: string;
  public InnerMark: string;

  public ShipmentOrderItems: ShipmentOrderItemModel[];

  public Destservice: string; // 交货方式，
  public TransportMethod: string; // 运输方式
  public BeginLogisticStoreId: string; // 始发网点
  public EndLogisticStoreId: string; // 末端配送网点
  public OrderAskLimiteDateTime ?: Date;
  public RoutePlanId: string; // 运输计划
  public TransportMark: string; // 运输备注
  // 增值业务
  public DeclaredValue: number; // 声明货物价值
  public DeliveryFee: number; // 保价费

  public CollectionOnDeliveryAmount: string; // 代收货款
  public CollectionOnDeliveryAmountFee: string; // 代收货款手续费

  public CollectionOnDeliveryBankPeopleName: string; // 代收货款人姓名
  public CollectionOnDeliveryBankNumber: string; // 代收货款银行账号


  public InvoiceTitle: string; // 发票抬头
  public IsOpenInvoice: boolean; // 是否开票
  // CargoReceiptNumber:'',//回单
  public Needreturntrackingno: boolean; // 是否回单
  public CargoReceiptPaperShowType: string; // 回单返回方式
  public ConpunCode: string; // 优惠折扣代码
  public PaymentMethod: string; // 付款方式

  // 费用信息
  public TihuoFee: number; // 提货费
  public BaseTransportFee: number; // 基本运费
  public SonhuoFee: number; // 送货费
  public AddValueFee: number; // 增值费用
  public ExtendOtherFee: number; // 额外费用
  public RealInputLogisticFee: number; // 实际费用
  public OrderLogisticDetailId: string;

}

export  class  ShipmentOrderItemModel {
  public OrderItemId: string;
   public Package: string;
   public PackingType: string;
   public PackageCount: number;
   public PackageVolM: number;
   public PackageWeightKg: number;
   public PackageLength ?: number;
   public PackageWidth ?: number;
   public PackageHigh ?: number;
   public LogisticAttribute: string;
}
