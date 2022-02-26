import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { takeUntil  } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  private _unsubscribe = new Subject();

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.activatedEmitter.pipe(takeUntil(this._unsubscribe))
                                     .subscribe((activatedStatus: boolean) => 
                                     this.userActivated = activatedStatus)
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }
}
