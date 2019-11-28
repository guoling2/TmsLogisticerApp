import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TmsoidcSecurityServivceService {

  constructor() {
  }


  private needlogout: boolean;

  public get NeedLogout(): boolean {
    return this.needlogout;
  }

  public set NeedLogout(value: boolean) {
    this.needlogout = value;
  }
}
