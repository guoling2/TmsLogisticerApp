import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataStateChangeEventArgs, PageSettingsModel, SortDescriptorModel, Sorts, SortSettingsModel} from '@syncfusion/ej2-grids';
import {GridComponent, SortService} from '@syncfusion/ej2-angular-grids';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Basereportconfig, EnterpriseCustomer} from '../../../../../services/base/basereportconfig';
import {Basereportservice} from '../../../../../services/base/basereportservice';
import {DataGridHelp} from '../../../../../SyncfusionHelp/data-grid-help';
import {LogistciOrderInterface} from '../../../../../pageservices/logistci-order-interface';
import {Commonsetting} from '../../../../../help/commonsetting';
import {MatDialog} from '@angular/material/dialog';
import {OrderAcceptComponent} from '../order-accept/order-accept.component';
import {OrderthumbnailComponent} from '../order-thumbnail/orderthumbnail.component';

@Component({
  selector: 'app-order-data-list',
  templateUrl: './order-data-list.component.html',
  styleUrls: ['./order-data-list.component.css'],
  providers: [SortService]
})
export class OrderDataListComponent implements OnInit , LogistciOrderInterface {


  @Input()
  gridheight: number;

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  public pageSettings = {currentPage: 1, pageSize: 100};

  initialSort: SortSettingsModel = new class implements SortSettingsModel {
    columns: SortDescriptorModel[];
  };
  public  inputfromgroup: any;

  constructor( public dialog: MatDialog, private fb: FormBuilder, private service: Basereportservice) { }


  ngOnInit() {
    this.gridheight = Commonsetting.GridHeight3s();
  }


  public get CurrentDataGrid() {
    return this.grid;
  }

  public SearchData(a: any) {
    this.inputfromgroup = a;

    const  pagesetting = this.grid.pageSettings;
    a.pageindex = pagesetting.currentPage - 1;
    a.pagesize = pagesetting.pageSize;


    console.log(a);
    this.service.SearchReport(EnterpriseCustomer.Report_EnterpriseOrderList, a).subscribe(result => {

      console.log(result);
      this.grid.dataSource = result;

    });
  }
  public Alert() {
    throw new Error("Method not implemented.");
  }


  dataStateChange($event: DataStateChangeEventArgs) {


    console.log($event.action);

    this.inputfromgroup = DataGridHelp.GetSortObject($event, this.inputfromgroup);

    this.SearchData( this.inputfromgroup);
  }

  choecustomer($event: MouseEvent, xnumber: string, s: string, s2: string) {

    this.dialog.open(OrderthumbnailComponent, {
      height: s,
      width: s2,
      disableClose: true,
      data: xnumber
    });
  }
}
