import {Component, OnInit} from '@angular/core';
import {EmitService} from '../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../help/emit-alert-message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public today: string;
  public nosendordercount: string;
  public nosendorderprice: string;

  constructor() { }

  ngOnInit() {
    const today = new Date ();
    const nowmonth = today.getMonth ();
    this.today = `${new Date ().getFullYear ()}年${nowmonth + 1}月${new Date ().getDate ()}日`;

    this.nosendordercount = '0';
    this.nosendorderprice = '0';
    // this.orderService.NoSendDataCount().subscribe( value => {
    //
    //   this.nosendordercount = value.Data['NoSendOrderCount'];
    //   this.nosendorderprice = value.Data['NoSendOrderPrice'];
    //
    //   console.log(value);
    //
    // } );
  }
}
