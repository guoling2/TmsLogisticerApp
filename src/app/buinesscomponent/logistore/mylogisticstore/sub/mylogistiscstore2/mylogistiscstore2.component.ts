import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LogisticStoreAuthorizeServiceService} from '../../../../../services/logisticstore/logistic-store-authorize-service.service';
import {LogisticStore} from '../../../../../models/LogisticStore/logistic-store';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import {MatSelect, MatSelectChange} from '@angular/material';

@Component({
  selector: 'app-biz-mylogistiscstore2',
  templateUrl: './mylogistiscstore2.component.html',
  styleUrls: ['./mylogistiscstore2.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: Mylogistiscstore2Component
    }
  ]
})
export class Mylogistiscstore2Component implements OnInit, ControlValueAccessor {

  selected = '';
  disableSelect = false;
  logistticstores: LogisticStore[];

  @Input()
  placeholder: string;

  // tslint:disable-next-line: no-input-rename
  @Input('mat-form-field-class') matformclass: string;

  @Input()
  displaylabel = '物流网点';

  @ViewChild('mystorexx', { static: false}) mystoredownlist: MatSelect;

  @Input()
  public saveform: FormGroup;
  @Input()
  public SettingFormControlName: string;


  onChange;

  constructor(private logisticStoreAuthorizeServiceService: LogisticStoreAuthorizeServiceService) { }

  ngOnInit() {


    const firstNameControl = new FormControl();

    this.logisticStoreAuthorizeServiceService.MyStores().subscribe( (value: LogisticStore[]) => {

      this.logistticstores = value;

      console.log(this.mystoredownlist);


    });

    // if (this.saveform != null) {
    //
    //   if (this.saveform.contains(this.SettingFormControlName) !== true) {
    //     this.saveform.addControl(this.SettingFormControlName, new FormControl());
    //
    //   }
    //
    //   console.log(this.saveform.controls);
    // }

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
