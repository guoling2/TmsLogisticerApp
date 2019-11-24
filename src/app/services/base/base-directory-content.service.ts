import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {TmsResponseModle} from '../../models/tms-response.module';
import {Observable} from 'rxjs';
import {BaseDirectoryContentModel} from '../../models/base/base-directory-content-model';

@Injectable({
  providedIn: 'root'
})
export class BaseDirectoryContentService {

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



    return this.httpclient.delete<TmsResponseModle>(this.appConfiguration.Server + '/api/查询地址1/Delete' + dataid)
      .pipe(
        tap(heroes => console.log(heroes)));
  }


  /**
   * 新增
   */
  public  Insert(data: BaseDirectoryContentModel): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/查询地址1/Insert', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 修改
   */
  public  Update(data: BaseDirectoryContentModel): Observable<TmsResponseModle> {



    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/查询地址1/Update' + data.ContentText, data)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 明细
   */
  public  Detail(Id: string ): Observable<BaseDirectoryContentModel> {

    return this.httpclient.get<BaseDirectoryContentModel>(this.appConfiguration.Server + '/api/查询地址1/Detail?Id=' + Id)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 查询
   */
  public SearchByGroup(type: string): Observable<BaseDirectoryContentModel[]> {

   // const options = new HttpParams({ fromObject: data});

    return this.httpclient.get<BaseDirectoryContentModel[]>(this.appConfiguration.Server + '/api/BaseDirectoryContent/Search/' + type)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
}
