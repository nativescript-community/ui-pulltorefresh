import { Component } from '@angular/core';

import { registerElement } from '@nativescript/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';
registerElement('PullToRefresh', () => PullToRefresh);

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  refreshList(args) {
    const pullRefresh = args.object;
    console.log('Refresh has been triggered!');
    setTimeout(function() {
      pullRefresh.refreshing = false;
    }, 1000);
  }
}
