import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorizationResult, AuthorizationState, OidcSecurityService} from 'angular-auth-oidc-client';

import {filter, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TmsoidcSecurityServivceService} from '../tmsoidc-security-servivce.service';


@Component({
  selector: 'app-call-back',
  templateUrl: './call-back.component.html',
  styleUrls: ['./call-back.component.css']
})
export class CallBackComponent implements OnInit, OnDestroy {

  checksession: boolean;

  constructor(private tmsoidcSecurityServivceService:TmsoidcSecurityServivceService, public oidcSecurityService: OidcSecurityService, private  router: Router) {


    console.log('CallBackComponent');
    if (this.oidcSecurityService.moduleSetup) {
      this.doCallbackLogicIfRequired();
    } else {
      this.oidcSecurityService.onModuleSetup.subscribe(() => {
        this.doCallbackLogicIfRequired();
      });
    }
    this.oidcSecurityService.onAuthorizationResult.subscribe(
      (authorizationResult: AuthorizationResult) => {
        this.onAuthorizationResultComplete(authorizationResult);
      });

    // this.oidcSecurityService.onCheckSessionChanged.subscribe(
    //   (checksession: boolean) => {
    //     console.log('...recieved a check session event');
    //     this.checksession = checksession;
    //     this.refreshSession();
    //   });

    // this.oidcSecurityService.onAuthorizationResult.subscribe(
    //   (authorizationResult: AuthorizationResult) => {
    //     this.onAuthorizationResultComplete(authorizationResult);
    //   });
    //
    // this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
    //   (isAuthorized: boolean) => {
    //     this.isAuthorized = isAuthorized;
    //   });
  }
  isAuthorized: boolean;
  isAuthorizedSubscription: any;

  private doCallbackLogicIfRequired() {
    console.log('window.location.hash');
    console.log(window.location);
    // Will do a callback, if the url has a code and state parameter.
    this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
  }

  ngOnInit() {

   // this.oidcSecurityService.authorize();
  }

  ngOnDestroy(): void {

    // console.log('call-back.component.ts ngOnDestroy');
    // if (this.isAuthorizedSubscription) {
    //   this.isAuthorizedSubscription.unsubscribe();
    // }
    // this.oidcSecurityService.onModuleSetup.unsubscribe();
    // this.oidcSecurityService.onCheckSessionChanged.unsubscribe();
    // this.oidcSecurityService.onAuthorizationResult.unsubscribe();
  }

  private onAuthorizationResultComplete(authorizationResult: AuthorizationResult) {
    console.log('Auth result received:' + authorizationResult+new Date());
    console.log(authorizationResult);

    switch (authorizationResult.authorizationState) {
      case AuthorizationState.authorized:
        // Gets the redirect URL from authentication service.
        // If no redirect has been set, uses the default.
        // const redirectUrl: string = this.tmsAuthServiceService.getRedirectUrl()
        //   ? this.tmsAuthServiceService.getRedirectUrl()
        //   : '/biz/home';
        // Redirects the user.

      //  console.log(redirectUrl);
        this.tmsoidcSecurityServivceService.NeedLogout=false;

        this.router.navigate(['/home']);
        break;
      case AuthorizationState.forbidden:
        this.router.navigate(['/forbidden']);
        break;
      case AuthorizationState.unauthorized:
        this.router.navigate(['/unauthorized']);
        break;
      default:
        this.router.navigate(['/home']);
    }
    // /*if (authorizationResult.authorizationState = AuthorizationState.unauthorized) {
    //   if (window.parent) {
    //     // sent from the child iframe, for example the silent renew
    //     window.parent.location.href = '/unauthorized';
    //   } else {
    //     // sent from the main window
    //     window.location.href = '/unauthorized';
    //   }
    // }*/
  }
}
