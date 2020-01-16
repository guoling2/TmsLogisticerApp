import {FormArray, Validators} from '@angular/forms';
import {ShipmentOrderItemModelEntity} from './ShipmentOrderItemModelEntity';

export class ShipmentOrderComplexModel {
  public  OrderLogisticDetailId: string;
  public SystemOrderId: string;
 public CustomerOrderId: string;
  public TrackOrderNumber: string;
  public IfCargoFromOrigin: boolean; // 是否上门提货
   public IfDesctPickUpMySelf: boolean;
  public FreeTihuo: boolean; // 是否免费提货
  public TihuoReturn: string;
  public OrderItemCaclProperty: string;
  public BuinessManCode: string;
  public AskTihuoTime: string;
  public BuinessMancommission: string; // { value: '', disabled: true }, // 佣金
  public BuinessMancommissionIsReturn: string; // { value: false, disabled: true }, // 佣金已返

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
  // ShipmentOrderItems: new FormArray([]),

  public Destservice: string; // 交货方式，
  public TransportMethod: string; // 运输方式
  public BeginLogisticStoreId: string; // 始发网点
  public EndLogisticStoreId: string; // 末端配送网点
  public BeginLogisticStoreName: string; // 始发网点名称
  public EndLogisticStoreName: string; // 末端配送网点名称


  public OrderAskLimiteDateTime ?: Date ;
  public RoutePlanId: string; // 运输计划
  public TransportMark: string; // 运输备注
  // 增值业务
  public DeclaredValue: number; // 声明货物价值
  public CollectionOnDeliveryAmount ?: number; // 声明代收货款
  public CollectionOnDeliveryAmountFee ?: number; // 声明代收货款

  public CollectionOnDeliveryBankPeopleName: string; // 代收货款人姓名
  public CollectionOnDeliveryBankNumber: string; // 代收货款银行账号
  public InvoiceTitle: string; // 发票抬头
  public IsOpenInvoice: boolean; // 是否开票

  public Needreturntrackingno: boolean; // 是否回单
  public CargoReceiptPaperCount: number;
  public CargoReceiptPaperShowType: string; // 回单返回方式
  public ConpunCode: string; // 优惠折扣代码
  public PaymentMethod: number; // 付款方式
  public PaymentMethodDesc: string; // 付款方式描述

  // 费用信息
  public TihuoFee: number;
  public BaseTransportFee: number; // 基本运费
  public SonhuoFee: number; // 送货费
  public AddValueFee: number; // 增值费用
  public ExtendOtherFee: number; // 额外费用
  public RealInputLogisticFee: number; // 实际费用



  public PayNow: number;   // 现付
  public PayArrived: number;   // 到付
  public PayReceipt: number;  // 回付
  public PayByCollectionOnDelivery: number; // 货款扣
  public PayOnMonthly: number; // 月 付
  public Tifu: number; // 提付


  public TotalCount: number;
  public TotalVolume: number;
 public TotalWeight: number;
  public OrderZhWeight: number;
  public OrderZhVol: number;
  public OrderPhWeight: number;
  public OrderPhVol: number;

  public OrderDestserviceDesc: string;

  public ShipmentOrderItems: ShipmentOrderItemModelEntity[];
  public DeliveryFee: number;
  public  AcceptUser: string;
  public  AcceptDateTime: Date;
  public  LogisticOrderStatuedId: LogisticOrderStatued;
}


export  enum LogisticOrderStatued {

  /// <summary>
  /// 未知
  /// </summary>
  Unknow =0,
  /// <summary>
  /// 创建
  /// </summary>
  Create =1,
  /// <summary>
  /// 接受企业订单
  /// </summary>
  AcceptEnterpriseOrder=2,
  /// <summary>
  /// 取消企业订单
  /// </summary>
  CancelEnterpriseOrder=3,
  /// <summary>
  /// 预约取消
  /// </summary>
  CancelEnterprisePreOrder=4,
  /// <summary>
  /// 下达
  /// </summary>
  ToLogisticStore =10,

  /// <summary>
  /// 准备上门提货
  /// </summary>
  PreparedTihuo = 11,
  /// <summary>
  /// 本地提货安排车辆中
  /// </summary>
  BendiTihuoIng = 12,
  /// <summary>
  /// 本地已提货
  /// </summary>
  BendiTihuoEnd=19,
  /// <summary>
  /// 本地卸车
  /// </summary>
  BendiXieche = 28,
  /// <summary>
  /// 本地送货安排中
  /// </summary>
  PreBendisonghuo = 21,
  /// <summary>
  /// 本地送货中
  /// </summary>
  Bendisonghuoing=22,
  /// <summary>
  /// 网点中转车辆安排中
  /// </summary>
  WangdianzhongzhuanPrepared =30,
  /// <summary>
  /// 中转发车
  /// </summary>
  WangdianZhongzhuanIng = 31,
  /// <summary>
  /// 中转到车
  /// </summary>
  WangdianZhongzhuanDaoche =32,
  /// <summary>
  /// 异地卸车
  /// </summary>
  Yidixieche =40,
  /// <summary>
  /// 异地送货
  /// </summary>
  Yidisonghuo =41,
  /// <summary>
  /// 外包
  /// </summary>
  Waibao =50,
  /// <summary>
  /// 物流服务结束
  /// </summary>
  Finish =100,

  /// <summary>
  /// 客户下单到物流系统中
  /// </summary>
  CustomerSaveOrder=200,
  /// <summary>
  /// 客户取消物流系统中的订单
  /// </summary>
  CustomerCancelOrder=201,
  /// <summary>
  /// 客户委派通知运输商
  /// </summary>
  CustomerPendingLogistic=210,
  /// <summary>
  /// 客户取消委派通知承运商
  /// </summary>
  CustomerCancelPendingLogistic=211
}
