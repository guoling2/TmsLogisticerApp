import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EnterpriseOrderDetailModel} from '../../../models/CustomerOrder/enterprise-order-detail-model';
import {EnterpriseOrderServiceService} from '../../../services/CustomerOrder/enterprise-order-service.service';

@Component({
  selector: 'app-enterprise-order-detail',
  templateUrl: './enterprise-order-detail.component.html',
  styleUrls: ['./enterprise-order-detail.component.css']
})
export class EnterpriseOrderDetailComponent implements OnInit {
  ordermodel: EnterpriseOrderDetailModel;

  private systemorderId: string;
  constructor(private enterpriseOrderServiceService: EnterpriseOrderServiceService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.systemorderId = this.route.snapshot.paramMap.get('id');

    this.enterpriseOrderServiceService.Detail(this.systemorderId,true).subscribe(a => {
      console.log(a);
      this.ordermodel = a; });

  }

}


