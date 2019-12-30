import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LogistciOrderInterface} from '../../../../../pageservices/logistci-order-interface';
import {DataStateChangeEventArgs, GridComponent} from '@syncfusion/ej2-angular-grids';
import {FormBuilder} from '@angular/forms';
import {Basereportservice} from '../../../../../services/base/basereportservice';
import {FinanceReport} from '../../../../../services/base/basereportconfig';
import {DataGridHelp} from '../../../../../SyncfusionHelp/data-grid-help';

@Component({
  selector: 'app-order-settle-data-grid',
  templateUrl: './order-settle-data-grid.component.html',
  styleUrls: ['./order-settle-data-grid.component.css']
})
export class OrderSettleDataGridComponent implements OnInit, LogistciOrderInterface {

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

  ExcelOut(paramter: any) {
  }

  SearchData(paramter: any) {

    let sqlread = FinanceReport.Report_OrderChargeSettleForAdminQuery;
    if (paramter.ProcessStatued === '40') {
      sqlread = FinanceReport.Report_OrderChargeSettleForAdminOpenInvoiceQuery;
    }

    this.inputfromgroup = paramter;

    const  pagesetting = this.grid.pageSettings;
    paramter.pageindex = pagesetting.currentPage - 1;
    paramter.pagesize = pagesetting.pageSize;

    this.service.SearchReport(sqlread, paramter).subscribe(result => {

      this.grid.dataSource = result;

    });
  }
  dataStateChange($event: DataStateChangeEventArgs) {

    this.inputfromgroup = DataGridHelp.GetSortObject($event, this.inputfromgroup);

    this.SearchData( this.inputfromgroup);
  }

}
