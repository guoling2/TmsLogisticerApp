import { Component, OnInit } from '@angular/core';
import {DailyChargeSettleItemService} from '../../../services/fncharge/DailychargesettleItem.service';
import {DailyChargeSettleDetail} from '../../../models/fncharge/daily-charge-settle-detail';
import {ActivatedRoute, Router} from '@angular/router';
import {TmssaveconfirmEvent} from '../../../directive/tmssaveconfirm.directive';
import {TmsResponseModle, TmsresponseStatusCode} from '../../../models/tms-response.module';
import {Observable} from 'rxjs';
import {EmitAlertMessageHelo} from '../../../help/emit-alert-message';
import {EmitService} from '../../../help/emit-service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {


  dailycharge:DailyChargeSettleDetail;

  alledit:boolean=true;

  allsubit:boolean=true;

  alldel:boolean=true;

  constructor(private emitService: EmitService,private dailyChargeSettleItemService:DailyChargeSettleItemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.ReloadData();
  }

  bizclick(action:TmssaveconfirmEvent) {


    if (action.ActionFlag==false){
      return;
    }
   let result:Observable<TmsResponseModle>;

   switch (action.ExtendData.toString()) {
     case 'del':
       result= this.DelData();
       break;
     case 'submit':
       result= this.SubmitData();
       break;
     case  'refresh':
       this.ReloadData();
       break;
     case 'edit':
       this.router.navigateByUrl('/biz/fncharge/user-edit/'+this.dailycharge.SettleId);
       break;
   }

   if(result!=undefined){

     result.subscribe(a=>{

       EmitAlertMessageHelo.ShowMessage(this.emitService,a);

       if (a.StatusCode==TmsresponseStatusCode.Succeed()){

         switch (action.ExtendData.toString()) {
           case 'del':
             this.router.navigateByUrl('/biz/fncharge/listview');
             break;
           case 'submit':
             this.ReloadData();
             break;
         }
       }
     });
   }


  }


  private DelData():Observable<TmsResponseModle>{

    return  this.dailyChargeSettleItemService.Delete(this.dailycharge.SettleId);
  }

  private  SubmitData():Observable<TmsResponseModle>{

    return  this.dailyChargeSettleItemService.Submit(this.dailycharge.SettleId);
  }

  private  ReloadData(){

    const orderId = this.route.snapshot.paramMap.get('id');

    this.dailyChargeSettleItemService.Detail(orderId).subscribe(a=>{
      console.log(a);

      if (a.ProcessStatued>=1) {
        this.alledit = false;

        this.allsubit = false;

        this.alldel = false;
      }
      this.dailycharge=a;});
  }
}
