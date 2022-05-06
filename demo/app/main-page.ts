/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData, fromObject, Page } from '@nativescript/core';

// Event handler for Page 'navigatingTo' event attached in main-page.xml
export function navigatingTo(args: EventData) {
  const page = <Page>args.object
  page.bindingContext = fromObject({
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  });
}

export function refreshList(args) {
  const pullRefresh = args.object;
  console.log('Refresh has been triggered!');
  setTimeout(function() {
    pullRefresh.refreshing = false;
  }, 1000);
}