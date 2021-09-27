import { backgroundColorProperty, colorProperty } from '@nativescript/core';
import { Color } from '@nativescript/core/color';
import { indicatorColorProperty, indicatorColorStyleProperty, indicatorFillColorProperty, indicatorFillColorStyleProperty, PullToRefreshBase, refreshingProperty } from './pulltorefresh-common';

export * from './pulltorefresh-common';

export class PullToRefresh extends PullToRefreshBase {
  public nativeView: com.nativescript.swiperefreshlayout.CarouselFriendlySwipeRefreshLayout;

  //@ts-ignore
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

  [indicatorColorProperty.setNative](value: any) {
    const color = value ? value.android : this.color;
    this.nativeView.setColorSchemeColors([color]);
  }

  [indicatorColorStyleProperty.setNative](value: any) {
    // Inline property has priority
    if ((this as any).indicatorColor) {
      return;
    }
    const color = value ? value.android : this.color;
    this.nativeView.setColorSchemeColors([color]);
  }

  [indicatorFillColorProperty.setNative](value: any) {
    const color = value ? value.android : this.backgroundColor;
    this.nativeView.setProgressBackgroundColorSchemeColor(color);
  }

  [indicatorFillColorStyleProperty.setNative](value: any) {
    // Inline property has priority
    if ((this as any).indicatorFillColor) {
      return;
    }
    const color = value ? value.android : this.backgroundColor;
    this.nativeView.setProgressBackgroundColorSchemeColor(color);
  }
}
