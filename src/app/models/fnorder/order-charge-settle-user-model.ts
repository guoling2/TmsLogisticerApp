import {FnChargeStatus} from '../fn-charge-status.enum';

export class OrderChargeSettleUserModel {

  public SettleId: string;
  public Settleorg: string;
  public ChargeAmt: number;
  public CaclType: string;
  public Paymentmode: string;
  public ProcessStatued: FnChargeStatus;
  public ProcessStatuedDesc: string;
  public FinishDateTime ?: Date;
  public IsFinish: boolean;
  public CreateUser: string;
  public CreateDateTime: Date;
  public ApplayMark: string;
  public NoCreateUserOrder: boolean;

}
