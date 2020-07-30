import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable()
export class AssistanceCoreServices {
  assistanceWaitingStatus: BehaviorSubject<boolean>;


  constructor() {
    this.assistanceWaitingStatus = new BehaviorSubject(false);
  }

  trackMyAssistance() {

    return true;
  }

  async setAssistanceStatus(isTracking: boolean) {
    await Storage.set({
      key: 'isTracking',
      value: JSON.stringify({ isTracking })
    });
  }

  async getAssistanceStatus(): Promise<any> {
    const ret = await Storage.get({ key: 'isTracking' });
    const tracking = JSON.parse(ret.value);
    return tracking;
  }


}