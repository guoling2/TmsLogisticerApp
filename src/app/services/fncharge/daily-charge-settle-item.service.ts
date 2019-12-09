import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TmsResponseModle} from '../../models/tms-response.module';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DailyChargeSettleItemModel} from '../../models/fncharge/daily-charge-settle-detail';
import {DailyChargeSettleRequest} from '../../models/fncharge/daily-charge-settle-request';

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



    return this.httpclient.delete<TmsResponseModle>(this.appConfiguration.Server + '/api/DailyChargeSettleItem/Delete/'+ dataid)
      .pipe(
        tap(heroes => console.log(heroes)));
  }


  /**
   * 新增
   */
  public  Insert(data: DailyChargeSettleItemModel): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/DailyChargeSettleItem/Insert', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 修改
   */
  public  Update(data: DailyChargeSettleItemModel): Observable<TmsResponseModle> {



    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/查询地址1/Update'+ data, data)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 明细
   */
  public  Detail(Id: string ): Observable<DailyChargeSettleItemModel> {

    return this.httpclient.get<DailyChargeSettleItemModel>(this.appConfiguration.Server + '/api/查询地址1/Detail?Id=' + Id)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 查询
   */
  public Search(settleId: string): Observable<DailyChargeSettleItemModel[]> {

   // const options = new HttpParams({ fromObject: data});

    return this.httpclient.get<DailyChargeSettleItemModel[]>(this.appConfiguration.Server + '/api/DailyChargeSettleItem/list/'+settleId)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
}
