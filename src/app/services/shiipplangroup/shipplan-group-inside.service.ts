import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {TmshttpclientService} from '../tmshttpclient.service';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {InsideShipmentGroupModel} from '../../models/shipplangroup/inside-shipment-group-model';
import {ShimentNoSendGroupView} from '../../models/shipplangroup/shiment-no-send-group-view';
import {ShipmentLogisticItemAttchModel} from '../../models/shipplangroup/shipment-logistic-item-attch-model';

@Injectable({
  providedIn: 'root'
})
export class ShipplanGroupInsideService {

  constructor( private readonly appConfiguration: AppConfiguration,
               private  httpclient: HttpClient,
               private tmshttpclientService: TmshttpclientService) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:59471';
    }
    //  this.appConfiguration.Server = 'http://localhost:59471';
  }
  /**
   *  创建派车单头部信息
   */
  public CreateShipplanGroup(task: InsideShipmentGroupModel): Observable<TmsResponseModle> {
    return  this.tmshttpclientService.PostAsJson(task, '/api/ShipmentPlanGroupForInside/creategroup');
  }

  /**
   * 查询未审核的派车单
   */
  public SearchNoSendGroup(vehicelname: string): Observable<ShimentNoSendGroupView[]> {
    return  this.httpclient.get<ShimentNoSendGroupView[]>(
      this.appConfiguration.Server + '/api/ShipmentPlanGroupForInside/searchnosend?vehicelname=' + vehicelname);
  }

  /**
   * 附加托运单到派车单
   */
  public AttchShipmentItem(ShipmentLogisticItemAttch: ShipmentLogisticItemAttchModel): Observable<TmsResponseModle> {
    return  this.tmshttpclientService.PostAsJson(ShipmentLogisticItemAttch, '/api/ShipmentPlanGroupForInside/attchitem');
  }
  /**
   * 查询派车单
   */
  public InsideGroupDetail(shipmenggroupId: string): Observable<InsideShipmentGroupModel> {
    return  this.httpclient.get<InsideShipmentGroupModel>(
      this.appConfiguration.Server + '/api/ShipmentPlanGroupForInside/detail?shipmenggroupId=' + shipmenggroupId);
  }
  /**
   * 审核发运
   */
  public SetIsSend(shipmenggroupId: string): Observable<TmsResponseModle> {
    return  this.httpclient.put<TmsResponseModle>
    (this.appConfiguration.Server + '/api/ShipmentPlanGroupForInside/SetIsSend?shipmentGroupId=' + shipmenggroupId, null);
  }

  /**
   * 取消发运
   * @派车单号 shipmenggroupId
   */
  public SetIsNoSend(shipmenggroupId: string): Observable<TmsResponseModle> {
    return  this.httpclient.put<TmsResponseModle>
    (this.appConfiguration.Server + '/api/ShipmentPlanGroupForInside/SetIsNoSend?shipmentGroupId=' + shipmenggroupId, null);
  }
   /**
   * 删除未发运的派车单
   */
  public DelShipGroup(shipmenggroupId: string): Observable<TmsResponseModle> {
    return  this.httpclient.put<TmsResponseModle>
    (this.appConfiguration.Server + '/api/ShipmentPlanGroupForInside/del?shipmentGroupId=' + shipmenggroupId, null);
  }

}
