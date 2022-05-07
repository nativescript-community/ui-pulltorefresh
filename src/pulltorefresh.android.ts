import { backgroundColorProperty, colorProperty } from '@nativescript/core';
import { Color } from '@nativescript/core/color';
import { indicatorColorProperty, indicatorFillColorProperty, PullToRefreshBase, refreshingProperty } from './pulltorefresh-common';

export * from './pulltorefresh-common';

export class PullToRefresh extends PullToRefreshBase {
  public createNativeView() {
    const swipeRefreshLayout = new com.nativescript.swiperefreshlayout.CarouselFriendlySwipeRefreshLayout(
      this._context
    );

    return swipeRefreshLayout;
  }

  public initNativeView() {
    super.initNativeView();

    const androidXListener = new androidx.swiperefreshlayout.widget.SwipeRefreshLayout.OnRefreshListener({
      onRefresh: () => {
        this.refreshing = true;
        this.notify({
          eventName: PullToRefreshBase.refreshEvent,
          object: this,
        });
      },
    });
    this.nativeViewProtected.setOnRefreshListener(androidXListener);
    this.nativeViewProtected.refreshListener = androidXListener;
  }

  public disposeNativeView() {
    this.nativeViewProtected.refreshListener = null;

    super.disposeNativeView();
  }

  [refreshingProperty.setNative](value: boolean) {
    this.nativeViewProtected.setRefreshing(value);
  }

  [indicatorColorProperty.setNative](value: any) {
    const colors = [];
    value && colors.push(value.android);
    this.nativeViewProtected.setColorSchemeColors(colors);
  }

  [indicatorFillColorProperty.setNative](value: any) {
    const color = value ? value.android : null;
    this.nativeViewProtected.setProgressBackgroundColorSchemeColor(color);
  }
}
