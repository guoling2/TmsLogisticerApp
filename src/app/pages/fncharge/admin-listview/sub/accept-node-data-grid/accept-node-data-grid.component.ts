import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LogistciOrderInterface} from '../../../../../pageservices/logistci-order-interface';
import {FormBuilder} from '@angular/forms';
import {Basereportservice} from '../../../../../services/base/basereportservice';
import {DataStateChangeEventArgs, GridComponent, SortService} from '@syncfusion/ej2-angular-grids';
import {EnterpriseCustomer, FinanceReport} from '../../../../../services/base/basereportconfig';
import {DataGridHelp} from '../../../../../SyncfusionHelp/data-grid-help';
import {Commonsetting} from '../../../../../help/commonsetting';

@Component({
  selector: 'app-fnchaege-acceptnode-datagrid',
  templateUrl: './accept-node-data-grid.component.html',
  styleUrls: ['./accept-node-data-grid.component.css']
})
export class AcceptAndFinshNodeDataGridComponent implements OnInit,LogistciOrderInterface {

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  @Input()
  gridheight: number;

  @Input()
  reporttype:number; //1 是 接单  2是结束

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

    let retprt="";
    if(this.reporttype==1){
      retprt=FinanceReport.Report_DailyChargeSettleItemForAdminAtSubmit;
    }
    else {
      retprt=FinanceReport.Report_DailyChargeSettleItemForAdminAtFinish;
    }
    this.service.SearchReport(retprt, paramter).subscribe(result => {

      console.log(result);
      this.grid.dataSource = result;

    });
  }

  dataStateChange($event: DataStateChangeEventArgs) {

    console.log($event.action);

    this.inputfromgroup = DataGridHelp.GetSortObject($event, this.inputfromgroup);

    this.SearchData( this.inputfromgroup);
  }

  orderaction(number: number) {

  }

  ExcelOut(paramter: any) {
  }
}
