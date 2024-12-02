import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';

import { BasicComponent } from './basic/basic.component';

export const COMPONENTS = [BasicComponent];
@NgModule({
    schemas: [NO_ERRORS_SCHEMA]
})
export class InstallModule {}

export function installPlugin() {
    registerElement('PullToRefresh', () => PullToRefresh);
}

export const demos = [
    { name: 'Basic', path: 'basic', component: BasicComponent }
];
