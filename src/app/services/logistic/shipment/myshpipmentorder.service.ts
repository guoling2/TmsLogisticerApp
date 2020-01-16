import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../../models/tms-response.module';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyshpipmentorderService {

  constructor(private appConfiguration: AppConfiguration, private  httpclient: HttpClient) {
    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }
  /**
   * 自有订单反下达
   */
  public CancelMyShipment(orderLogisticDetailId: string): Observable<TmsResponseModle> {

    // const options = new HttpParams({ fromObject: data});


    return this.httpclient.put<TmsResponseModle>(
      this.appConfiguration.Server + '/api/Shipment/Cancel/' + orderLogisticDetailId, null)
      .pipe(
        tap(response => console.log(response.Info)));
  }

  /**
   * 自有订单下达
   */
  public CreateMyShipment(data: string): Observable<TmsResponseModle> {

    // const options = new HttpParams({ fromObject: data});


    return this.httpclient.put<TmsResponseModle>(
      this.appConfiguration.Server + '/api/Shipment/Create/' + data, data)
      .pipe(
        tap(response => console.log(response.Info)));
  }
}
