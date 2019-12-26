import {fontSize} from '@syncfusion/ej2-richtexteditor/src/rich-text-editor/models/toolbar-settings';


export class NavigationModel {

  public model: any[];

  constructor(menuId: number) {

    if ( menuId === 2 ) {
      this.model = [
        {
          id: 'home',
          title: '主页',
          type: 'item',
          icon: 'home',
          url: '/biz/home'
        },
        {
          id: 'ui',
          title: '订单管理',
          type: 'collapse',
          icon: 'insert_drive_file',
          children: [
            {
              id: 'myorder-create',
              title: '订单录入',
              type: 'item',
              url: '/biz/myorder/create'
            },
            {
              id: 'date-picker1',
              title: '订单列表',
              type: 'item',
              url: '/biz/myorder/list'
            },
            {
              id: 'date-order',
              title: '企业订单',
              type: 'item',
              url: '/biz/myorder/enterprise-orders'
            },

            {
              id: 'wuliu24',
              title: '订单签收',
              type: 'item',
              url: '/biz/shipment/sign-list'
            }
            // {
            //   'id': 'date-picker2',
            //   'title': '外包订单',
            //   'type': 'item',
            //   'url': '/biz/orders/myorder'
            // },
            // {
            //   'id': 'date-picker',
            //   'title': '客户订单',
            //   'type': 'item',
            //   'url': '/biz/orders/c-orders'
            // },
            // {
            //   'id': 'pagination',
            //   'title': '订单列表',
            //   'type': 'item',
            //   'url': '/biz/orders1'
            // },
            // {
            //   'id': 'modal',
            //   'title': '运单信息补录',
            //   'type': 'item',
            //   'url': '/biz/orders2'
            // },
            // {
            //   'id': 'buttons',
            //   'title': '网上下单审核',
            //   'type': 'item',
            //   'url': '/biz/weixinorder'
            // }
          ]
        },
        {
          id: 'wuliu2',
          title: '配载发车',
          type: 'collapse',
          icon: 'local_shipping',
          children: [
            {
              id: 'wuliu10',
              title: '小车提货',
              type: 'item',
              url: '/biz/shipment/benditihuoclist'
            },

            {
              id: 'wuliu11',
              title: '同城配送',
              type: 'item',
              url: '/biz/shipment/songhuo'
            },
            {
              id: 'wuliu22',
              title: '干线运输',
              type: 'item',
              url: '/biz/shipment/transfer'
            },
            // {
            //   'id': 'wuliu22-1',
            //   'title': '大车直送',
            //   'type': 'item',
            //   'url': '/biz/shipment/circletriptrip'
            // },
            // {
            //   'id': 'wuliu10-1',
            //   'title': '提货外包',
            //   'type': 'item',
            //   'url': '/biz/shipment/outer-tihuo'
            // },
            {
              id: 'wuliu22-2',
              title: '转运外包',
              type: 'item',
              url: '/biz/shipment/outer-send'
            },
            {
              id: 'wuliu22-3',
              title: '提货汇总',
              type: 'item',
              url: '/biz/shipment/pickuplist'
            },
            {
              id: 'wuliu22-5',
              title: '配送汇总',
              type: 'item',
              url: '/biz/shipment/senditemlist'
            },
            {
              id: 'wuliu22-4',
              title: '干线汇总',
              type: 'item',
              url: '/biz/shipment/transferlist'
            },
            {
              id: 'wuliu22-6',
              title: '转运外包汇总',
              type: 'item',
              url: '/biz/shipment/waibaosendlist'
            },
            {
              id: 'wuliu23',
              title: '网点卸货',
              type: 'item',
              url: '/biz/shipment/xieche'
            }
            // {
            //   'id': 'wuliu1',
            //   'title': '订单配载',
            //   'type': 'item',
            //   'url': '/biz/shipment'
            // },
            // {
            //   'id': 'wuliu2',
            //   'title': '任务委派',
            //   'type': 'item',
            //   'url': '/biz/shipment/planlist'
            // },
            // {
            //   'id': 'wuliu23',
            //   'title': '中转外包',
            //   'type': 'item',
            //   'url': '/biz/orders4'
            // },
            // {
            //   'id': 'wuliu24',
            //   'title': '到货管理(提货)',
            //   'type': 'item',
            //   'url': '/biz/orders5'
            // }
          ]
        },
        {
          id: 'ui',
          title: '回单管理',
          type: 'collapse',
          icon: 'assignment_late',
          children: [
            {
              id: 'date-picker',
              title: '回单收回',
              type: 'item',
              url: '/biz/orders6'
            },
            {
              id: 'date-picker',
              title: '回单寄出',
              type: 'item',
              url: '/biz/orders6'
            },
            {
              id: 'date-picker',
              title: '回单接收',
              type: 'item',
              url: '/biz/orders6'
            },
            {
              id: 'pagination',
              title: '回单返厂',
              type: 'item',
              url: '/biz/orders7'
            },
            {
              id: 'modal',
              title: '回单查询',
              type: 'item',
              url: '/biz/orders8'
            }
          ]
        },
        {
          id: 'kefu',
          title: '过程跟踪',
          type: 'collapse',
          icon: 'supervisor_account',
          children: [
            {
              id: 'pagination',
              title: '运单时效',
              type: 'item',
              url: '/biz/orderserver/route/list'
            },
            // {
            //   'id': 'pagination',
            //   'title': '在途可视化',
            //   'type': 'item',
            //   'url': '/biz/orderserver/ordermap'
            // },
            // {
            //   'id': 'date-picker',
            //   'title': '运单查询',
            //   'type': 'item',
            //   'url': '/biz/materials/date-picker'
            // }, {
            //   'id': 'modal',
            //   'title': '签收查询',
            //   'type': 'item',
            //   'url': '/biz/materials/popover'
            // },
            // {
            //   'id': 'buttons',
            //   'title': '客户回访',
            //   'type': 'item',
            //   'url': '/biz/materials/buttons'
            // },
            {
              id: 'newbadorderlist',
              title: '异常件',
              type: 'item',
              url: '/biz/orderserver/newbadorderlist'
            },
            {
              id: 'badorderprocess',
              title: '异常处理',
              type: 'item',
              url: '/biz/orderserver/badorderprocess'
            },
            {
              id: 'badorderlist',
              title: '异常汇总',
              type: 'item',
              url: '/biz/orderserver/badorderlist'
             }
            // {
            //   'id': 'cards',
            //   'title': '投诉与仲裁',
            //   'type': 'item',
            //   'url': '/biz/materials/cards'
            // }, {
            //   'id': 'lists',
            //   'title': '客户留言',
            //   'type': 'item',
            //   'url': '/biz/materials/lists'
            // }
          ]
        },
        {
          id: 'fa-calculator',
          title: '计费与对账',
          type: 'collapse',
          icon: 'assignment',
          children: [
            {
              id: 'FnAccountTrans',
              title: '应收交款',
              type: 'item',
              url: '/biz/fn-order/order-trans-list'
            },
            {
              id: 'FnAccountTrans01',
              title: '应收结算单',
              type: 'item',
              url: '/biz/fn-order/order-settle-list'
            },
            {
              id: 'OrderCharge',
              title: '运单收入',
              type: 'item',
              url: '/biz/logisticprice-management/price-template-list'
            },
            {
              id: 'TripCharge',
              title: '运输支出',
              type: 'item',
              url: '/biz/logisticprice-management/price-template-list'
            },
            {
              id: 'XieCheCharge',
              title: '装卸支出',
              type: 'item',
              url: '/biz/logisticprice-management/price-template-list'
            },
            {
              id: 'OrderBill',
              title: '客户对账',
              type: 'item',
              url: '/biz/logisticprice-management/price-template-list'
            },
            {
              id: 'XieCheBill',
              title: '装卸对账',
              type: 'item',
              url: '/biz/logisticprice-management/price-template-list'
            },
            {
              id: 'CarrierBill',
              title: '服务商对账',
              type: 'item',
              url: '/biz/logisticprice-management/price-template-list'
            },
            {
              id: 'DriverBill',
              title: '司机对账',
              type: 'item',
              url: '/biz/logisticprice-management/price-template-list'
            },
          ]
        },
        {
          id: 'fa-pay',
          title: '财务结算',
          type: 'collapse',
          icon: 'assessment',
          children: [
            {
              id: 'CustSettle',
              title: '客户结算',
              type: 'item',
              url: '/biz/fn-order/order-settle-admin-list'
            },
            {
              id: 'TransportSettle',
              title: '运输结算',
              type: 'item',
              url: '/biz/logisticprice-management/price-template-list'
            },
            {
              id: 'XiecheSettle',
              title: '装卸结算',
              type: 'item',
              url: '/biz/logisticprice-management/price-template-list'
            },
            {
              id: 'DailySettle',
              title: '日常结算',
              type: 'item',
              url: '/biz/fncharge/admin-list'
            },
            {
              id: 'FnAccountTransAudit',
              title: '交款审核',
              type: 'item',
              url: '/biz/logisticprice-management/price-template-list'
            },
          ]
        },
        {
          id: 'fncharge',
          title: '日常记账',
          type: 'collapse',
          icon: 'chrome_reader_mode',
          children: [
            {
              id: 'fncharge01',
              title: '费用记录',
              type: 'item',
              url: '/biz/fncharge/newCharge'
            },
            {
              id: 'fnmanager02',
              title: '费用查询',
              type: 'item',
              url: '/biz/fncharge/listview'
            }
          ]
        },
        {
          id: 'fnQueries',
          title: '财务查询',
          type: 'collapse',
          icon: 'next_week',
          children: [
            {
              id: 'QryDailyCharge',
              title: '日常收支查询',
              type: 'item',
              url: '/biz/fnQueries/QryDailyCharge'
            }
          ]
        },
        {
          id: 'FnAccount',
          title: '财务设置',
          type: 'collapse',
          icon: 'settings_applications',
          children: [
            {
              id: 'invoiceProfile',
              title: '开票资料',
              type: 'item',
              url: '/biz/FnAccount/invoiceProfile'
            },
            {
              id: 'baseChargeItem',
              title: '计费项目',
              type: 'item',
              url: '/biz/FnAccount/baseChargeItem'
            },
            {
              id: 'fnTrxItem',
              title: '事务计费项目',
              type: 'item',
              url: '/biz/FnAccount/fnTrxItem'
            }
          ]
        },
        {
          id: 'BizSearch',
          title: '业务查询',
          type: 'collapse',
          icon: 'pageview',
          children: [
            {
              id: 'BizSearch01',
              title: '企业订单',
              type: 'item',
              url: '/biz/BizSearch/enterprise-orders'
            }
          ]
        },
        {
          id: 'baseprofile',
          title: '基础资料',
          type: 'collapse',
          icon: 'storage',
          children: [
            {
              id: 'pagination',
              title: '物流网点',
              type: 'item',
              url: '/biz/base/stores/list'
            },
            {
              id: 'logisticrouteid',
              title: '路由节点',
              type: 'item',
              url: '/biz/base/logisticroute/list'
            },
            {
              id: 'pagination1',
              title: '走货路径',
              type: 'item',
              url: '/biz/materials/pagination2'
            },
            {
              id: 'modal',
              title: '客户资料',
              type: 'item',
              url: '/biz/customer-management/customers'
            },
            {
              id: 'Carrierprofile',
              title: '运输商资料',
              type: 'item',
              url: '/biz/carriers-management/carriers'
            },
            {
              id: 'outdriver',
              title: '外租车',
              type: 'item',
              url: '/biz/vehicle-management/outdriver-list'
            },
            // {
            //   'id': 'driverprofile',
            //   'title': '司机资料',
            //   'type': 'item',
            //   'url': '/biz/customer-management/customers'
            // },
            // {
            //   'id': 'vehicleprofile',
            //   'title': '车辆资料',
            //   'type': 'item',
            //   'url': '/biz/customer-management/customers'
            // },
            {
              id: 'ContainerModel',
              title: '车型',
              type: 'item',
              url: '/biz/vehicle-management/containers'
            },

            {
              id: 'cusbasedata-tracknumber',
              title: '物流面单管理',
              type: 'item',
              url: '/biz/base/tacknumber'
            },
            {
              id: 'printdesign',
              title: '打印模板管理',
              type: 'item',
              url: '/biz/base/pring-design-list'
            }
          ]
        },
        {
          id: 'usermanager',
          title: '用户管理',
          type: 'collapse',
          icon: 'person_pin',
          children: [
            {
              id: 'bizemplayee',
              title: '企业员工',
              type: 'item',
              url: '/biz/user-management/users'
            },
            {
              id: 'userrole',
              title: '角色',
              type: 'item',
              url: '/biz/materials/pagination2'
            }
          ]
        }
      ];
    } else {
      this.model = [
        {
          id: 'home',
          title: '主页',
          type: 'item',
          icon: 'home',
          url: '/customer'
        },
        {
          id: 'custoerder',
          title: '物流订单',
          type: 'collapse',
          icon: 'bubble_chart',
          children: [
            {
              id: 'custoerder-bindorder',
              title: '订单配载',
              type: 'item',
              url: '/customer/logistic/bindorder'
            },
            {
              id: 'custoerder-ordersearch',
              title: '运单查询',
              type: 'item',
              url: '/customer/logistic/ordersearch'
            }

          ]
        },
        {
          id: 'cusbasedata',
          title: '基础资料',
          type: 'collapse',
          icon: 'equalizer',
          children: []
        }
      ];
    }
  }

}
