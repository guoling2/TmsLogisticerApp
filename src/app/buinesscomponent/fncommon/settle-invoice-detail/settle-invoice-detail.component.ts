import {Component, Input, OnInit} from '@angular/core';
import {SettleInvoiceModel} from '../../../models/fncommon/settle-invoice-model';
import {SettleInvoiceService} from '../../../services/fncommon/settle-invoice.service';

@Component({
  selector: 'app-settle-invoice-detail',
  templateUrl: './settle-invoice-detail.component.html',
  styleUrls: ['./settle-invoice-detail.component.css']
})
export class SettleInvoiceDetailComponent implements OnInit {


  @Input()
  SettleInvoiceId: string;

  displayedColumns: string[] = ['Index', 'Invoicetaxno', 'Invoiceamount', 'Createduser'];

  public settleInvoiceModel: SettleInvoiceModel;

  constructor(private settleInvoiceService: SettleInvoiceService) { }

  ngOnInit() {

    this.settleInvoiceService.Detail(this.SettleInvoiceId).subscribe(a => {

      this.settleInvoiceModel = a;
    });

  }

}
