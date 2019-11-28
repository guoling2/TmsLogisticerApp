export class DailyChargeSettleRequest {

  /// <summary>
  /// 结算单号
  /// </summary>
  public  SettleId :string;

/// <summary>
/// 申请网点
/// </summary>
public  Settleorg :string;

/// <summary>
/// 收/付款对象
/// </summary>
public  Chargeparty :string;

/// <summary>
/// 费用项目
/// </summary>
public  ChargeItem  :string;

/// <summary>
/// 金额
/// </summary>
public  ChargeAmt:number;

/// <summary>
/// 方向  付/收
/// </summary>
public  Chargedirection:boolean;




/// <summary>
/// 结算方式
/// </summary>
public  CaclType  :string;

/// <summary>
/// 付款方式
/// </summary>
public  PayMoneyType  :string;

/// <summary>
/// 成本分摊方式
/// </summary>
public  Methodtype  :string;

/// <summary>
/// 数量
/// </summary>
public  Methodcount :number;

/// <summary>
/// 是否开票
/// </summary>
public  IsOpenInvoice :boolean;

/// <summary>
/// 受票方
/// </summary>
public  Invoiceparty  :string;
/// <summary>
/// 税号
/// </summary>
public  Partytaxno :string;
/// <summary>
/// 税率
/// </summary>
public  Taxrate :number;

/// <summary>
/// 发票类型
/// </summary>
public  Invoicetype :number;

/// <summary>
/// 开票项目
/// </summary>
public  FnTrxItem  :string;

public Mark:string;
}
