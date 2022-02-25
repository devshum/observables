import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { takeUntil, map, filter } from 'rxjs/operators';
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
        if (count === 2) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error('Count is greater 3!'))
        }
        count++
      }, 1000);
    });

    customIntervalObservable.pipe(
                              filter((data: number) => data > 0), // фильтрация
                              map((data: number) => `Round ${data + 1}`), // переобразование
                              takeUntil(this._unsubscribe) // условия

                            ).subscribe(
                                      data => { console.log(data); }, // 
                                      error => { console.log(error) }, // ...
                                      () => { console.log('Completed') } // Round 2 Round 3 Completed 
                                      );
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }
}
