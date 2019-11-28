import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {TmsoidcSecurityServivceService} from '../tmsoidc-security-servivce.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private tmsoidcSecurityServivceService:TmsoidcSecurityServivceService,private  router: Router, private oidcSecurityService: OidcSecurityService) { }

  ngOnInit() {

    this.tmsoidcSecurityServivceService.NeedLogout=true;

    this.oidcSecurityService.logoff();
  }

}
