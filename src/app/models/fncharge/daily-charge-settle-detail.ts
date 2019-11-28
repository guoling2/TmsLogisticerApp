import {DailyChargeSettleRequest} from './daily-charge-settle-request';

export class DailyChargeSettleDetail  extends DailyChargeSettleRequest{
  public ProcessStatuedDesc :string;
  public InvoicetypeDesc:string;
  public Invoiceamt:number;
  public CreateUserName: string;
  public CreateDateTime: Date;
  public ProcessStatued:number;
  public SettleorgName: string;
}
