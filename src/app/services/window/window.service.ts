import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  // tslint:disable-next-line: typedef
  get windowRef() {
    return window;
  }

}
