import {
  CSSType,
  Color,
  ContentView,
  CssProperty,
  Property,
  Style,
} from '@nativescript/core';
import { PullToRefresh as PullToRefreshDefinition } from '.';

@CSSType('PullToRefresh')
export class PullToRefreshBase
  extends ContentView
  implements PullToRefreshDefinition
{
  public static refreshEvent = 'refresh';

  public refreshing: boolean;

  get indicatorColor(): Color {
    return (this.style as any).indicatorColor;
  }

  set indicatorColor(value: Color) {
    (this.style as any).indicatorColor = value;
  }

  get indicatorFillColor(): Color {
    return (this.style as any).indicatorFillColor;
  }

  set indicatorFillColor(value: Color) {
    (this.style as any).indicatorFillColor = value;
  }
}

export const refreshingProperty = new Property<PullToRefreshBase, boolean>({
  name: 'refreshing',
  defaultValue: false,
});
refreshingProperty.register(PullToRefreshBase);

export const indicatorColorProperty = new CssProperty<Style, Color>({
  name: 'indicatorColor',
  cssName: 'indicator-color',
  equalityComparer: Color.equals,
  valueConverter: (v) => new Color(v),
});
indicatorColorProperty.register(Style);

export const indicatorFillColorProperty = new CssProperty<Style, Color>({
  name: 'indicatorFillColor',
  cssName: 'indicator-fill-color',
  equalityComparer: Color.equals,
  valueConverter: (v) => new Color(v),
});
indicatorFillColorProperty.register(Style);
