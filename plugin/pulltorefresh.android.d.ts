import { PullToRefreshBase } from './pulltorefresh-common';
export * from './pulltorefresh-common';
export declare class PullToRefresh extends PullToRefreshBase {
    nativeView: com.nativescript.swiperefreshlayout.CarouselFriendlySwipeRefreshLayout;
    get android(): com.nativescript.swiperefreshlayout.CarouselFriendlySwipeRefreshLayout;
    createNativeView(): com.nativescript.swiperefreshlayout.CarouselFriendlySwipeRefreshLayout;
    initNativeView(): void;
    disposeNativeView(): void;
}
