export class OrderChargeSettleRequestModel {

  /// <summary>
  /// 结算组织
  /// </summary>
  public Settleorg: string;
  /// <summary>
  /// 是否开票
  /// </summary>
  public IsOpenInvoice: boolean;
  /// <summary>
  /// 付款方式
  /// </summary>
  public Paymentmode: string;
  /// <summary>
  /// 受票方
  /// </summary>
  public Invoiceparty: string;

  /// <summary>
  /// 税号
  /// </summary>
  public Partytaxno: string;

  /// <summary>
  /// 税率
  /// </summary>
  public Taxrate: number;

  /// <summary>
  /// 发票类型
  /// </summary>
  public Invoicetype: number;

  /// <summary>
  /// 开票项目
  /// </summary>
  public FnTrxItem: string;

  public OpenInvoiceChargeAmt: number;

  public ApplayMark: string;
}


