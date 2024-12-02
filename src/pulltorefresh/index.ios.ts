import { Utils } from '@nativescript/core';
import {
  PullToRefreshBase,
  indicatorColorProperty,
  indicatorFillColorProperty,
  refreshingProperty,
} from './index.common';

export * from './index.common';

@NativeClass
class PullToRefreshHandler extends NSObject {
  public static ObjCExposedMethods = {
    handleRefresh: { returns: interop.types.void, params: [UIRefreshControl] },
  };

  private _owner: WeakRef<PullToRefresh>;

  public static initWithOnwer(
    owner: WeakRef<PullToRefresh>,
  ): PullToRefreshHandler {
    const impl = PullToRefreshHandler.new() as PullToRefreshHandler;
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
  private mHandler: PullToRefreshHandler;

  // NOTE: We cannot use the default ios property as the UIRefreshControl can be added only to UIScrollViews!
  private mRefreshControl: UIRefreshControl;

  constructor() {
    super();

    this.mRefreshControl = UIRefreshControl.alloc().init();
    this.mHandler = PullToRefreshHandler.initWithOnwer(new WeakRef(this));
    this.mRefreshControl.addTargetActionForControlEvents(
      this.mHandler,
      'handleRefresh',
      UIControlEvents.ValueChanged,
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
    const owner = newView.nativeViewProtected;
    if (owner instanceof UIScrollView) {
      if (SUPPORT_REFRESH_CONTROL) {
        owner.refreshControl = this.mRefreshControl;
      } else {
        // ensure that we can trigger the refresh, even if the content is not large enough
        owner.alwaysBounceVertical = true;

        owner.addSubview(this.mRefreshControl);
      }
    } else if (owner instanceof WKWebView) {
      if (SUPPORT_REFRESH_CONTROL) {
        owner.scrollView.refreshControl = this.mRefreshControl;
      } else {
        // ensure that we can trigger the refresh, even if the content is not large enough
        owner.scrollView.alwaysBounceVertical = true;

        owner.scrollView.addSubview(this.mRefreshControl);
      }
    } else if (
      typeof TKListView !== 'undefined' &&
      owner instanceof TKListView
    ) {
      if (SUPPORT_REFRESH_CONTROL) {
        owner.collectionView.refreshControl = this.mRefreshControl;
      } else {
        // ensure that we can trigger the refresh, even if the content is not large enough
        owner.collectionView.alwaysBounceVertical = true;

        owner.collectionView.addSubview(this.mRefreshControl);
      }
    } else if (owner instanceof WKWebView) {
      if (SUPPORT_REFRESH_CONTROL) {
        owner.scrollView.refreshControl = this.mRefreshControl;
      } else {
        // ensure that we can trigger the refresh, even if the content is not large enough
        owner.scrollView.alwaysBounceVertical = true;

        owner.scrollView.addSubview(this.mRefreshControl);
      }
    } else {
      throw new Error(
        'Content must inherit from either UIScrollView or WKWebView!',
      );
    }
  }

  [refreshingProperty.setNative](value: boolean) {
    if (value) {
      this.mRefreshControl.beginRefreshing();
    } else {
      this.mRefreshControl.endRefreshing();
    }
  }

  [indicatorColorProperty.getDefault](): UIColor {
    return this.mRefreshControl.tintColor;
  }

  [indicatorColorProperty.setNative](value: any) {
    const color = value ? value.ios : null;
    this.mRefreshControl.tintColor = color;
  }

  [indicatorFillColorProperty.getDefault](): UIColor {
    return this.mRefreshControl.backgroundColor;
  }

  [indicatorFillColorProperty.setNative](value: any) {
    const color = value ? value.ios : null;
    this.mRefreshControl.backgroundColor = color;
  }
}
