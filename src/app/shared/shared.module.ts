import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from './material.module';
import {SyncfusionModule} from './syncfusion.module';
import {DailogAlertModule, DialogAlertComponent} from '../component/';
import {FontawesomemoduleModule} from './extensions/fontawesomemodule.module';
import {FileerrordisplayModule} from '../component/tms/FieldErrorDisplay';
import {ModalPageDirective} from '../directive/modal-page.directive';
import {HighlightDirective} from '../directive/highlight.directive';
import {SimpleorderdetailComponent} from '../pages/myorder/simpleorderdetail/simpleorderdetail.component';
import {TmssaveconfirmDirective} from '../directive/tmssaveconfirm.directive';
import {PricetemplateinsertComponent} from '../pages/logisticpricemanagement/pricetemplateinsert/pricetemplateinsert.component';
import {TmsnumberDirective} from '../directive/tmsnumber.directive';
import {TmsNumberFormatPipe, TmsVolumeconvertPipe, TmsweightconvertPipe} from '../pipes/tmsweightconvert.pipe';
import {NgbootstrapModule} from './ngbootstrap.module';
import {FncommonModule} from '../buinesscomponent/fncommon/fncommon.module';

@NgModule({
  declarations: [
    SimpleorderdetailComponent,
    ModalPageDirective,
    HighlightDirective,
    TmssaveconfirmDirective,
    TmsnumberDirective,
    TmsweightconvertPipe,
    TmsVolumeconvertPipe, TmsNumberFormatPipe],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    NgbootstrapModule,
    MaterialComponentsModule,
    SyncfusionModule,
    DailogAlertModule,
    FileerrordisplayModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    SyncfusionModule,
    NgbootstrapModule,
    DailogAlertModule,
    FileerrordisplayModule,
    HighlightDirective,
    ModalPageDirective,
    TmssaveconfirmDirective,
    TmsweightconvertPipe,
    TmsVolumeconvertPipe,
    TmsNumberFormatPipe
  ],
  entryComponents: [DialogAlertComponent, SimpleorderdetailComponent ],
})
export class SharedModule {
}
