import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataStateChangeEventArgs, GridComponent} from '@syncfusion/ej2-angular-grids';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {Commonsetting} from '../../../help/commonsetting';
import {Basereportconfig} from '../../../services/base/basereportconfig';
import {Basereportservice} from '../../../services/base/basereportservice';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-invoiceprofile',
  templateUrl: './invoiceprofile.component.html',
  styleUrls: ['./invoiceprofile.component.css']
})
export class InvoiceprofileComponent implements OnInit {

  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;


  constructor(private fb: FormBuilder, private service: Basereportservice) { }

  ngOnInit() {

    this.searchp = this.fb.group(
      { Invoicetitle: ''});
    this.gridheight = Commonsetting.GridHeight6();
  }

  searching() {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage - 1;
    searchable.pagesize = pagesetting.pageSize;


    this.service.SearchReport(Basereportconfig.Report_customertaxlist, searchable).subscribe(result => {

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
