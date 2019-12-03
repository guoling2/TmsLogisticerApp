import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {tap} from 'rxjs/operators';
import {InvoiceRequest} from '../../models/fncharge/invoice-request';

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
   * 开票
   */
  public OpenInvoice(invoiceRequest: InvoiceRequest): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/AdminDailyChargeSettle/OpenInvoice', JSON.stringify(invoiceRequest), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));

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
