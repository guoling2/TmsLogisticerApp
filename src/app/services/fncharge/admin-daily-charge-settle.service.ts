import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminDailyChargeSettleService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }


  /**
   * 接单
   */
  public Accept(settleId: string): Observable<TmsResponseModle> {

    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/AdminDailyChargeSettle/Accept/'+settleId,{
      Action:1
    })
      .pipe(
        tap(heroes => console.log(heroes)));

  }
  /**
   * 退单
   */
  public UnAccept(settleId: string): Observable<TmsResponseModle> {

    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/AdminDailyChargeSettle/UnAccept/'+settleId,{
      Action:2
    })
      .pipe(
        tap(heroes => console.log(heroes)));

  }
}
