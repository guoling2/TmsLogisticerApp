import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {LogisticStoreServiceService} from '../../../../services/logisticstore/logisticstoreservice';
import {LogisticStore} from '../../../../models/LogisticStore/logistic-store';

@Component({
  selector: 'app-biz-mlogisticstoreall',
  templateUrl: './mlogisticstoreall.component.html',
  styleUrls: ['./mlogisticstoreall.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MlogisticstoreallComponent
    }
  ]
})
export class MlogisticstoreallComponent implements  OnInit, ControlValueAccessor  {


  @Input()
  placeholder: string;

  onChange;

  public logistticstores: LogisticStore[]|any;

  constructor(private logisticStoreServiceService: LogisticStoreServiceService) { }

  ngOnInit() {

    this.logisticStoreServiceService.StoreQuery().subscribe((value: LogisticStore[]) => {this.logistticstores = value; });
  }

  registerOnChange(fn: any): void {
    if (fn != null) {
      this.onChange = fn;
    }

  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    if (obj) {

    }
  }

}
