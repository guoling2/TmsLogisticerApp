import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {filter, map, take} from 'rxjs/operators';
import {UrlParserService} from 'angular-auth-oidc-client/lib/services/url-parser.service';
import {TmsUrlParserService} from '../../help/tms-url-parser-service';
import {TmsoidcSecurityServivceService} from '../tmsoidc-security-servivce.service';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private tmsoidcSecurityServivceService: TmsoidcSecurityServivceService, private  router: Router, private oidcSecurityService: OidcSecurityService) {

    // if (this.oidcSecurityService.moduleSetup) {
    //
    //   this.oidcSecurityService.authorize();
    //  // this.doCallbackLogicIfRequired();
    // } else {
    //   this.oidcSecurityService.onModuleSetup.subscribe(() => {
    //
    //
    //     this.oidcSecurityService.authorize();
    //   //  this.doCallbackLogicIfRequired();
    //   });
    // }
    // this.oidcSecurityService.getIsAuthorized().subscribe(
    //   (isAuthorized: boolean) => {
    //
    //     alert(isAuthorized);
    //    // this.isAuthorized = isAuthorized;
    //   });
  }
  // private doCallbackLogicIfRequired(): void {
  //   if (window.location.hash) {
  //
  //     console.log(window.location.hash);
  //     this.oidcSecurityService.authorizedCallback();
  //   }
  // }

  ngOnInit() {


    if (this.tmsoidcSecurityServivceService.NeedLogout !== true) {
      this.oidcSecurityService.authorize();
    }
   //   alert( location.href)

      // const  logincheck=TmsUrlParserService.getUrlParameter(location.href,'login');
      //
      // if(logincheck==='1'){
      //   this.oidcSecurityService.authorize();
      // }
    // this.router.navigate(['/home']);

  }

}
