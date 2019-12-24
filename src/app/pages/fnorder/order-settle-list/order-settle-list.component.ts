import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataStateChangeEventArgs, GridComponent} from '@syncfusion/ej2-angular-grids';
import {Basereportservice} from '../../../services/base/basereportservice';
import {Commonsetting} from '../../../help/commonsetting';
import {FinanceReport} from '../../../services/base/basereportconfig';

@Component({
  selector: 'app-order-settle-list',
  templateUrl: './order-settle-list.component.html',
  styleUrls: ['./order-settle-list.component.css']
})
export class OrderSettleListComponent implements OnInit {

  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  constructor(private fb: FormBuilder, private service: Basereportservice) { }

  ngOnInit() {

    this.searchp = this.fb.group(
      { ProcessStatued: '', SettleId: ''});
    this.gridheight = Commonsetting.GridHeight2();
  }

  searching() {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage - 1;
    searchable.pagesize = pagesetting.pageSize;


    this.service.SearchReport(FinanceReport.Report_OrderChargeSettleForSubmitUserQuery, searchable).subscribe(result => {

      this.grid.dataSource = result;
      console.log('加载数据了');

    });
  }


  dataStateChange($event: DataStateChangeEventArgs) {

    console.log('dataStateChange');

    console.log($event);
    if ($event.action.requestType === 'paging') {
      this.searching();
    }


  }

}
