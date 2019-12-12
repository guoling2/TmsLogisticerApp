export class Unacceptorderrequest {

  public OrderPreparedLogisticId: string;
  public CustomerOrderId: string;
  public ClosedReason: string;

}

/**
 * 预约取消
 */
export  class CancelSendOrderRequest {

  public OrderPreparedLogisticIds: string[];

  public CancelReason: string;
}
