import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ShipplanGroupOutsideService} from '../../../../services/shiipplangroup/shipplan-group-outside.service';
import {AlertMessageType, EmitAlertMessage, EmitAlertMessageHelo, MessageShowType} from '../../../../help/emit-alert-message';
import {InsideShipmentGroupModel} from '../../../../models/shipplangroup/inside-shipment-group-model';
import {OutsideShipmentGroupModel} from '../../../../models/shipplangroup/outside-shipment-group-model';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';
import {EmitService} from '../../../../help/emit-service';
import {LogisticItemComponentService} from '../../../../services/shiipplangroup/shipplan-item-service.service';
import {OpenOrdervalidationMessages} from '../../../myorder/openordervalidation';
import {OpenOutShipmentvalidationMessages} from '../../open-out-shipmentvalidation-messages';
import {Formextension} from '../../../../help/formextension';
import {ShipOutHeaditemComponent} from '../sub/headitem/headitem.component';

@Component({
  selector: 'app-outside-plan-group-create',
  templateUrl: './outside-plan-group-create.component.html',
  styleUrls: ['./outside-plan-group-create.component.css']
})
export class OutsidePlanGroupCreateComponent implements OnInit {

  public saveform: FormGroup;

  public inputtasktype: string;

  private openOutShipmentvalidationMessages: object = OpenOutShipmentvalidationMessages;


  @ViewChild('logistichead', {static: false})
  shipOutHeaditemComponent: ShipOutHeaditemComponent;

  constructor( private fb: FormBuilder,
               private emitService: EmitService,
               private route: ActivatedRoute,
               private router: Router,
               private itemServiceService: LogisticItemComponentService,
               private shipplanGroupOutsideService: ShipplanGroupOutsideService) { }

  ngOnInit() {
    this.inputtasktype = this.route.snapshot.params.id;
    this.saveform = this.fb.group({});
  }

  savedata() {




  }

  save($event: boolean) {

    if ($event === false) {
      return;
    }
    if (this.itemServiceService.LogisticItemSource.length === 0) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '没有可以派车的托运单', MessageShowType.Toast));
    }
    const bm = this.saveform.controls.LogisticFeeBlanceMethod.value;

    if (bm === null) {
      this.saveform.patchValue({LogisticFeeBlanceMethod: 0});
    }


    // if (this.saveform.valid === false) {
    //
    //   this.shipOutHeaditemComponent.Update();
    //   console.log('this.saveform.errors');
    //
    //   console.log(this.saveform.errors);
    //
    //  // Formextension.getFormValidationErrorsAndEmit(this.saveform, this.openOutShipmentvalidationMessages, this.emitService);
    //   return;
    //
    //   // this.emitService.eventEmit.emit(
    //   //   new EmitAlertMessage(AlertMessageType.Error, '系统信息', '验证失败', MessageShowType.Toast));
    //   // return;
    // }

    const model = this.saveform.getRawValue() as OutsideShipmentGroupModel;

    if (model.UseVehicelContainerId === null) {
      model.UseVehicelContainerId = 0;
    }
    model.SendShipmentIds = [];
    this.itemServiceService.LogisticItemSource.forEach(a => {
      model.SendShipmentIds.push(a.ShipmentId);
    });

    console.log(model);

    this.shipplanGroupOutsideService.CreateShipplanGroup(model).subscribe(a => {


      if (a.StatusCode === TmsresponseStatusCode.Succeed()) {
        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));

        // biz/shipment/outside-shipment-detail/PG10000420191022000003
        this.router.navigateByUrl('biz/shipment/outside-shipment-detail/' + a.Data);

      } else {

        EmitAlertMessageHelo.ShowMessage( this.emitService, a, MessageShowType.Toast);

        // this.emitService.eventEmit.emit(
        //   new EmitAlertMessage(AlertMessageType.Error, '系统信息', a.Info, MessageShowType.Toast));
      }
    });
  }

}
