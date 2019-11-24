import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {LogisticStore} from '../../../models/LogisticStore/logistic-store';
import {LogisticStoreServiceService} from '../../../services/logisticstore/logisticstoreservice';

@Component({
  selector: 'app-new-charge',
  templateUrl: './new-charge.component.html',
  styleUrls: ['./new-charge.component.css']
})
export class NewChargeComponent implements OnInit {

  public form: FormGroup;
  public logistticstores: LogisticStore[]|any;

  constructor(private logisticStoreServiceService: LogisticStoreServiceService, private fb: FormBuilder) { }

  ngOnInit() {

    this.logisticStoreServiceService.StoreQuery().subscribe((value: LogisticStore[]) => {this.logistticstores = value; });

    this.form = this.fb.group({
      SettleId: '系统生成',
      Settleorg: '',
      Chargeparty: '',
      ChargeItem: '',
      ChargeAmt: 0,
      Chargedirection: '',
      CaclType: '',
      PayMoneyType: ''
    });
  }

  savedata() {

    console.log(this.form.getRawValue());
  }
}
