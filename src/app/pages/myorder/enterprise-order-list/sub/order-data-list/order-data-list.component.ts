import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  DataStateChangeEventArgs,
  ExcelExportProperties, ExcelQueryCellInfoEventArgs,
  PageSettingsModel,
  SortDescriptorModel,
  Sorts,
  SortSettingsModel
} from '@syncfusion/ej2-grids';
import {FilterService, GridComponent, SortService} from '@syncfusion/ej2-angular-grids';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Basereportconfig, EnterpriseCustomer} from '../../../../../services/base/basereportconfig';
import {Basereportservice} from '../../../../../services/base/basereportservice';
import {DataGridHelp} from '../../../../../SyncfusionHelp/data-grid-help';
import {LogistciOrderInterface} from '../../../../../pageservices/logistci-order-interface';
import {Commonsetting} from '../../../../../help/commonsetting';
import {MatDialog} from '@angular/material/dialog';
import {OrderAcceptComponent} from '../order-accept/order-accept.component';
import {OrderthumbnailComponent} from '../order-thumbnail/orderthumbnail.component';
import {FilterEventArgs} from '@syncfusion/ej2-grids/src/grid/base/interface';

@Component({
  selector: 'app-order-data-list',
  templateUrl: './order-data-list.component.html',
  styleUrls: ['./order-data-list.component.css'],
  providers: [SortService, FilterService]
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
    this.gridheight = Commonsetting.GridHeight5h();
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
  ExcelOut(a: any) {


   // this.CurrentDataGrid.excelExport();

    // alert(this.CurrentDataGrid.getSelectedRecords().length);
    //
    if (this.CurrentDataGrid.getSelectedRecords().length > 0) {

      // alert('部分导出');
      const appendExcelExportProperties: ExcelExportProperties = {
        exportType: 'CurrentPage',
        dataSource:  this.CurrentDataGrid.getSelectedRecords()
      };
      this.CurrentDataGrid.excelExport(appendExcelExportProperties);
    } else {
      this.CurrentDataGrid.excelExport();
    }

    // const appendExcelExportProperties: ExcelExportProperties = {
    //   exportType: 'AllPages',
    //   dataSource:this.CurrentDataGrid.Cu
    // };
    //
    // this.CurrentDataGrid.excelExport(appendExcelExportProperties);

    // this.inputfromgroup.pageindex = 0;
    // this.inputfromgroup.pagesize = 500;
    //
    //
    // this.service.SearchReport(EnterpriseCustomer.Report_EnterpriseOrderList,  this.inputfromgroup).subscribe(result => {
    //
    //
    // });


    // this.service.SearchReport(EnterpriseCustomer.Report_EnterpriseOrderList,  this.inputfromgroup).subscribe(result => {
    //
    //    const appendExcelExportProperties: ExcelExportProperties = {
    //      dataSource: result
    //    };
    //    this.CurrentDataGrid.excelExport(appendExcelExportProperties, true);
    //
    //    console.log(result);
    //  // this.grid.dataSource = result;
    //
    // });
    // this.inputfromgroup = a;
    //
    // const  pagesetting = this.grid.pageSettings;
    // a.pageindex = 1;
    // a.pagesize = pagesetting.pageSize;
    //
    // console.log(a);
    // this.service.SearchReportExcel(EnterpriseCustomer.Report_EnterpriseOrderList, a).subscribe(result => {
    //
    //   console.log(result);
    //   const link = document.createElement('a');  //用a标签进行模拟下载
    // //  const blob = new Blob([result.body]);
    //
    //  // result.type
    //
    //   link.setAttribute('href', window.URL.createObjectURL(result.body));
    //   link.setAttribute('download','下载的文件.xlsx');
    //   link.style.visibility = 'hidden';
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    //
    // });
  }
  public Alert() {
    throw new Error('Method not implemented.');
  }


  dataStateChange($event: DataStateChangeEventArgs) {


    // this.inputfromgroup = DataGridHelp.GetSortObject($event, this.inputfromgroup);
    //
    // this.SearchData( this.inputfromgroup);

    if ($event.action.requestType === 'filtering') {

      const filtervevnt = $event.action as FilterEventArgs;
      //
      // console.log(filtervevnt);
      // console.log(filtervevnt.currentFilterObject.field);
      // console.log(filtervevnt.currentFilteringColumn);
      alert('过滤了');

      this.grid.filterByColumn('DestCity', 'equal', '承德市');
    } else {

      this.grid.clearFiltering();

      this.inputfromgroup = DataGridHelp.GetSortObject($event, this.inputfromgroup);

      this.SearchData( this.inputfromgroup);
    }

  }

  choecustomer($event: MouseEvent, xnumber: string, s: string, s2: string) {

    this.dialog.open(OrderthumbnailComponent, {
      height: s,
      width: s2,
      disableClose: true,
      data: xnumber
    });
  }

  // formatexcel($event: ExcelQueryCellInfoEventArgs) {
  //
  //   if($event.column.field === 'TotalWeight'){
  //
  //     console.log($event.cell.value);
  //     //$event.cell.value=0;
  //   }
  //
  //   console.log($event);
  //   // switch ($event.column.field ) {
  //   //   case 'TotalWeight':
  //   //     $event.value = 2;
  //   //     break;
  //   // }
  //
  // }
}
