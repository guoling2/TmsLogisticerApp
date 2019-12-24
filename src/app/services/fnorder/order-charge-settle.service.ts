import { Injectable } from '@angular/core';
import {OrderChargeSettleRequestModel} from '../../models/fnorder/order-charge-settle-request-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {TmsResponseModle} from '../../models/tms-response.module';
import {Observable} from 'rxjs';
import {ej} from '@syncfusion/ej2-data/dist/global';
import data = ej.data;
import {OrderChargeSettleModel} from '../../models/fnorder/order-charge-settle-model';
import {OrderReveiveFeeAttchModel} from '../../models/fnorder/order-reveive-fee-attch-model';
import {OrderChargeSettleUserModel} from '../../models/fnorder/order-charge-settle-user-model';

@Injectable({
  providedIn: 'root'
})
export class OrderChargeSettleService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  /**
   * 删除
   */
  public Delete(dataid: string): Observable<TmsResponseModle> {



    return this.httpclient.delete<TmsResponseModle>(this.appConfiguration.Server + '/api/OrderChargeSettle/Delete/' + dataid)
      .pipe(
        tap(heroes => console.log(heroes)));
  }


  /**
   * 新增
   */
  // tslint:disable-next-line:no-shadowed-variable
  public  Insert(data: OrderChargeSettleRequestModel): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // tslint:disable-next-line:max-line-length
    return this.httpclient.post<TmsResponseModle>(
      this.appConfiguration.Server + '/api/OrderChargeSettle/Insert',
      JSON.stringify(data),
      {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 获取创建的结算单
   */
  public  NoApplaySettle(): Observable<OrderChargeSettleModel[]> {

    return this.httpclient.get<OrderChargeSettleModel[]>(this.appConfiguration.Server + '/api/OrderChargeSettle/NoApplaySettle')
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 附加应收运费
   */
  public  AttchFee(orderReveiveFeeAttch: OrderReveiveFeeAttchModel): Observable<TmsResponseModle> {

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/OrderChargeSettle/AttchFee', orderReveiveFeeAttch)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 结算明细
   */
  public  Detail(settileId: string): Observable<OrderChargeSettleUserModel> {

    return this.httpclient.get<OrderChargeSettleUserModel>(this.appConfiguration.Server + '/api/OrderChargeSettle/Detail/' + settileId)
      .pipe(
        tap(heroes => console.log(heroes)));
  }


}
