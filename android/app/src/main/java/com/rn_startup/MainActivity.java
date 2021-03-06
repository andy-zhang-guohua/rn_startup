package com.rn_startup;

import com.facebook.react.ReactActivity;

// 以下两行import是为了SplashScreen功能
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;

// 以下两行是 react-native-orientation 需要
import android.content.Intent; // <--- import
import android.content.res.Configuration; // <--- import

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "rn_startup";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);// 该行是为了SplashScreen功能: 展示splash屏幕
        super.onCreate(savedInstanceState);
    }

    // for react-native-orientation
     @Override
     public void onConfigurationChanged(Configuration newConfig) {
         super.onConfigurationChanged(newConfig);
         Intent intent = new Intent("onConfigurationChanged");
         intent.putExtra("newConfig", newConfig);
         this.sendBroadcast(intent);
     }
}
