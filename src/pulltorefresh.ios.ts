import { Color } from '@nativescript/core/color';
import {
  backgroundColorProperty,
  colorProperty,
  Utils,
  View,
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
  public nativeViewProtected: UIRefreshControl;

  createNativeView() {
    return UIRefreshControl.alloc().init();
  }

  initNativeView() {
    super.initNativeView();
    this._handler = PullToRefreshHandler.initWithOnwer(new WeakRef(this));
    this.nativeViewProtected.addTargetActionForControlEvents(
      this._handler,
      'handleRefresh',
      UIControlEvents.ValueChanged
    );
  }
  disposeNativeView() {
    if (this._handler) {
      this.nativeViewProtected.removeTargetActionForControlEvents(
        this._handler,
        'handleRefresh',
        UIControlEvents.ValueChanged
      );
      this._handler = null;
    }

    super.disposeNativeView();
  }

  //@private
  /**
   * Called when the content property has changed.
   * @private
   * @param oldView The previous content.
   * @param newView The new content.
   */
  public _onContentChanged(oldView: View, newView: View) {
    // super._onContentChanged(oldView, newView);

    if (!newView) {
      return;
    }
    const nNativeView = newView.nativeViewProtected;

    if (nNativeView instanceof UIScrollView) {
      if (SUPPORT_REFRESH_CONTROL) {
        nNativeView.refreshControl = this.nativeViewProtected;
      } else {
        // ensure that we can trigger the refresh, even if the content is not large enough
        nNativeView.alwaysBounceVertical = true;

        nNativeView.addSubview(this.nativeViewProtected);
      }
    } else if (nNativeView instanceof WKWebView) {
      if (SUPPORT_REFRESH_CONTROL) {
        nNativeView.scrollView.refreshControl = this.nativeViewProtected;
      } else {
        // ensure that we can trigger the refresh, even if the content is not large enough
        nNativeView.scrollView.alwaysBounceVertical = true;

        nNativeView.scrollView.addSubview(
          this.nativeViewProtected
        );
      }
    } else if (
      typeof TKListView !== 'undefined' &&
      nNativeView instanceof TKListView
    ) {
      if (SUPPORT_REFRESH_CONTROL) {
        nNativeView.collectionView.refreshControl = this.nativeViewProtected;
      } else {
        // ensure that we can trigger the refresh, even if the content is not large enough
        nNativeView.collectionView.alwaysBounceVertical = true;

        nNativeView.collectionView.addSubview(
          this.nativeViewProtected
        );
      }
    } else if (nNativeView instanceof WKWebView) {
      if (SUPPORT_REFRESH_CONTROL) {
        nNativeView.scrollView.refreshControl = this.nativeViewProtected;
      } else {
        // ensure that we can trigger the refresh, even if the content is not large enough
        nNativeView.scrollView.alwaysBounceVertical = true;

        nNativeView.scrollView.addSubview(
          this.nativeViewProtected
        );
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
      this.nativeViewProtected.beginRefreshing();
    } else {
      this.nativeViewProtected.endRefreshing();
    }
  }

  [colorProperty.getDefault](): UIColor {
    return this.nativeViewProtected.tintColor;
  }
  [colorProperty.setNative](value: Color | UIColor) {
    const color = value instanceof Color ? value.ios : value;

    this.nativeViewProtected.tintColor = color;
  }

  [backgroundColorProperty.getDefault](): UIColor {
    return this.nativeViewProtected.backgroundColor;
  }
  [backgroundColorProperty.setNative](value: Color | UIColor) {
    const color = value instanceof Color ? value.ios : value;

    this.nativeViewProtected.backgroundColor = color;
  }
}
