import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasTokenService {

  hasToken: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      if (!!localStorage.getItem("token")) {
        this.hasToken.next(true);
      }
    }
  }
}
