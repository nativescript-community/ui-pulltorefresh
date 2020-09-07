<a align="center" href="https://www.npmjs.com/package/@Akylas/nativescript-pulltorefresh">
    <h2 align="center">NativeScript-PullToRefresh</h2>
</a>
<h4 align="center">
NativeScript plugin to use Pull to Refresh on any view.
</h4>

<p align="center">
    <a href="https://www.npmjs.com/package/@Akylas/nativescript-pulltorefresh">
        <img src="https://img.shields.io/npm/v/@Akylas/nativescript-pulltorefresh.svg" alt="npm">
    </a>
    <a href="https://www.npmjs.com/package/@Akylas/nativescript-pulltorefresh">
        <img src="https://img.shields.io/npm/dt/@Akylas/nativescript-pulltorefresh.svg?label=npm%20downloads" alt="npm">
    </a>
    <a href="https://github.com/Akylas/nativescript-pulltorefresh/stargazers">
        <img src="https://img.shields.io/github/stars/Akylas/nativescript-pulltorefresh.svg" alt="stars">
    </a>
     <a href="https://github.com/Akylas/nativescript-pulltorefresh/network">
        <img src="https://img.shields.io/github/forks/Akylas/nativescript-pulltorefresh.svg" alt="forks">
    </a>
    <a href="https://github.com/Akylas/nativescript-pulltorefresh/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/Akylas/nativescript-pulltorefresh.svg" alt="license">
    </a>
    <a href="https://nstudio.io">
      <img src="https://github.com/nstudio/media/blob/master/images/nstudio-banner.png?raw=true" alt="nStudio banner">
    </a>
    <h5 align="center">Do you need assistance on your project or plugin? Contact the nStudio team anytime at <a href="mailto:team@nstudio.io">team@nstudio.io</a> to get up to speed with the best practices in mobile and web app development.
    </h5>
</p>

---

## Installation

`tns plugin add @Akylas/nativescript-pulltorefresh`

#### [Android - _SwipeRefreshLayout_](http://developer.android.com/reference/android/support/v4/widget/SwipeRefreshLayout.html)

#### [iOS - _UIRefreshControl_](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIRefreshControl_class/)

### Sample Screen

| Android                                        | iOS                                    |
| ---------------------------------------------- | -------------------------------------- |
| ![Android Sample](screens/android_refresh.gif) | ![iOS Sample](screens/ios_refresh.gif) |

## Usage

### NativeScript Core

#### XML

```xml
<page xmlns="http://schemas.nativescript.org/tns.xsd"
      xmlns:PullRefresh="@Akylas/nativescript-pulltorefresh"
      loaded="pageLoaded">
    <PullRefresh:PullToRefresh refresh="refreshList">
        <list-view items="{{ users }}">
            <list-view.itemTemplate>
                <label text="{{ name }}" row="0" col="1"textWrap="true" class="message" />
            </list-view.itemTemplate>
        </list-view>
    </PullRefresh:PullToRefresh>
</page>
```

#### JS

```javascript
function refreshList(args) {
  // Get reference to the PullToRefresh component;
  var pullRefresh = args.object;

  // Do work here... and when done call set refreshing property to false to stop the refreshing
  loadItems().then(
    resp => {
      // ONLY USING A TIMEOUT TO SIMULATE/SHOW OFF THE REFRESHING
      setTimeout(() => {
        pullRefresh.refreshing = false;
      }, 1000);
    },
    err => {
      pullRefresh.refreshing = false;
    }
  );
}
exports.refreshList = refreshList;
```

### Angular NativeScript

```typescript
import { registerElement } from "nativescript-angular/element-registry";
registerElement("PullToRefresh", () => require("@Akylas/nativescript-pulltorefresh").PullToRefresh);

refreshList(args) {
         const pullRefresh = args.object;
         setTimeout(function () {
            pullRefresh.refreshing = false;
         }, 1000);
    }
```

#### HTML

```html
<PullToRefresh (refresh)="refreshList($event)">
  <ListView [items]="itemList">
    <template let-item="item">
      <label [text]="item.id"></label>
    </template>
  </ListView>
</PullToRefresh>
```

### NativeScript Vue

```javascript
import Vue from 'nativescript-vue';

Vue.registerElement(
  'PullToRefresh',
  () => require('@Akylas/nativescript-pulltorefresh').PullToRefresh
);
```

#### Component

```vue
<template>
  <Page>
    <PullToRefresh @refresh="refreshList">
      <ListView for="item in listOfItems" @itemTap="onItemTap">
        <v-template>
          <!-- Shows the list item label in the default color and style. -->
          <label :text="item.text" />
        </v-template>
      </ListView>
    </PullToRefresh>
  </Page>
</template>

<script>
export default {
  methods: {
    refreshList(args) {
      var pullRefresh = args.object;
      setTimeout(function() {
        pullRefresh.refreshing = false;
      }, 1000);
    }
  }
};
</script>
```

## Properties

- **refresh : function** _required_
- **refreshing: boolean** - Notifies the widget that the refresh state has
  changed.

## [Changelog](./CHANGELOG.md)

## [Contributing](./CONTRIBUTING.md)
