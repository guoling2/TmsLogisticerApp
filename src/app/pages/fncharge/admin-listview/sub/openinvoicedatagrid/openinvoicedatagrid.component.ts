import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DataStateChangeEventArgs, GridComponent} from '@syncfusion/ej2-angular-grids';
import {FormBuilder} from '@angular/forms';
import {Basereportservice} from '../../../../../services/base/basereportservice';
import {LogistciOrderInterface} from '../../../../../pageservices/logistci-order-interface';
import {FinanceReport} from '../../../../../services/base/basereportconfig';
import {DataGridHelp} from '../../../../../SyncfusionHelp/data-grid-help';

@Component({
  selector: 'app-biz-openinvoicedatagrid',
  templateUrl: './openinvoicedatagrid.component.html',
  styleUrls: ['./openinvoicedatagrid.component.css']
})
export class OpeninvoicedatagridComponent implements OnInit,LogistciOrderInterface {

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  @Input()
  gridheight: number;

  public  inputfromgroup: any;

  constructor(private fb: FormBuilder, private service: Basereportservice) { }

  ngOnInit() {
  }

  public get CurrentDataGrid() {
    return this.grid;
  }
  Alert() {
  }
  SearchData(paramter: any) {
    this.inputfromgroup = paramter;

    const  pagesetting = this.grid.pageSettings;
    paramter.pageindex = pagesetting.currentPage - 1;
    paramter.pagesize = pagesetting.pageSize;


    console.log(paramter);
    this.service.SearchReport(FinanceReport.Report_DailyChargeSettleItemForAdminAtInvoice, paramter).subscribe(result => {

      console.log(result);
      this.grid.dataSource = result;

    });
  }

  dataStateChange($event: DataStateChangeEventArgs) {

    console.log($event.action);

    this.inputfromgroup = DataGridHelp.GetSortObject($event, this.inputfromgroup);

    this.SearchData( this.inputfromgroup);
  }

  ExcelOut(paramter: any) {
  }
}
