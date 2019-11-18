import { Injectable } from '@angular/core';
import {ITab} from './tab.model';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  tabs: ITab[] = [];
  tabOptions: ITab[] = [{ name: '主页', url: '/home' }, {name: '订单创建', url: '/biz/myorder/create'}];

  addTab(url: string) {
    const tab = this.getTabOptionByUrl(url);
    if (!this.tabs.includes(tab)) {
      this.tabs.push(tab);
    }
  }

  getTabOptionByUrl(url: string): ITab {
    return this.tabOptions.find(tab => tab.url === url);
  }

  deleteTab(index: number) {
    this.tabs.splice(index, 1);
  }
}
