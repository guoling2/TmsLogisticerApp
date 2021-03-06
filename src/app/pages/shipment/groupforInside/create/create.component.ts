import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VehicelTaskTypeDataSource} from '../../../../modeldata/vehicel-task-type';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {GroupOrderAtionModel} from '../../groupforInside/group-order-ation-model';
import {UpdateModelType} from '../../../../models/tms-data-entity';
import {LogisticItemService} from '../../../../services/shiipplangroup/logistic-item.service';
import {LogisticItemComponentService} from '../../../../services/shiipplangroup/shipplan-item-service.service';
import {EmitService} from '../../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {ShipplanGroupInsideService} from '../../../../services/shiipplangroup/shipplan-group-inside.service';
import {InsideShipmentGroupModel} from '../../../../models/shipplangroup/inside-shipment-group-model';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';
import {DialogservicesService} from '../../../../help/dialogservices.service';

@Component({
  selector: 'app-shipmentinsidegroup-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class InsidePlanGroupCreateComponent implements OnInit {
  public saveform: FormGroup;
  vehicelTaskTypeDataSource = new VehicelTaskTypeDataSource();
  @Input() orderStoreSubject: BehaviorSubject<GroupOrderAtionModel>;


  public inputtasktype: string;

  constructor( private shipplanGroupInsideServiceService: ShipplanGroupInsideService,
               private  dialogx: DialogservicesService,
               private groupInsideServiceService: ShipplanGroupInsideService,
               public emitService: EmitService,
               private logisticItemService: LogisticItemService,
               private itemServiceService: LogisticItemComponentService,
               private fb: FormBuilder,
               private route: ActivatedRoute,
               private router: Router) { }


  ngOnInit() {

     this.inputtasktype = this.route.snapshot.params.id;

     this.saveform = this.fb.group({});


    // this.orderStoreSubject.subscribe((a: GroupOrderAtionModel) => {
    //
    //   if (a != null) {
    //
    //     this.logisticItemService.detail(a.ShipmentId, '').subscribe(item => {
    //       if (item.ShipmentPlanId === null) {
    //         this.itemServiceService.AttchItem(item);
    //       } else {
    //         this.emitService.eventEmit.emit(
    //           new EmitAlertMessage(AlertMessageType.Error, '系统信息', '已经添加', MessageShowType.Toast));
    //       }
    //
    //     });
    //   }
    // });
  }


  savedata() {


    console.log(this.saveform.getRawValue());


    if ( this.itemServiceService.LogisticItemSource.length === 0) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '没有可以派车的托运单', MessageShowType.Toast));
    }

    const bm = this.saveform.controls['LogisticFeeBlanceMethod'].value;

    if (bm === null) {
      this.saveform.patchValue({LogisticFeeBlanceMethod: 0});
    }

    const alerter = {
      Title: '确认',
      Message: '是否创建派车单？',
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if ( !result ) {
          return;
        }
        try {
          this.savedata2();
        } finally {

        }

      })};
    this.dialogx.openDialog(alerter);



  }


  savedata2() {

    if (this.saveform.valid === true) {


      const model = <InsideShipmentGroupModel>this.saveform.getRawValue();
      model.SendShipmentIds = [];
      this.itemServiceService.LogisticItemSource.forEach(a => {
        model.SendShipmentIds.push(a.ShipmentId);
      });
      this.groupInsideServiceService.CreateShipplanGroup(model).subscribe(a => {
        if (a.StatusCode === TmsresponseStatusCode.Succeed()) {
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Info, '系统信息', '派车单运输信息创建成功', MessageShowType.Toast));
          this.router.navigateByUrl('biz/shipment/groupdetail/' + a.Data);
          // const i = this.itemServiceService.LogisticItemSource.length - 1;
          // this.itemServiceService.LogisticItemSource.forEach((item, index) => {
          //   this.shipplanGroupInsideServiceService.AttchShipmentItem({
          //     TaskType: '',
          //     ShipmentId: item.ShipmentId,
          //     ShipmentGrpupId: a.Data,
          //     SquenceId: item.SquenceId
          //   }).subscribe(resultx => {
          //
          //     if (i === index) {
          //
          //
          //       this.router.navigateByUrl('biz/shipment/groupdetail/' + a.Data);
          //     }
          //
          //     this.emitService.eventEmit.emit(
          //       new EmitAlertMessage(AlertMessageType.Info, '系统信息', resultx.Info, MessageShowType.Toast));
          //   });
          //
          // });
          // this.emitService.eventEmit.emit(
          //   new EmitAlertMessage(AlertMessageType.Info, '系统信息', '开始附加托运单', MessageShowType.Toast));
        } else {
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Error, '系统信息', a.Info, MessageShowType.Toast));
        }
      });
    } else {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '验证失败', MessageShowType.Toast));
    }
  }
}
