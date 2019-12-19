import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {OrdercustomerComponent} from '../../../myorder/_sub/ordercustomer/ordercustomer.component';
import {DialoginvoiceprofileComponent} from './dialoginvoiceprofile.component';

@Directive({
  selector: '[appOpeninvoiceprofile]'
})
export class OpeninvoiceprofileDirective {


  @Output('onSuggest') onSuggest: EventEmitter<any> = new EventEmitter();


  suggestionWasClicked(result): void {
    this.onSuggest.emit(result);
  }

  constructor( private dialog: MatDialog) { }
  @HostListener('click', ['$event'])
  clickEvent(event) {

    event.preventDefault();
    event.stopPropagation();

    const dialogRef = this.dialog.open(DialoginvoiceprofileComponent, {
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(a => {

      this.suggestionWasClicked(a);
    });

  }
}
