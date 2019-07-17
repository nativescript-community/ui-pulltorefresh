import { Color } from 'tns-core-modules/color';
import {
  backgroundColorProperty,
  colorProperty,
  PullToRefreshBase,
  refreshingProperty
} from './pulltorefresh-common';

export * from './pulltorefresh-common';

declare const global: any;

const SwipeRefreshLayout_Namespace = useAndroidX()
  ? androidx.swiperefreshlayout.widget
  : (android.support.v4 as any).widget;

const OnRefreshListener = useAndroidX()
  ? androidx.swiperefreshlayout.widget.SwipeRefreshLayout.OnRefreshListener
  : (android.support.v4 as any).widget.SwipeRefreshLayout.OnRefreshListener;

function useAndroidX() {
  return global.androidx && androidx.swiperefreshlayout;
}

class CarouselFriendlySwipeRefreshLayout extends SwipeRefreshLayout_Namespace.SwipeRefreshLayout {
  private _touchSlop: number;
  private _previousX: number;

  public constructor(
    context: android.content.Context,
    attrs: android.util.AttributeSet
  ) {
    super(context, attrs);

    this._touchSlop = android.view.ViewConfiguration.get(
      context
    ).getScaledTouchSlop();
  }

  public onInterceptTouchEvent(event: android.view.MotionEvent): boolean {
    switch (event.getAction()) {
      case android.view.MotionEvent.ACTION_DOWN: {
        this._previousX = android.view.MotionEvent.obtain(event).getX();
        break;
      }
      case android.view.MotionEvent.ACTION_MOVE: {
        const eventX = event.getX();
        const xDifference = Math.abs(eventX - this._previousX);

        if (xDifference > this._touchSlop) {
          return false;
        }

        break;
      }
    }

    return super.onInterceptTouchEvent(event);
  }
}

export class PullToRefresh extends PullToRefreshBase {
  private _androidViewId: number;

  public nativeView: androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

  get android(): androidx.swiperefreshlayout.widget.SwipeRefreshLayout {
    return this.nativeView;
  }

  public createNativeView() {
    const swipeRefreshLayout = new (CarouselFriendlySwipeRefreshLayout as any)(
      this._context
    );

    if (!this._androidViewId) {
      this._androidViewId = android.view.View.generateViewId();
    }
    swipeRefreshLayout.setId(this._androidViewId);

    const refreshListener = new TNS_SwipeRefreshListener(new WeakRef(this));
    console.log('refreshListener', refreshListener);
    swipeRefreshLayout.setOnRefreshListener(refreshListener);
    (swipeRefreshLayout as any).refreshListener = refreshListener;

    return swipeRefreshLayout;
  }

  public initNativeView() {
    super.initNativeView();

    const nativeView = this.nativeView as any;
    nativeView.refreshListener.owner = new WeakRef(this);
  }

  public disposeNativeView() {
    const nativeView = this.nativeView as any;
    nativeView.refreshListener.owner = null;

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

@Interfaces([
  androidx.swiperefreshlayout.widget.SwipeRefreshLayout.OnRefreshListener
])
class TNS_SwipeRefreshListener extends java.lang.Object {
  constructor(private owner: WeakRef<PullToRefresh>) {
    super();

    return global.__native(this);
  }

  public onRefresh(v) {
    const owner = this.owner.get();

    if (owner) {
      owner.refreshing = true;
      owner.notify({
        eventName: PullToRefreshBase.refreshEvent,
        object: owner
      });
    }
  }
}
