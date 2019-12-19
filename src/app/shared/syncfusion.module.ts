import { NgModule } from '@angular/core';
import {Edit, FilterService, GridModule, Page} from '@syncfusion/ej2-angular-grids';
import { ButtonModule, CheckBoxModule, RadioButtonModule} from '@syncfusion/ej2-angular-buttons';
import {ListBoxAllModule, ComboBoxModule, DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import { DetailRowService, PageService , ResizeService, FreezeService, ReorderService } from '@syncfusion/ej2-angular-grids';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { TreeViewModule, TabModule } from '@syncfusion/ej2-angular-navigations';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { DropDownButtonModule, SplitButtonModule, ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { Grid, DetailRow, Toolbar, PdfExport, ExcelExport } from '@syncfusion/ej2-grids';
import { TextBoxModule, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import {DatePickerModule, DateTimePickerModule} from '@syncfusion/ej2-angular-calendars';
import { loadCldr , L10n } from '@syncfusion/ej2-base';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { SelectionSettingsModel } from '@syncfusion/ej2-dropdowns';
import { SidebarModule, MenuAllModule, TreeViewAllModule} from '@syncfusion/ej2-angular-navigations';
// loadCldr(enNumberData, entimeZoneData);
import {DialogModule} from '@syncfusion/ej2-angular-popups';
import {EJAngular2Module} from 'ej-angular2';

declare var require: any;

loadCldr(
  require('cldr-data/main/zh/numbers.json'),
  require('cldr-data/main/zh/ca-gregorian.json'),
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/main/zh/timeZoneNames.json'),
  require('cldr-data/supplemental/weekdata.json') // To load the culture based first day of week
);

L10n.load({
  zh: {
    datepicker: {  today: '今天'},
    datetimepicker: {today: '今天'}
  }
});

@NgModule({
  imports: [
    DateTimePickerModule,
    TextBoxModule, NumericTextBoxModule,
    GridModule, CheckBoxModule, DropDownListModule, ButtonModule, SwitchModule,
    ListViewModule,
    TreeViewModule,
    TabModule,
    ToastModule, DropDownButtonModule, RadioButtonModule, TooltipModule, SplitButtonModule, ProgressButtonModule,
    ListBoxAllModule,
     MenuAllModule, TreeViewAllModule,
    ComboBoxModule, DialogModule, DatePickerModule, SidebarModule
  ],

  exports: [
    DateTimePickerModule,
    TextBoxModule, NumericTextBoxModule,
    GridModule, CheckBoxModule, ListBoxAllModule, DropDownListModule, ButtonModule, SwitchModule,
    ListViewModule,
    TreeViewModule,
    TabModule,
    ToastModule, DropDownButtonModule, RadioButtonModule, TooltipModule, SplitButtonModule, ProgressButtonModule,
     MenuAllModule, TreeViewAllModule,
    ComboBoxModule, DialogModule, DatePickerModule, SidebarModule
  ],
   providers: [
    DetailRowService, PageService, ResizeService, ReorderService
   ]
})

export class SyncfusionModule {


  constructor() {
    Grid.Inject(Edit, Toolbar, Page, PdfExport, ExcelExport);
   // Grid.Inject(Toolbar, PdfExport, ExcelExport);
  }

}
