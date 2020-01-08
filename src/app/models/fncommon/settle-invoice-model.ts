import {SettleItemInvoiceResultModel} from './settle-item-invoice-result-model';

export class SettleInvoiceModel {

        public  Invoiceparty: string;
        public  Partytaxno: string;
        public  Taxrate: number;
        public  Invoicetype: number;
        public  InvoicetypeDesc: string;
        public  FnTrxItem: string;
        public  OpenInvoiceChargeAmt: number;
        public  SettleItemInvoiceResult: SettleItemInvoiceResultModel[];
}
