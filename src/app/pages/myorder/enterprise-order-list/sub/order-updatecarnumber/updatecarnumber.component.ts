import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Unacceptorderrequest} from '../order-unaccept/unacceptorderrequest';
import {EnterpriseOrderServiceService} from '../../../../../services/CustomerOrder/enterprise-order-service.service';
import format from "date-fns/format";
import {TmsresponseStatusCode} from '../../../../../models/tms-response.module';

@Component({
  selector: 'app-updatecarnumber',
  templateUrl: './updatecarnumber.component.html',
  styleUrls: ['./updatecarnumber.component.css']
})
export class UpdatecarnumberComponent implements OnInit {
  carnumber: string;

  public PlanCarTime: Date;

  public  errormsg='';
  constructor(private enterpriseOrderServiceService: EnterpriseOrderServiceService, public dialogRef: MatDialogRef<UpdatecarnumberComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string[]) { }

  ngOnInit() {

    console.log(this.data);
  }

  save() {

    console.log(this.data);


    if(this.PlanCarTime==undefined){
      this.errormsg="提货时间不能为空";
    }
    this.enterpriseOrderServiceService.MotifyCarNumber(
      {
        OrderPreparedLogisticIds: this.data,
        Carnumber: this.carnumber,
        PlanCarTime:format(this.PlanCarTime, 'yyyy-MM-dd HH:mm:ss')}).subscribe(a => {

          if(a.StatusCode!=TmsresponseStatusCode.Succeed()){
            this.errormsg=a.Error.ErrorMsg;
          }else{
            this.dialogRef.close(a);
          }


    });

  }
}
