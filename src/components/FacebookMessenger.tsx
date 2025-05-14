'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: {
      init: (config: { xfbml: boolean; version: string }) => void;
    };
  }
}

interface FacebookMessengerProps {
  pageId: string;
  themeColor?: string;
  loggedInGreeting?: string;
  loggedOutGreeting?: string;
}

export default function FacebookMessenger({
  pageId,
  themeColor = '#0084ff',
  loggedInGreeting = 'สวัสดี! มีอะไรให้ช่วยไหมครับ?',
  loggedOutGreeting = 'สวัสดี! มีอะไรให้ช่วยไหมครับ?',
}: FacebookMessengerProps) {
  useEffect(() => {
    // Load Facebook SDK
    window.fbAsyncInit = function() {
      window.FB.init({
        xfbml: true,
        version: 'v18.0'
      });
    };

    // Load Facebook SDK script
    (function(d, s, id) {
      const js = d.createElement(s) as HTMLScriptElement;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js.id = id;
      js.src = 'https://connect.facebook.net/th_TH/sdk/xfbml.customerchat.js';
      fjs.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <>
      <div id="fb-root"></div>
      <div
        className="fb-customerchat"
        data-attribution="biz_inbox"
        data-page-id={pageId}
        data-theme-color={themeColor}
        data-logged-in-greeting={loggedInGreeting}
        data-logged-out-greeting={loggedOutGreeting}
      ></div>
    </>
  );
} 