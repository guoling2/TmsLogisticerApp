import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LogisticStore} from "../../../models/LogisticStore/logistic-store";
import {LogisticStoreServiceService} from "../../../services/logisticstore/logisticstoreservice";

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
      A: '',
      B: ''
    });
  }

}
