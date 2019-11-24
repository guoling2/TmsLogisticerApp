import {Component, Input, OnInit, QueryList} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CaclChargeItemServiceService} from '../../../services/CaclChargeItem/cacl-charge-item-service.service';
import {LogisticStore} from '../../../models/LogisticStore/logistic-store';
import {CaclChargeItemEntity} from '../../../models/CaclChargeItem/cacl-charge-item-model';
import {MatSelectChange} from '@angular/material';

@Component({
  selector: 'app-biz-cacl-charge-item',
  templateUrl: './cacl-charge-item.component.html',
  styleUrls: ['./cacl-charge-item.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CaclChargeItemComponent
    }
  ]
})
export class CaclChargeItemComponent implements OnInit, ControlValueAccessor {

  datasource: CaclChargeItemEntity[]|any;

  selected = '';

  disableSelect = false;

  onChange;

  @Input()
  displaylabel = '费用项目';

  constructor(private caclChargeItemServiceService: CaclChargeItemServiceService ) { }

  ngOnInit() {



    this.caclChargeItemServiceService.Search(null).subscribe(a => {

      this.datasource = a;
    });
  }

  writeValue(obj: any): void {

    this.selected = obj;
    console.log('mylogistiscstore2' + '写入' + obj);
    // throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    if (fn != null) {
      this.onChange = fn;
    }
  }
  registerOnTouched(fn: any): void {

    // if (fn != null) {
    //   this.onChange = fn;
    // }
    // throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {

    this.disableSelect = isDisabled;
    // throw new Error("Method not implemented.");
  }


  change($event: MatSelectChange) {
    this.onChange($event.value);
  }
}
