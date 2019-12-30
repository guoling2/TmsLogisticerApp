import {EventEmitter, Injectable} from '@angular/core';
import {OrderEventArg} from './order-event-arg';

@Injectable({
  providedIn: 'root'
})
export class FnAdminOrderService {


  constructor() { }

  public  LoadDataComplate: EventEmitter<OrderEventArg> = new EventEmitter();

  public LoadData(settleId: string[], orderAction: string) {

    settleId.forEach((a, b) => {

      this.LoadDataComplate.emit({
        SettleId: a, OrderAction: orderAction
      });
    });

  }
}


