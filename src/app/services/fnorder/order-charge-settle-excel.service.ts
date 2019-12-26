import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {tap} from 'rxjs/operators';
import {OrderChargeExcelAnalysisRequest} from '../../models/fnorder/order-charge-excel-analysis-request';

@Injectable({
  providedIn: 'root'
})
export class OrderChargeSettleExcelService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  public Analysis(AnalysisRequest: OrderChargeExcelAnalysisRequest): Observable<TmsResponseModle> {


    const formData: FormData = new FormData();

    Object.keys(AnalysisRequest).forEach(field => {
      console.log(field);
      formData.append(field, AnalysisRequest[field]);
    });

    console.log(formData);

    return this.httpclient.post<TmsResponseModle>(
      this.appConfiguration.Server + '/api/OrderChargeSettleExcel/Analysis' , formData)
      .pipe(
        tap(heroes => console.log(heroes)));

    // const headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});
    //
    // // tslint:disable-next-line:max-line-length
    // return this.httpclient.post<TmsResponseModle>(
    //   this.appConfiguration.Server + '/api/OrderChargeSettleExcel/Analysis',
    //   AnalysisRequest,
    //   {headers})
    //   .pipe(
    //     tap(heroes => console.log(heroes)));
  }
}
