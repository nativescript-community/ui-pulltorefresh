import { PullToRefreshBase } from './pulltorefresh-common';
export * from './pulltorefresh-common';
export declare class PullToRefresh extends PullToRefreshBase {
    createNativeView(): com.nativescript.swiperefreshlayout.CarouselFriendlySwipeRefreshLayout;
    initNativeView(): void;
    disposeNativeView(): void;
}
