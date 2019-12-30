import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {Basereportservice} from '../../../services/base/basereportservice';
import {OrderChargeSettleService} from '../../../services/fnorder/order-charge-settle.service';
import {EmitService} from '../../../help/emit-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order-settle-admin-detail',
  templateUrl: './order-settle-admin-detail.component.html',
  styleUrls: ['./order-settle-admin-detail.component.css']
})
export class OrderSettleAdminDetailComponent implements OnInit {

  constructor(    private dialog: MatDialog,
                  private fb: FormBuilder,
                  private emitService: EmitService,
                  private router: Router,
                  private route: ActivatedRoute) { }

  ngOnInit() {

    const orderId = this.route.snapshot.paramMap.get('id');
  }

}
