import { Component } from '@angular/core';


@Component({
  selector: 'ns-home',
  templateUrl: './basic.component.html',
})
export class BasicComponent {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  refreshList(args) {
    const pullRefresh = args.object;
    console.log('Refresh has been triggered!');
    setTimeout(function() {
      pullRefresh.refreshing = false;
    }, 1000);
  }
}
