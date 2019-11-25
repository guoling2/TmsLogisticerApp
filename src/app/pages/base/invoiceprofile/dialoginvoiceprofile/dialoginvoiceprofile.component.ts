import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Basereportservice} from '../../../../services/base/basereportservice';
import {DataStateChangeEventArgs, GridComponent, RecordDoubleClickEventArgs} from '@syncfusion/ej2-angular-grids';
import {Commonsetting} from '../../../../help/commonsetting';
import {Basereportconfig} from '../../../../services/base/basereportconfig';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialoginvoiceprofile',
  templateUrl: './dialoginvoiceprofile.component.html',
  styleUrls: ['./dialoginvoiceprofile.component.css']
})
export class DialoginvoiceprofileComponent implements OnInit {

  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;


  constructor(private fb: FormBuilder, private service: Basereportservice, public dialogRef: MatDialogRef<DialoginvoiceprofileComponent>) { }

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

  choseinvoice(template: any) {

    this.dialogRef.close(template);
  }
}
