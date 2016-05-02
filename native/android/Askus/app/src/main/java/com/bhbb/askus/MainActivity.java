package com.bhbb.askus;

import android.content.Context;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.RelativeLayout;

public class MainActivity extends AppCompatActivity {

    protected WebView mainWebView;
    private Context mContext;
    private WebView mWebviewPop;
    private RelativeLayout mContainer;

    private String askus_url = "http://askus.me/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mainWebView = (WebView) findViewById(R.id.webView);

        //Get outer container
        mContainer = (RelativeLayout) findViewById(R.id.layout);

        //Settings
        WebSettings webSettings = mainWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAppCacheEnabled(true);
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        webSettings.setSupportMultipleWindows(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.KITKAT) {
            webSettings.setDatabasePath("/data/data/" + mainWebView.getContext().getPackageName() + "/databases/");
        }

        //Set client
        mainWebView.setWebViewClient(new MyCustomWebViewClient());
        mainWebView.setWebChromeClient(new MyCustomChromeClient());

        //Set style
        mainWebView.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_OVERLAY);
        mainWebView.setBackgroundColor(Color.parseColor("#673ab7"));

        //Load URL
        mainWebView.loadUrl(askus_url);

        mContext=this.getApplicationContext();
    }

    private class MyCustomWebViewClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            String host = Uri.parse(url).getHost();
            Log.e("Loading url :", Uri.parse(url).getHost());
            return false;
        }
    }

    private class MyCustomChromeClient extends WebChromeClient
    {

        @Override
        public boolean onCreateWindow(WebView view, boolean isDialog,
                                      boolean isUserGesture, Message resultMsg) {
            mWebviewPop = new WebView(mContext);
            mWebviewPop.setVerticalScrollBarEnabled(false);
            mWebviewPop.setHorizontalScrollBarEnabled(false);
            mWebviewPop.setWebViewClient(new MyCustomWebViewClient());
            mWebviewPop.getSettings().setJavaScriptEnabled(true);
            mWebviewPop.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
            mWebviewPop.getSettings().setSupportMultipleWindows(true);

            mWebviewPop.setWebChromeClient(new WebChromeClient() {
                @Override
                public boolean onCreateWindow(WebView view, boolean isDialog,
                                              boolean isUserGesture, Message resultMsg) {
                    return true;
                }

                @Override
                public void onCloseWindow(WebView view) {
                    view.setVisibility(View.GONE);
                    mContainer.removeView(view);
                    view=null;
                }

                @Override
                public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                    Log.e("popup console.log", consoleMessage.message() + '\n' + consoleMessage.messageLevel() + '\n' + consoleMessage.sourceId());
                    return super.onConsoleMessage(consoleMessage);
                }
            });

            mWebviewPop.setLayoutParams(new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT));


            mContainer.addView(mWebviewPop);

            // Open popup on this app
            WebView.WebViewTransport transport = (WebView.WebViewTransport) resultMsg.obj;
            transport.setWebView(mWebviewPop);
            resultMsg.sendToTarget();

            return true;
        }

        @Override
        public void onCloseWindow(WebView view) {
        }

        @Override
        public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
            Log.e("console.log", consoleMessage.message() + '\n' + consoleMessage.messageLevel() + '\n' + consoleMessage.sourceId());
            return super.onConsoleMessage(consoleMessage);
        }
    }
}
