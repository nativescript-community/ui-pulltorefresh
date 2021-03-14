import { ContentView, CSSType, Property, View } from '@nativescript/core';
import { PullToRefresh as PullToRefreshDefinition } from '.';

@CSSType('PullToRefresh')
export class PullToRefreshBase
  extends ContentView
  implements PullToRefreshDefinition {
  public static refreshEvent = 'refresh';

  public refreshing: boolean;

  public _addChildFromBuilder(name: string, value: any) {
    // copy inheritable style property values
    const originalColor = value.style.color || null;
    const originaBackgroundColor = value.style.backgroundColor || null;

    if (value instanceof View) {
      this.content = value;
    }

    // reset inheritable style property values as we do not want those to be inherited
    value.style.color = originalColor;
    value.style.backgroundColor = originaBackgroundColor;
  }
}

export const refreshingProperty = new Property<PullToRefreshBase, boolean>({
  name: 'refreshing',
  defaultValue: false,
});
refreshingProperty.register(PullToRefreshBase);
