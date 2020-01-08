import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderChargeSettleUserModel} from '../../models/fnorder/order-charge-settle-user-model';
import {tap} from 'rxjs/operators';
import {SettleItemInvoiceResultModel} from '../../models/fncommon/settle-item-invoice-result-model';
import {SettleInvoiceModel} from '../../models/fncommon/settle-invoice-model';

@Injectable({
  providedIn: 'root'
})
export class SettleInvoiceService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }
  /**
   * 开票明细
   */
  public  Detail(settleInvoiceId: string): Observable<SettleInvoiceModel> {

    return this.httpclient.get<SettleInvoiceModel>(
      this.appConfiguration.Server + '/api/SettleInvoice/detail/' + settleInvoiceId)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
}
