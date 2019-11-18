import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AdminComponent } from './admin.component';

import {HeaderModule} from './head/header.module';
import {SharedModule} from '../shared/shared.module';
import {FooterComponent} from './footer/footer.component';
import {BrandComponent} from './brand/brand.component';
import {NavigationModule} from './navigation/navigation.module';
import {MessageModule} from '../component/message';
import { AlertComponent } from './shared/alert.component';
import {EmitService} from '../help/emit-service';
import {NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    NavigationModule,
    RouterModule,
    SharedModule,
    MessageModule,
    HeaderModule,

  ],
  declarations: [
    AdminComponent,
    BrandComponent,
    FooterComponent,
    AlertComponent
  ],
  providers: [

  ],
  exports: [
    AlertComponent
  ]
})
export class AdminModule {
}
