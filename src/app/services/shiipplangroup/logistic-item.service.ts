import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShipSignDetailModel} from '../../models/shipment/ship-sign-detail-model';
import {tap} from 'rxjs/operators';
import {LogisticItemModel} from '../../models/shipment/logistic-item-model';

@Injectable({
  providedIn: 'root'
})
export class LogisticItemService {

  constructor(private appConfiguration: AppConfiguration, private  httpclient: HttpClient) {
    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  public  detail(orderLogisticDetailId: string, shipmentPlanId: string): Observable<LogisticItemModel> {
    return this.httpclient.get<LogisticItemModel>(
      this.appConfiguration.Server + '/api/LogisticItem/detail?shipmentId=' + orderLogisticDetailId + '&shipmentPlanId=' + shipmentPlanId)
      .pipe(
        tap(
          heroes => {
            console.log('读取了' + orderLogisticDetailId + '订单数据');
            console.log(heroes);
          }

        ));

  }

  public  list(groupId: string): Observable<LogisticItemModel[]> {
    return this.httpclient.get<LogisticItemModel[]>(
      this.appConfiguration.Server + '/api/LogisticItem/list?groupId=' + groupId)
      .pipe(
        tap(
          heroes => {

            console.log(heroes);
          }

        ));

  }

}
