import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Match } from './player';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  matchSubject = new Subject<Match>(); 

  constructor() { }

  sendData(data){
    this.matchSubject.next(data);
  }
}
