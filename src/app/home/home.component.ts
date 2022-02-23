import { Component, OnDestroy, OnInit } from '@angular/core';
import {  interval, Subject, Subscriber, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject();
 
  constructor() { }

  ngOnInit() {
    interval(1000).pipe(takeUntil(this._unsubscribe)).subscribe(count => {
      console.log(count);
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }
}
