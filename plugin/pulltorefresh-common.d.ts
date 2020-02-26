import { ContentView } from '@nativescript/core/ui/content-view';
import { Property } from '@nativescript/core/ui/core/view';
import { PullToRefresh as PullToRefreshDefinition } from '.';
export * from '@nativescript/core/ui/content-view';
export declare class PullToRefreshBase extends ContentView implements PullToRefreshDefinition {
    static refreshEvent: string;
    refreshing: boolean;
    _addChildFromBuilder(name: string, value: any): void;
}
export declare const refreshingProperty: Property<PullToRefreshBase, boolean>;
