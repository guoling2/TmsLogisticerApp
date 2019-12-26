import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
import { EmitService } from '../help/emit-service';
import { AlertMessageType, EmitAlertMessage, MessageShowType } from '../help/emit-alert-message';
import { MessageComponent } from '../component/message';
import { AlertComponent } from './shared/alert.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { promise } from 'selenium-webdriver';
import { filter, map, mergeMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { NavigationService } from './navigation/navigation.service';
import { ToastCloseArgs } from '@syncfusion/ej2-angular-notifications';
import {AuthorizationResult, OidcSecurityService} from 'angular-auth-oidc-client';
import {TabService} from './tab.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  layoutMode = false;
  customizerSidenavAlign = 'end';
  sidenavOpen = true;
  sidenavMode = 'side';
  sidenavAlign = 'start';
  tabs = [];
  private activeTabUrl: string;
  alertmessage = null;


  @ViewChild('alert', {static: false})
  public alertcom: AlertComponent;


  @ViewChild('toasttype', {static: false})
  public toastObj: ToastComponent;

  public toasts: { [key: string]: any }[] = [
    { title: '警告!', content: 'There was a problem with your network connection.', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
    { title: '成功!', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
    { title: '错误!', content: 'A problem has been occurred while submitting your data.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' },
    { title: '消息!', content: 'Please read the comments carefully.', cssClass: 'e-toast-info', icon: 'e-info toast-icons' }
  ];

  navLinks: Array<{ title: string, module: string, power: string, isSelect: boolean }> = [];

  currentIndex = -1;

  public position: object = { X: 'Right' };

  private isAuthorized: boolean;
  constructor(
              private tabService: TabService,
              public emitService: EmitService, private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title, public navigationService: NavigationService, private oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {

    this.oidcSecurityService.getIsAuthorized().subscribe(auth => {

      this.isAuthorized = auth;
      if (auth === false) {
        this.router.navigateByUrl('/login?login=1');
      } else {

       // this.router.navigateByUrl('/biz/home');

        // this.tabs = this.tabService.tabs;

        // this.router.events.subscribe(event => {
        //   if (event instanceof NavigationEnd) {
        //     this.activeTabUrl = event.urlAfterRedirects;
        //     if (this.tabs.length === 0) {
        //       this.tabService.addTab(this.activeTabUrl);
        //     }
        //   }
        // });

      }
    });

    this.oidcSecurityService.onCheckSessionChanged.subscribe(
      (checksession: boolean) => {
        console.log('...recieved a check session event');
      //  this.checksession = checksession;
        this.refreshSession();
      });
    // 接收发射过来的数据
    this.emitService.eventEmit.subscribe((value: EmitAlertMessage) => {
      // if(value.MessageType==AlertMessageType.) {
      // 这里就可以调取接口，刷新userList列表数据
      if (value.Message !== undefined) {
        console.log(value);
        // this.alertmessage = value;

        // alert(value.Message);
        console.log(value);
        if (value.ShowType === MessageShowType.Alert) {
          this.alertcom.show(value);
        } else {
          let selectmodel;
          switch (value.MessageType) {
            case AlertMessageType.Error:
              selectmodel = this.toasts[2];
              break;
            case AlertMessageType.Info:
              selectmodel = this.toasts[3];
              break;
            case AlertMessageType.Succeed:
              selectmodel = this.toasts[1];
              break;
          }
          selectmodel.title = value.Title;
          selectmodel.content = value.Message;
          this.toastObj.show(selectmodel);
        }

      }
    });


    // 测试
    // setInterval(a => {
    //   alert('超时处理');
    // }, 5000);

  }

  closeTab(index: number, event: Event) {
    this.tabService.deleteTab(index);
    event.preventDefault();
  }

  onTabChange(event) {
    this.router.navigateByUrl(event.nextId);
  }

  refreshSession(): void {
   // this.tmsAuthServiceService.revokeToken();
    // Stores the attempted URL for redirecting.
   // this.tmsAuthServiceService.setRedirectUrl(this.router.url);
   // this.oidcSecurityService.refreshSession();
    this.oidcSecurityService.authorize();
  }

  /**
   * @param event {Event} 事件
   * @param scrollContainer {Object} 容器dom
   */
  onActivate(event, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }


  /**
   * 关闭页面
   * @param title
   */
  closeurl(title: string) {

    if (this.navLinks.length === 1) {
      return;
    }

    const pageindex = this.navLinks.findIndex(t => t.title === title);

    const pagemodel = this.navLinks.find(t => t.title === title);

    // if (pageindex !== -1) {
    //   MulipageReuseStrategy.deleteRouteSnapshot(pagemodel.module);
    //   this.navLinks.splice(pageindex, 1);
    // }
    //  if (pageindex!=-1 ){
    //
    //
    //    this.navLinks.splice(pageindex, 1);
    //
    //
    //
    //    //this.selected.setValue(this.navLinks - 1);
    //    /
    // }

  }
}
