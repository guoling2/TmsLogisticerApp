import {Component, OnInit, ViewChild} from '@angular/core';
import {
  CheckBoxChangeEventArgs,
  DataStateChangeEventArgs, EditSettingsModel,
  PageSettingsModel,
  RowDeselectEventArgs,
  RowSelectEventArgs,
  SelectionSettingsModel
} from '@syncfusion/ej2-grids';
import {Commonsetting} from '../../../help/commonsetting';
import {Basereportconfig} from '../../../services/base/basereportconfig';
import {ShipplanService} from '../../../services/logistic/shipment/shipplan.service';
import {DialogservicesService} from '../../../help/dialogservices.service';
import {MyshpipmentorderService} from '../../../services/logistic/shipment/myshpipmentorder.service';
import {EmitService} from '../../../help/emit-service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Basereportservice} from '../../../services/base/basereportservice';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {BehaviorSubject} from 'rxjs';
import {GroupOrderAtionModel} from '../groupforInside/group-order-ation-model';
import {UpdateModelType} from 'src/app/models/tms-data-entity';
import {ej} from '@syncfusion/ej2-data/dist/global';
import data = ej.data;
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';
import {SelectvehicelComponent} from '../groupplancommon/selectvehicel/selectvehicel.component';
import {Vehicelmodel} from '../../../models/vehiclemanagement/vehicelmodel';
import {ShipplangroudattchlistComponent} from '../groupforInside/sendgroupinsidecommonlist/sub/shipplangroudattchlist/shipplangroudattchlist.component';
import {ShimentNoSendGroupView} from '../../../models/shipplangroup/shiment-no-send-group-view';
import {ShipplanGroupInsideService} from '../../../services/shiipplangroup/shipplan-group-inside.service';
import { Grid, Edit, Toolbar, Page, NewRowPosition } from '@syncfusion/ej2-grids';
@Component({
  selector: 'app-benditihuolist',
  templateUrl: './benditihuolist.component.html',
  styleUrls: ['./benditihuolist.component.css']
})
export class BenditihuolistComponent implements OnInit {
  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;
  public pageSettings: PageSettingsModel;
  tabselected = new FormControl(0);
  public selectOptions: SelectionSettingsModel;
  editSettings: EditSettingsModel;
  toolbar: [];
  orderStoreSubject: BehaviorSubject<GroupOrderAtionModel> = new BehaviorSubject<GroupOrderAtionModel>(null);

  public alreadyloadshipmentdatasource: GroupOrderAtionModel[] = [];


  constructor(
              private shipplanGroupInsideServiceService: ShipplanGroupInsideService,
              private  shipplanService: ShipplanService,
              private  dialogx: DialogservicesService,
              private  myShpipmentOrderService: MyshpipmentorderService,
              public emitService: EmitService, private fb: FormBuilder, public dialog: MatDialog, private service: Basereportservice) { }

  ngOnInit() {

    this.selectOptions = { persistSelection: true };

    this.pageSettings = {pageSize: 50};
   // this.grid.pageSettings.pageSize = 100;
    this.searchp = this.fb.group(
      { OrderTrackServerId: '', PlanStatuedId: ''});
    this.gridheight = Commonsetting.GridHeight3();

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', newRowPosition: 'Top' };

    // this.toolbar =  [ 'Delete'];
   // this.grid.tool
   //  toolbar: [ 'Delete']
    // this.grid.pageSettings={currentPage:1,pageSize:2};
  }

  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage - 1;
    searchable.pagesize = pagesetting.pageSize;

