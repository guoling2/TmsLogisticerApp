import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AuthorizationCanGuard} from './auth/authorization.can.guard';
import {RouterModule, Routes} from '@angular/router';
import {TmsAuthModuleModule} from './auth/tms-auth-module.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthorizationGuard} from './auth/authorization.guard';
import {AdminModule} from './admin/admin.module';
import {HomeModule} from './pages/home/home.module';
import {AppRoutingModule} from './app.routing';
import {EmitService} from './help/emit-service';



const appRoutes: Routes = [

];


@NgModule({
  declarations: [

    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HomeModule,
    AdminModule,
    RouterModule.forRoot(appRoutes),
    TmsAuthModuleModule
  ],
  providers: [EmitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
