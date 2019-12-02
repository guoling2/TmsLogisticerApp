import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomerTaxModel} from '../../../../models/base/customer-tax-model';
import {Formextension} from '../../../../help/formextension';
import {DailyChargeSettleRequest} from '../../../../models/fncharge/daily-charge-settle-request';
import {EmitAlertMessageHelo} from '../../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';
import {Router} from '@angular/router';
import {EmitService} from '../../../../help/emit-service';
import {DailyChargeSettleItemService} from '../../../../services/fncharge/DailychargesettleItem.service';
import {LogisticStoreServiceService} from '../../../../services/logisticstore/logisticstoreservice';

@Component({
  selector: 'app-biz-userchargeform',
  templateUrl: './usercharge.component.html',
  styleUrls: ['./usercharge.component.css']
})
export class UserchargeComponent implements OnInit {

  @Input('modelform')
  public form: FormGroup;

  @Input()
  public ActionType:number;


  public settleId:string;

  constructor(private router: Router,public emitService: EmitService,private dailyChargeSettleItemService:DailyChargeSettleItemService,private logisticStoreServiceService: LogisticStoreServiceService, private fb: FormBuilder) { }

  ngOnInit() {


    this.form.get('IsOpenInvoice').valueChanges.subscribe(($event) => {


      if ($event === true) {

        this.form.controls.Invoiceparty.setValidators(Validators.required);
        this.form.controls.Invoicetype.setValidators(Validators.required);
        this.form.controls.Partytaxno.setValidators(Validators.required);
        this.form.controls.Taxrate.setValidators(Validators.required);
        this.form.controls.FnTrxItem.setValidators(Validators.required);
      } else {


        this.form.controls.Invoiceparty.clearValidators();

        this.form.controls.Invoicetype.clearValidators();
        this.form.controls.Partytaxno.clearValidators();
        this.form.controls.Taxrate.clearValidators();
        this.form.controls.FnTrxItem.clearValidators();

        this.form.updateValueAndValidity();
      }
    });
  }

  getsystemprofile($event: any) {


    const taxmodel= <CustomerTaxModel>$event;
    if (taxmodel!=null){
      this.form.controls.Invoiceparty.setValue(taxmodel.Invoicetitle);
      // this.form.controls.Invoicetype.setValidators(Validators.required);
      this.form.controls.Partytaxno.setValue(taxmodel.Taxno);
      // this.form.controls.Taxrate.setValidators(Validators.required);
      // this.form.controls.FnTrxItem.setValidators(Validators.required);
    }

  }


  public savedata() {

    //const  control= this.form.controls['Settleorg'];

    if (this.form.valid === false) {

      //  alert('有错误');
      console.log(this.form);
      Formextension.validateAllFormFields(this.form);
      return;
    }
    const result=<DailyChargeSettleRequest>this.form.getRawValue();

    if(result.IsOpenInvoice===false){
      result.Taxrate=0; //不开票需要将数字类型赋值
    }
    if(this.ActionType===1){
      this.dailyChargeSettleItemService.Insert(result).subscribe(a=>{
        EmitAlertMessageHelo.ShowMessage(this.emitService,a);

        if (a.StatusCode==TmsresponseStatusCode.Succeed()){
          this.router.navigateByUrl('/biz/fncharge/user-detail/'+a.Data.toString());
          //alert('成功')
        }
      });
    }
    else if(this.ActionType===2){
      this.dailyChargeSettleItemService.Update(result).subscribe(a=>{
        EmitAlertMessageHelo.ShowMessage(this.emitService,a);

        if (a.StatusCode==TmsresponseStatusCode.Succeed()){
          this.router.navigateByUrl('/biz/fncharge/user-detail/'+a.Data.toString());
          //alert('成功')
        }
      });
    }

  }
}
