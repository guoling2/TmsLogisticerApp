import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TabService} from '../../tab.service';
@Component({
  selector: 'stbui-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavItemComponent {

  @Input() item: any;


  constructor(
                private tabService: TabService,
                private router: Router,
                private titleService: Title ) {


    console.log (this.item);
  }
  // @HostBinding('style.color') color = '#f0f';
  openurl() {


   // this.titleService.setTitle(this.item.title);
   // console.log(this.item.url);
   // alert(this.item);
    const currenturl = this.item.url;
    this.tabService.addTab(currenturl);
    this.router.navigate([this.item.url]);
  }
}
