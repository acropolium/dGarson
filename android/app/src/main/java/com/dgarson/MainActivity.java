package com.dgarson;

import com.facebook.react.ReactActivity;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import android.os.Bundle;
import android.content.Intent;



public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "dGarson";
    }

    @Override
    public void onNewIntent(Intent intent){
        super.onNewIntent(intent);
        setIntent(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Fabric.with(this, new Crashlytics());
    }
}
