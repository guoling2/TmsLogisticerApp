import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {tap} from 'rxjs/operators';
import {InvoiceRequest} from '../../models/fncharge/invoice-request';
import {OrderChargeSettleUserModel} from '../../models/fnorder/order-charge-settle-user-model';
import {OrderChargeSettleLinkModel} from '../../models/fnorder/order-charge-settle-link-model';
import {OrderChargeDashbordModel} from '../../models/fnorder/order-charge-dashbord-model';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderChargeSettleService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  /**
   * 单据平仓
   * @应收凭单号 settleId
   * @是否强制平仓 force
   */
  public ForceFinishAmt(settleId: string, force: boolean): Observable<TmsResponseModle> {


    return this.httpclient.put<TmsResponseModle>(
      this.appConfiguration.Server + '/api/AdminOrderChaegeSettle/ForceFinishAmt/' + settleId + '/' + force, {})
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 更新收款金额
   */
  public UpdateReceiveAmt(settleId: string, inputmoney: number): Observable<TmsResponseModle> {


    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'});


    const formData: FormData = new FormData();
    formData.append('money', inputmoney.toFixed(2));
    // Object.keys(data).forEach(field => {
    //   console.log(field);
    //
    // });

    // console.log(formData);
    //
    // var model= {money: inputmoney};
   // const options = new HttpParams({ fromObject: formData});

    return this.httpclient.put<TmsResponseModle>(
      this.appConfiguration.Server + '/api/AdminOrderChaegeSettle/UpdateReceiveAmt/' + settleId,
      formData)
      .pipe(
        tap(heroes => console.log(heroes)));

  }
  /**
   * 数据汇总展示
   */
  public  OrderChargeDashbord(settileId: string): Observable<OrderChargeDashbordModel> {

    return this.httpclient.get<OrderChargeDashbordModel>(this.appConfiguration.Server + '/api/AdminOrderChaegeSettle/Dashbord/' + settileId)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 操作流程
   */
  public  LinkList(settileId: string): Observable<OrderChargeSettleLinkModel[]> {

    return this.httpclient.get<OrderChargeSettleLinkModel[]>(this.appConfiguration.Server + '/api/AdminOrderChaegeSettle/linklist/' + settileId)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 开票完成
   */
  public MotifyFianceNo(settleId: string, no: string): Observable<TmsResponseModle> {

    return this.httpclient.put<TmsResponseModle>(
      this.appConfiguration.Server + '/api/AdminOrderChaegeSettle/MotifyFianceNo/' + settleId,
      no)
      .pipe(
        tap(heroes => console.log(heroes)));

  }

  /**
   * 开票完成
   */
  public FinishInvoice(settleId: string): Observable<TmsResponseModle> {

    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/AdminOrderChaegeSettle/FinishInvoice/' + settleId, null)
      .pipe(
        tap(heroes => console.log(heroes)));

  }

  /**
   * 开票
   */
  public OpenInvoice(invoiceRequest: InvoiceRequest): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/AdminOrderChaegeSettle/OpenInvoice', JSON.stringify(invoiceRequest), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));

  }

  /**
   * 结单
   */
  public Finish(settleId: string): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '' +
      '/api/AdminOrderChaegeSettle/Finish/' + settleId, {}, {headers})
      .pipe(
        tap(heroes => console.log(heroes)));

  }
  /**
   * 接单
   */
  public Accept(settleId: string): Observable<TmsResponseModle> {

    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/AdminOrderChaegeSettle/Accept/' + settleId, {
      Action: 1
    })
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 退单
   */
  public UnAccept(settleId: string): Observable<TmsResponseModle> {

    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/AdminOrderChaegeSettle/UnAccept/' + settleId, {
      Action: 2
    })
      .pipe(
        tap(heroes => console.log(heroes)));

  }
}
