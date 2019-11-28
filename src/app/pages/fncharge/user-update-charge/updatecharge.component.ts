import {Component, OnInit, ViewChild} from '@angular/core';
import {EmitService} from '../../../help/emit-service';
import {DailyChargeSettleItemService} from '../../../services/fncharge/DailychargesettleItem.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserchargeComponent} from '../sub/usercharge/usercharge.component';

@Component({
  selector: 'app-updatecharge',
  templateUrl: './updatecharge.component.html',
  styleUrls: ['./updatecharge.component.css']
})
export class UpdatechargeComponent implements OnInit {


  public form: FormGroup;

  @ViewChild('userchargeform',{static:false})
  public  userchargeform:UserchargeComponent;

  constructor(private fb: FormBuilder,private emitService: EmitService,private dailyChargeSettleItemService:DailyChargeSettleItemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');


    this.dailyChargeSettleItemService.Detail(orderId).subscribe(a=>{

      this.form = this.fb.group({
        SettleId: a.SettleId,
        Settleorg: [a.Settleorg, Validators.required],
        Chargeparty: [a.Chargeparty, Validators.required],
        ChargeItem: [a.ChargeItem, Validators.required],
        ChargeAmt: a.ChargeAmt,
        Methodtype: [a.Methodtype, Validators.required],
        Methodcount:a.Methodcount,
        Chargedirection: [ a.Chargedirection.toString(), Validators.required],
        CaclType:a.CaclType,
        PayMoneyType: a.PayMoneyType,
        IsOpenInvoice: a.IsOpenInvoice,
        Invoiceparty: a.Invoiceparty,  // 受票方
        Invoicetype: a.Invoicetype.toString(),  // 开票类型
        Partytaxno:  a.Partytaxno,   // 税号
        Taxrate: a.Taxrate.toString(),  // 税率
        FnTrxItem: a.FnTrxItem // 开票项目
      });

    })
  }

  savedata() {
    this.userchargeform.savedata();
  }
}
