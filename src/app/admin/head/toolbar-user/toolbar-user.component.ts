import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {EmitService} from '../../../help/emit-service';
import {MenuChangeEvent} from '../../../models/menuchangeevent.module';
import {OidcSecurityCommon} from 'angular-auth-oidc-client/lib/services/oidc.security.common';


@Component({
  selector: 'app-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {

  isOpen = false;
  currentUser = null;

  _oidcSecurityService: OidcSecurityService;

  constructor(private _elementRef: ElementRef, oidcSecurityService: OidcSecurityService, public emitService: EmitService) {
    this._oidcSecurityService = oidcSecurityService;
  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isOpen = false;
    }
  }

  ngOnInit() {

    this._oidcSecurityService.getUserData().subscribe(value => {

      this.currentUser = value;
      // console.log(value);

    });


  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  userprofile() {

    window.location.href = 'http://account.trandawl.cn/userprofile/detail';
    // http://account.trandawl.cn/Userprofile/Detail

  }
  logout() {

    alert('登出');

   //const idtoken= this.oidcSecurityCommon.idToken;
   // /connect/endsession?id_token_hint=...&post_logout_redirect_uri=https://myapp.com
    this._oidcSecurityService.logoff();
  //  this._oidcSecurityService.resetAuthorizationData(true);

  }

  changebiz ( number: number ) {

    this.emitService.eventEmit.emit(new MenuChangeEvent(number));
  }
}
