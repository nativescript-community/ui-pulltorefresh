
package com.nativescript.swiperefreshlayout;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;
import android.view.ViewConfiguration;
import android.view.MotionEvent;
import android.content.Context;
import android.util.AttributeSet;

public class CarouselFriendlySwipeRefreshLayout extends SwipeRefreshLayout {
      private float _touchSlop;
    private float _previousX;
    public CarouselFriendlySwipeRefreshLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
        _touchSlop = ViewConfiguration.get(context).getScaledTouchSlop();
  }
    public CarouselFriendlySwipeRefreshLayout(Context context) {
    super(context, null);
    _touchSlop = ViewConfiguration.get(context).getScaledTouchSlop();
  }

  @Override
    public boolean onInterceptTouchEvent(MotionEvent event) {
    switch (event.getAction()) {
      case MotionEvent.ACTION_DOWN: {
        _previousX = MotionEvent.obtain(event).getX();
        break;
      }
      case MotionEvent.ACTION_MOVE: {
        final float eventX = event.getX();
        final float xDifference = Math.abs(eventX - _previousX);

        if (xDifference > _touchSlop) {
          return false;
        }

        break;
      }
    }

    return super.onInterceptTouchEvent(event);
  }
}