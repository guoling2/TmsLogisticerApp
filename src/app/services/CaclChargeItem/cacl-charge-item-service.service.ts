import { Injectable } from '@angular/core';
import {CaclChargeItemEntity} from '../../models/CaclChargeItem/cacl-charge-item-model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {TmsResponseModle} from '../../models/tms-response.module';

@Injectable({
  providedIn: 'root'
})
export class CaclChargeItemServiceService {

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



    return this.httpclient.delete<TmsResponseModle>(this.appConfiguration.Server + '/api/查询地址1/Delete'+ dataid)
      .pipe(
        tap(heroes => console.log(heroes)));
  }


  /**
   * 新增
   */
  public  Insert(data: CaclChargeItemEntity): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/查询地址1/Insert', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 修改
   */
  public  Update(data: CaclChargeItemEntity): Observable<TmsResponseModle> {



    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/查询地址1/Update' + data.ItemCode, data)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 明细
   */
  public  Detail(Id: string ): Observable<CaclChargeItemEntity> {

    return this.httpclient.get<CaclChargeItemEntity>(this.appConfiguration.Server + '/api/查询地址1/Detail?Id=' + Id)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 查询
   */
  public Search(data: any): Observable<CaclChargeItemEntity[]> {

    const options = new HttpParams({ fromObject: data});

    return this.httpclient.get<CaclChargeItemEntity[]>(this.appConfiguration.Server + '/api/CaclChargeItem/SearchCaclItem', {params: options})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
}
