import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { ContaInfo } from 'src/app/models/contactNumber.model';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageContactService {
  async setObjectUserContact(contact: ContaInfo) {
    await Storage.set({
      key: 'contactInfo',
      value: JSON.stringify({
        primaryContact: contact.primaryContact,
        secondaryContact: contact.secondaryContact,
      })
    });
  }

  async getUserContact(): Promise<ContaInfo> {
    const ret = await Storage.get({ key: 'contactInfo' });
    const contact = JSON.parse(ret.value);
    return contact;
  }

  async clearContactStorage() {
    await Storage.clear();
  }
}
