import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {DialogservicesService} from '../../../help/dialogservices.service';
import {TmssaveconfirmEvent} from '../../../directive/tmssaveconfirm.directive';
import {FnAdminOrderService} from './fn-admin-order.service';
import {fn} from '@angular/compiler/src/output/output_ast';
import {contains} from '@syncfusion/ej2-diagrams';
import {OrderAction} from '../order-action';
import {OrderEventArg} from './order-event-arg';

@Directive({
  selector: 'button[appAcceptOrderDirective]'
})
export class AcceptOrderDirectiveDirective {

  // tslint:disable-next-line:no-output-on-prefix
  // @Output('onActionCopmplate')
  // onActionCopmplate: EventEmitter<string> = new EventEmitter();

  @Output('onActionBegin')
  onActionBegin: EventEmitter<OrderEventArg> = new EventEmitter();

  @Input('orderAction')
  orderAction: string; // Accept

  constructor(private  dialogx: DialogservicesService) {

    // fnAdminOrderService.LoadDataComplate.subscribe(a => {
    //
    //    console.log(a);
    // });
  }




  @HostListener('click', ['$event'])
  onClick(event) {

    event.preventDefault();
    event.stopPropagation();

    let message = '';
    switch (this.orderAction ) {

      case OrderAction.Accepet:
        message = '确认要接单吗？';
        break;
    }

    const alerter = {
      Title: '操作确认',
      Message: message,
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if (result) {
          this.onActionBegin.emit({
            OrderAction: this.orderAction
          });
        }
          // console.log(result);

      })};
    this.dialogx.openDialog(alerter);

  }
}
