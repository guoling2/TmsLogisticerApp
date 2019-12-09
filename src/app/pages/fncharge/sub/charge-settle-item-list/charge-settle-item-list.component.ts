import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DailyChargeSettleItemService} from '../../../../services/fncharge/daily-charge-settle-item.service';
import {CustomerAddressModle} from '../../../../models/customers/customer-address-modle';
import {DailyChargeSettleItemModel} from '../../../../models/fncharge/daily-charge-settle-detail';
import {ej} from '@syncfusion/ej2-data/dist/global';
import data = ej.data;
import {CustomeraddressaddComponent} from '../../../logisticcustomer/_sub/customeraddressadd/customeraddressadd.component';
import {AddChargeSettleItemComponent} from '../add-charge-settle-item/add-charge-settle-item.component';
import {MatDialog} from '@angular/material';
import {EmitService} from '../../../../help/emit-service';
import {TmsResponseModle} from '../../../../models/tms-response.module';
import {EmitAlertMessageHelo, MessageShowType} from '../../../../help/emit-alert-message';
import {TmssaveconfirmEvent} from '../../../../directive/tmssaveconfirm.directive';

@Component({
  selector: 'app-biz-chargesettleitemlist',
  templateUrl: './charge-settle-item-list.component.html',
  styleUrls: ['./charge-settle-item-list.component.css']
})
export class ChargeSettleItemListComponent implements OnInit {



  datasource: DailyChargeSettleItemModel[] = [];

  displayedColumns = [ 'ChargeSettleItemId', 'Methodcount', 'Methodtype', 'ChargeAmt', 'BizHappendDateTime', 'BillNo', 'Action'];

  @Input()
  SettleId:string;

  @Output('ItemChanged') onSuggest: EventEmitter<TmsResponseModle> = new EventEmitter();

  constructor(public emitService: EmitService,private dialog: MatDialog,private dailyChargeSettleItemService:DailyChargeSettleItemService) { }

  ngOnInit() {

   this.loaddata();
  }

  loaddata(){
    this.dailyChargeSettleItemService.Search(this.SettleId).subscribe(a=>{this.datasource=a});

  }

  additem(height: string, width: string) {

    //alert(height);

    const dialogRef = this.dialog.open(AddChargeSettleItemComponent, {
      height: height,
      width: width,
      disableClose: true,
      data:this.SettleId
    });

    dialogRef.afterClosed().subscribe(result => {
   //   let result=  result as TmsResponseModle;

      EmitAlertMessageHelo.ShowMessage(this.emitService,result, MessageShowType.Toast);
      this.loaddata();
      this.onSuggest.emit(result);
    });

  }

  deleteitem(action: TmssaveconfirmEvent) {


    if (action.ActionFlag === false) {
      return;
    }

    this.dailyChargeSettleItemService.Delete(action.ExtendData.toString()).subscribe(
      a=> {
        EmitAlertMessageHelo.ShowMessage(this.emitService,a, MessageShowType.Toast);
        this.loaddata();
        this.onSuggest.emit(a);
      }
     );
  }
}
