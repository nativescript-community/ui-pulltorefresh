import { backgroundColorProperty, colorProperty } from '@nativescript/core';
import { Color } from '@nativescript/core/color';
import { PullToRefreshBase, refreshingProperty } from './pulltorefresh-common';

export * from './pulltorefresh-common';

export class PullToRefresh extends PullToRefreshBase {
  public nativeView: com.nativescript.swiperefreshlayout.CarouselFriendlySwipeRefreshLayout;

  get android() {
    return this.nativeView;
  }

  public createNativeView() {
    const swipeRefreshLayout = new com.nativescript.swiperefreshlayout.CarouselFriendlySwipeRefreshLayout(
      this._context
    );

    return swipeRefreshLayout;
  }

  public initNativeView() {
    super.initNativeView();

    const nativeView = this.nativeView as any;
    const androidXListener = new androidx.swiperefreshlayout.widget.SwipeRefreshLayout.OnRefreshListener(
      {
        onRefresh: () => {
          this.refreshing = true;
          this.notify({
            eventName: PullToRefreshBase.refreshEvent,
            object: this,
          });
        },
      }
    );
    nativeView.setOnRefreshListener(androidXListener);
    (nativeView as any).refreshListener = androidXListener;
  }

  public disposeNativeView() {
    const nativeView = this.nativeView as any;
    (nativeView as any).refreshListener = null;

    super.disposeNativeView();
  }

  [refreshingProperty.getDefault](): boolean {
    return false;
  }
  [refreshingProperty.setNative](value: boolean) {
    this.nativeView.setRefreshing(value);
  }

  [colorProperty.setNative](value: Color | number) {
    const color = value instanceof Color ? value.android : value;
    this.nativeView.setColorSchemeColors([color]);
  }

  [backgroundColorProperty.setNative](value: Color | number) {
    const color = value instanceof Color ? value.android : value;
    this.nativeView.setProgressBackgroundColorSchemeColor(color);
  }
}
