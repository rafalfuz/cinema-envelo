import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <app-top-bar></app-top-bar>
    <router-outlet></router-outlet>
    <app-footbar></app-footbar>`,
})
export class AppComponent {
  title = 'new-cinema';
}
