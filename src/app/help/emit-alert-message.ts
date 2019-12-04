import {TmsResponseModle, TmsresponseStatusCode} from '../models/tms-response.module';
import {EmitService} from './emit-service';

export class EmitAlertMessage {

   constructor(messageType: AlertMessageType, title: string, message: string, showType: MessageShowType= MessageShowType.Alert) {

     this.Title = title;
     this.Message = message;
     this.MessageType = messageType;
     this.ShowType = showType;
   }
  public  MessageType: AlertMessageType;

  public  Title: string;

  public  Message: string;

  public  ShowType: MessageShowType;
}

export enum AlertMessageType { Info, Error, Succeed}
export enum  MessageShowType { Alert, Toast}

export  class EmitAlertMessageHelo {

  public static ShowMessage(emitService: EmitService, tmsResponse: TmsResponseModle, messagetype: MessageShowType): void {

    if (tmsResponse.StatusCode !== TmsresponseStatusCode.Succeed()) {
      emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', tmsResponse.Error.ErrorMsg, messagetype));
    } else {
      emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Succeed, '系统信息', tmsResponse.Info, messagetype));
    }

  }

  public static ShowMessageWithReplaceMsg(emitService: EmitService, tmsResponse: TmsResponseModle, succeedmsg: string, errormsg: string, messagetype: MessageShowType): void {

    if (tmsResponse.StatusCode !== TmsresponseStatusCode.Succeed()) {
      tmsResponse.Info = succeedmsg;
    } else {
    // public ErrorMsg: string;
    // public Code: string;
      tmsResponse.Error = {ErrorMsg: errormsg, Code: '0'};
    }

    this.ShowMessage(emitService, tmsResponse, messagetype);

  }
}




