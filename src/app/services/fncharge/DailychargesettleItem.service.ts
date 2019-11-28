import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {tap} from 'rxjs/operators';
import {DailyChargeSettleRequest} from '../../models/fncharge/daily-charge-settle-request';
import {DailyChargeSettleDetail} from '../../models/fncharge/daily-charge-settle-detail';


@Injectable({
  providedIn: 'root'
})
export class DailyChargeSettleItemService {

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



    return this.httpclient.delete<TmsResponseModle>(this.appConfiguration.Server + '/api/DailyChargeSettle/Delete/'+ dataid)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 新增
   */
  public  Insert(data: DailyChargeSettleRequest): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/DailyChargeSettle/Insert', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }



  public  Submit(settleId:string): Observable<TmsResponseModle> {

    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/DailyChargeSettle/Submit/'+settleId,null)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 修改
   */
  public  Update(data: DailyChargeSettleRequest): Observable<TmsResponseModle> {



    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/DailyChargeSettle/Update/'+ data.SettleId, data)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 明细
   */
  public  Detail(Id: string ): Observable<DailyChargeSettleDetail> {

    return this.httpclient.get<DailyChargeSettleDetail>(this.appConfiguration.Server + '/api/DailyChargeSettle/detail/' + Id)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

}