    this.service.SearchReport(Basereportconfig.Report_localtihuolist, searchable).subscribe(result => {

      this.grid.dataSource = result;
      console.log('加载数据了');

    });
  }


  dataStateChange($event: DataStateChangeEventArgs) {

    console.log('dataStateChange');

    console.log($event);
    if ($event.action.requestType === 'paging') {
      this.searching();
    }


  }

  opentihuo() {

    const selectedrows =  this.grid.getSelectedRecords();

    if (selectedrows.length === 0) {
      return;
    }
   // this.tabselected.setValue(1);

    for (let index = 0; index < selectedrows.length; index++) {

      const element = selectedrows[index];

      const  x = this.alreadyloadshipmentdatasource[element['ShipmentId']];

      if (x == null) {

        this.orderStoreSubject.next({ShipmentId: element['ShipmentId'], UpdateModelType: UpdateModelType.Attach});
      }

    }

    alert('添加完成');


  }

  rowselected($event: RowSelectEventArgs) {



    console.log('加载了rowselected');

    console.log($event);

    if ($event.data === undefined) {
      return;
    }
   // this.orderStoreSubject.next({ShipmentId: $event.data['ShipmentId'], UpdateModelType: UpdateModelType.Attach});

    const shipmentId = $event.data['ShipmentId'];

    console.log(shipmentId);

    const storeshipment = this.alreadyloadshipmentdatasource.findIndex(t => t.ShipmentId === shipmentId);


    console.log(storeshipment);

    if (storeshipment === -1) {
      this.alreadyloadshipmentdatasource.push({ShipmentId:  $event.data['ShipmentId'], UpdateModelType: UpdateModelType.Attach});
    } else {
      console.log('已经添加了');
    }

  }

  rowdeselection($event: RowDeselectEventArgs) {

    const shipmentOrderId = $event.data[0]['ShipmentId'];

    const index = this.alreadyloadshipmentdatasource.findIndex(t => t.ShipmentId === shipmentOrderId);

    if (index !== -1) {
      this.alreadyloadshipmentdatasource.splice(index, 1);
    }
  }

  checkboxchanged($event: CheckBoxChangeEventArgs) {




    console.log($event);

    const selectredord = [];


    this.grid.getSelectedRecords().forEach(a => {

      selectredord.push(a['ShipmentId']);
    });


    if ($event.checked === false) {

      if ($event.selectedRowIndexes.length === 0) {
        this.alreadyloadshipmentdatasource = [];
      }
      const deleteindex = [];


      this.alreadyloadshipmentdatasource.forEach((item, index) => {

        if (selectredord.findIndex(a => a === item.ShipmentId) === -1) {
          deleteindex.push(index);
        }
      });

      if (deleteindex.length !== 0) {
           deleteindex.forEach(a => {
             this.alreadyloadshipmentdatasource.splice(a, 1);
           });
         }

    } else {

      const addindexs = [];

      selectredord.forEach(a => {

        const add = this.alreadyloadshipmentdatasource.findIndex(t => t.ShipmentId === a);

        if (add === -1) {
        addindexs.push(a);
        }

      });

      if (addindexs.length > 0) {

        addindexs.forEach(a => {
         if ( this.alreadyloadshipmentdatasource.findIndex(t => t.ShipmentId === a) === -1) {
           this.alreadyloadshipmentdatasource.push({ShipmentId: a, UpdateModelType: UpdateModelType.Attach });
         }

        });

      }
    }

    console.log(this.alreadyloadshipmentdatasource);
  }

  // 添加运单服务
  attchitem(height, width) {
     const datas = this.grid.getSelectedRecords();
      if (datas.length === 0) {
        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请添加运单在继续操作', MessageShowType.Toast));

        return;
      }

    const dialogRef = this.dialog.open(ShipplangroudattchlistComponent, {
      height: height,
      width: width,
      disableClose: false,
      data: 'inside'
    });
    // (value: LogisticStore[])
    dialogRef.afterClosed().subscribe((result: ShimentNoSendGroupView) => {

      if (result != null) {


       // shipplanGroupInsideServiceService



        let resultindex = 0;




        // datas.forEach(a => {
        //
        //
        //  resultindex++;
        //
        //
        //        this.shipplanGroupInsideServiceService.AttchShipmentItem({
        //     TaskType: '',
        //     ShipmentId: a['ShipmentId'],
        //     ShipmentGrpupId: result.PlanGroupId
        //   }).subscribe(resultx => {
        //
        //
        //     this.emitService.eventEmit.emit(
        //       new EmitAlertMessage(AlertMessageType.Succeed, '系统信息',   resultx.Info, MessageShowType.Toast));
        //
        //     if (resultindex === datas.length) {
        //       this.emitService.eventEmit.emit(
        //         new EmitAlertMessage(AlertMessageType.Info, '系统信息',   '请手动刷新数据，技术原因', MessageShowType.Alert));
        //     }
        //
        //
        //   });
        //
        //   });


      }

    });
  }
}
