import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private  router: Router, private oidcSecurityService: OidcSecurityService) { }

  ngOnInit() {
    this.oidcSecurityService.logoff();
  }

}
