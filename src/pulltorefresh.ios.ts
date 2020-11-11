import { Color } from '@nativescript/core/color';
import {
  backgroundColorProperty,
  colorProperty,
  Utils,
} from '@nativescript/core';
import { PullToRefreshBase, refreshingProperty } from './pulltorefresh-common';

export * from './pulltorefresh-common';

@NativeClass
class PullToRefreshHandler extends NSObject {
  public static ObjCExposedMethods = {
    handleRefresh: { returns: interop.types.void, params: [UIRefreshControl] },
  };

  private _owner: WeakRef<PullToRefresh>;

  public static initWithOnwer(
    owner: WeakRef<PullToRefresh>
  ): PullToRefreshHandler {
    const impl = <PullToRefreshHandler>PullToRefreshHandler.new();
    impl._owner = owner;
    return impl;
  }

  public handleRefresh(refreshControl: UIRefreshControl) {
    const pullToRefresh = this._owner.get();
    pullToRefresh.refreshing = true;
    pullToRefresh.notify({
      eventName: PullToRefreshBase.refreshEvent,
      object: pullToRefresh,
    });
  }
}

const SUPPORT_REFRESH_CONTROL = Utils.ios.MajorVersion >= 10;

export class PullToRefresh extends PullToRefreshBase {
  private _handler: PullToRefreshHandler;

  // NOTE: We cannot use the default ios property as the UIRefreshControl can be added only to UIScrollViews!
  public refreshControl: UIRefreshControl;

  constructor() {
    super();

    this.refreshControl = UIRefreshControl.alloc().init();
    this._handler = PullToRefreshHandler.initWithOnwer(new WeakRef(this));
    this.refreshControl.addTargetActionForControlEvents(
      this._handler,
      'handleRefresh',
      UIControlEvents.ValueChanged
    );
  }

  onLoaded() {
    super.onLoaded();
    this._onContentChanged(null, this.content);
  }
  _onContentChanged(oldView, newView) {
    if (!newView || !newView.nativeViewProtected) {
      return;
    }
    const nNewView = newView.nativeViewProtected;
    if (nNewView instanceof UIScrollView) {
      if (SUPPORT_REFRESH_CONTROL) {
        nNewView.refreshControl = this.refreshControl;
      } else {
        // ensure that we can trigger the refresh, even if the content is not large enough
        nNewView.alwaysBounceVertical = true;

        nNewView.addSubview(this.refreshControl);
      }
    } else if (nNewView instanceof WKWebView) {
      if (SUPPORT_REFRESH_CONTROL) {
        nNewView.scrollView.refreshControl = this.refreshControl;
      } else {
        // ensure that we can trigger the refresh, even if the content is not large enough
        nNewView.scrollView.alwaysBounceVertical = true;

        nNewView.scrollView.addSubview(this.refreshControl);
      }
    } else if (
      typeof TKListView !== 'undefined' &&
      nNewView instanceof TKListView
    ) {
      if (SUPPORT_REFRESH_CONTROL) {
        nNewView.collectionView.refreshControl = this.refreshControl;
      } else {
        // ensure that we can trigger the refresh, even if the content is not large enough
        nNewView.collectionView.alwaysBounceVertical = true;

        nNewView.collectionView.addSubview(this.refreshControl);
      }
    } else if (nNewView instanceof WKWebView) {
      if (SUPPORT_REFRESH_CONTROL) {
        nNewView.scrollView.refreshControl = this.refreshControl;
      } else {
        // ensure that we can trigger the refresh, even if the content is not large enough
        nNewView.scrollView.alwaysBounceVertical = true;

        nNewView.scrollView.addSubview(this.refreshControl);
      }
    } else {
      throw new Error(
        'Content must inherit from either UIScrollView or WKWebView!'
      );
    }
  }

  [refreshingProperty.getDefault](): boolean {
    return false;
  }
  [refreshingProperty.setNative](value: boolean) {
    if (value) {
      this.refreshControl.beginRefreshing();
    } else {
      this.refreshControl.endRefreshing();
    }
  }

  [colorProperty.getDefault](): UIColor {
    return this.refreshControl.tintColor;
  }
  [colorProperty.setNative](value: Color | UIColor) {
    const color = value instanceof Color ? value.ios : value;

    this.refreshControl.tintColor = color;
  }

  [backgroundColorProperty.getDefault](): UIColor {
    return this.refreshControl.backgroundColor;
  }
  [backgroundColorProperty.setNative](value: Color | UIColor) {
    const color = value instanceof Color ? value.ios : value;

    this.refreshControl.backgroundColor = color;
  }
}
