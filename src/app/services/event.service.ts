import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  private fooSubject = new Subject<any>();

  publishSomeData(data: any) {
      this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
      return this.fooSubject;
  }
  
}
