import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {CallBackComponent} from './callBack/call-back.component';
import {LoginComponent} from './login/login.component';
import {AuthModule, ConfigResult, OidcConfigService, OidcSecurityService, OpenIdConfiguration} from 'angular-auth-oidc-client';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizationGuard} from './authorization.guard';
import {AuthorizationCanGuard} from './authorization.can.guard';
import { LogoutComponent } from './logout/logout.component';
import {environment} from '../../environments/environment';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './auth-interceptor';
import {AppConfiguration} from './config/app-configuration';
import {TmsoidcSecurityServivceService} from './tmsoidc-security-servivce.service';
import { Login1Component } from './login1/login1.component';


export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];


const appRoutes: Routes = [
  { path: 'login1', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'callback', component: CallBackComponent },
];

export function loadConfig(oidcConfigService: OidcConfigService) {
  console.log('APP_INITIALIZER STARTING');

  console.log(environment.production);

    // return () => oidcConfigService.load(`https://aliance.trandawl.cn/api/OidcSecurity/config`);

  if (environment.production) {


    console.log('产品版本');

    return () => oidcConfigService.load(`${window.location.origin}/api/OidcSecurity/config`);

  } else {

    console.log('开发版本');

    return () => oidcConfigService.load(`http://localhost:52631/api/OidcSecurity/config`);
  }
}


@NgModule({
  declarations: [
    UnauthorizedComponent,
    ForbiddenComponent,
    CallBackComponent,
    LoginComponent,
    LogoutComponent,
    Login1Component
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    AuthModule.forRoot()
  ],
  providers: [
    OidcConfigService,
    OidcSecurityService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true
    },
    AuthorizationGuard,
    AuthorizationCanGuard,
    HttpInterceptorProviders,
    AppConfiguration,
    TmsoidcSecurityServivceService
  ],
})
export class TmsAuthModuleModule {

  constructor(

  private oidcSecurityService: OidcSecurityService,
  private oidcConfigService: OidcConfigService,
  private appConfiguration: AppConfiguration
) {

  this.oidcConfigService.onConfigurationLoaded.subscribe((configResult: ConfigResult)  => {



    console.log( '加载授权配置数据');

    console.log(configResult);

    const  baseurl = `${window.location.origin}`;



    //configResult.customConfig.ss
    const openIDImplicitFlowConfiguration: OpenIdConfiguration = {
      stsServer: configResult.customConfig.stsServer,
      redirect_url: baseurl + configResult.customConfig.redirect_url,
      client_id: configResult.customConfig.client_id,
      response_type: configResult.customConfig.response_type,
      scope: configResult.customConfig.scope,
      post_logout_redirect_uri: configResult.customConfig.post_logout_redirect_uri,
      start_checksession: true,
      silent_renew: true,
      silent_renew_url: baseurl + '/silent-renew.html',
      post_login_route: configResult.customConfig.startup_route,
      forbidden_route: '/forbidden',
      unauthorized_route: configResult.customConfig.unauthorized_route,
      log_console_warning_active:  false,
      log_console_debug_active: false,
      max_id_token_iat_offset_allowed_in_seconds: 100,
      history_cleanup_off: true

    };

    this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration, configResult.authWellknownEndpoints);

    this.appConfiguration.Server = configResult.customConfig.apiServer;
    // this.appconfiguration.Server = configResult.customConfig.apiServer;
   // apiServer
    console.log(openIDImplicitFlowConfiguration);

    console.log(configResult.authWellknownEndpoints);

    console.log('认证配置加载结束');
  });

 // this.oidcSecurityService.re

} }
