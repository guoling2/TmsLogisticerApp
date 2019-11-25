import {Component, Input, OnInit} from '@angular/core';
import {BaseDirectoryContentService} from '../../../services/base/base-directory-content.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatSelectChange} from '@angular/material';
import {LogisticStore} from '../../../models/LogisticStore/logistic-store';
import {BaseDirectoryContentModel} from '../../../models/base/base-directory-content-model';

@Component({
  selector: 'app-biz-basedirectorycontent',
  templateUrl: './base-directory-content.component.html',
  styleUrls: ['./base-directory-content.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BaseDirectoryContentComponent
    }
  ]
})
export class BaseDirectoryContentComponent implements OnInit, ControlValueAccessor {


  selected = '';
  disableSelect = false;
  logistticstores: BaseDirectoryContentModel[];


  @Input()
  GroupType: string;

  @Input()
  displaylabel = '类型选择';

  onChange;

  constructor(private baseDirectoryContentService: BaseDirectoryContentService) { }

  ngOnInit() {

    this.baseDirectoryContentService.SearchByGroup(this.GroupType).subscribe(a => {

      this.logistticstores = a;

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
