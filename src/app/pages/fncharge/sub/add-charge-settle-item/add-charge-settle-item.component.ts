import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CustomerProfileModle} from '../../../../models/customers/customer-profile-modle';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Formextension} from '../../../../help/formextension';
import {DailyChargeSettleRequest} from '../../../../models/fncharge/daily-charge-settle-request';
import {DailyChargeSettleItemModel} from '../../../../models/fncharge/daily-charge-settle-detail';
import {DailyChargeSettleItemService} from '../../../../services/fncharge/daily-charge-settle-item.service';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';

@Component({
  selector: 'app-add-charge-settle-item',
  templateUrl: './add-charge-settle-item.component.html',
  styleUrls: ['./add-charge-settle-item.component.css']
})
export class AddChargeSettleItemComponent implements OnInit {

  public form: FormGroup;

  public ErrorMsg:string="";

  constructor(private dailyChargeSettleItemService:DailyChargeSettleItemService,private fb: FormBuilder,public dialogRef: MatDialogRef<AddChargeSettleItemComponent>, @Inject(MAT_DIALOG_DATA) public settleId: string) { }

  ngOnInit() {

    this.form = this.fb.group({
      SettleId: [this.settleId, Validators.required] ,
      Methodcount:[ '1', Validators.min(1)],
      Methodtype:[ '', Validators.required],
      ChargeAmt: [ '1', Validators.min(1)],
      BizHappendDateTime: [new Date(),Validators.required],
      DetailMark: '',
      BillNo:''
    });

    //alert(this.settleId);
  }

  savedata() {

    if (this.form.valid === false) {

      //  alert('有错误');
     // console.log(this.form);
      Formextension.validateAllFormFields(this.form);
      return;
    }
    const result = this.form.getRawValue() as DailyChargeSettleItemModel;

    this.dailyChargeSettleItemService.Insert(result)
      .subscribe(a=>{
          if (a.StatusCode!=TmsresponseStatusCode.Succeed()){
            this.ErrorMsg=a.Error.ErrorMsg;
          }else {

            a.Info="费用新增成功";
            this.dialogRef.close(a);
          }
      });
    console.log(result);
  }
}
