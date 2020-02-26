import { PullToRefreshBase } from './pulltorefresh-common';
export * from './pulltorefresh-common';
export declare class PullToRefresh extends PullToRefreshBase {
    private _handler;
    refreshControl: UIRefreshControl;
    constructor();
    onLoaded(): void;
}
