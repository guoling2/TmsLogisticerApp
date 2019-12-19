import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Basereportservice} from '../../../services/base/basereportservice';
import {Commonsetting} from '../../../help/commonsetting';
import {DataStateChangeEventArgs} from '@syncfusion/ej2-grids';
import {EnterpriseCustomer} from '../../../services/base/basereportconfig';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {BizQueryReportConfig} from '../../../services/base/BizQueryReportConfig';

@Component({
  selector: 'app-enterprise-orders',
  templateUrl: './enterprise-orders.component.html',
  styleUrls: ['./enterprise-orders.component.css']
})
export class EnterpriseOrdersComponent implements OnInit {

  searchp: FormGroup;
  public gridheight: number;

  public pageSettings = {currentPage: 1, pageSize: 1000};

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  constructor(private fb: FormBuilder, private service: Basereportservice) { }

  ngOnInit() {

    this.gridheight = Commonsetting.GridHeight3();

    this.searchp = this.fb.group(
      {
        CustomerOrderId: '',
        DesctcustomName: '',
        OrigincustomPhysicalDeotName: '',
        DestCity: '',
        NotifyCarNumber: '',
        ConfirmOrder: '0',
        CreateDatetime1: '',
        CreateDatetime2: ''});

  }

  searching() {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage - 1;
    searchable.pagesize = pagesetting.pageSize;


    this.service.SearchReport(BizQueryReportConfig.Report_enterpriseorders, searchable).subscribe(result => {

      this.grid.dataSource = result;

    });

  }

  dataStateChange($event: DataStateChangeEventArgs) {
    if ($event.action.requestType === 'paging') {
      this.searching();
    }
  }

  excelout() {
    this.grid.excelExport();
  }
}
