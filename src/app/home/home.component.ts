import { Component, OnDestroy, OnInit } from '@angular/core';
import {  interval, Observable, Subject, Subscriber, Subscription } from 'rxjs';
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
    // interval(1000).pipe(takeUntil(this._unsubscribe)).subscribe(data => {
    //   console.log(data);
    // })

    const customIntervalObservable = Observable.create(observer => {
      let count = 0;

      setInterval(() => {
        observer.next(count); // .error() .complete()
        count++
      }, 1000);
    });

    customIntervalObservable.pipe(takeUntil(this._unsubscribe))
                            .subscribe(data => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }
}
