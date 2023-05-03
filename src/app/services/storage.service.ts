import { Injectable } from '@angular/core';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this.storage.set(key, value);
  }

  public async get(key: string): Promise<any> {
    try {
      const result = await this.storage.get(key);
      if (result != null) {
        return result;
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  remove(key: string) {
    this.storage.remove(key);
  }

  clear(){
    this.storage.clear();
  }


}