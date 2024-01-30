import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppNavigator from './src/AppNavigator'
import SplashScreen from 'react-native-splash-screen'
// import { RNCafeBazaarAdMob } from 'react-native-google-mobile-ads';
import mobileAds, { AdsConsent, AdsConsentStatus, AdsConsentDebugGeography } from 'react-native-google-mobile-ads';


const App = () => {

  const [isMobileAdsStartCalled, setIsMobileAdsStartCalled] = useState(false);

  // this is debug mode =====================================
  // import { AdsConsent, AdsConsentDebugGeography } from 'react-native-google-mobile-ads';

 
  
  // this is debug mode =====================================



  useEffect(() => {
    const requestConsentInfoAndUpdate = async () => {
      await AdsConsent.requestInfoUpdate();
      const adsConsentInfo = await AdsConsent.loadAndShowConsentFormIfRequired();

      if (adsConsentInfo.canRequestAds) {
        startGoogleMobileAdsSDK();
      }
    };

    requestConsentInfoAndUpdate();
  }, []);


  useEffect(() => {
    const checkAndStartAds = async () => {
      const { canRequestAds } = await AdsConsent.getConsentInfo();

      if (canRequestAds) {
        startGoogleMobileAdsSDK();
      }
    };

    checkAndStartAds();
  }, []);


  const startGoogleMobileAdsSDK = async () => {
    if (isMobileAdsStartCalled) return;

    setIsMobileAdsStartCalled(true);

    // (iOS) Handle Apple's App Tracking Transparency.

    // Initialize the Google Mobile Ads SDK.
    try {
      // (iOS) Handle Apple's App Tracking Transparency.
  
      // Initialize the Google Mobile Ads SDK.
      await mobileAds().initialize();
  
      // Request an ad...
    } catch (error) {
      // console.error('Error initializing Google Mobile Ads SDK:', error);
    }
    
    // await mobileAds().initialize();

    // Request an ad...
  };

  // return (
  //   // Your component JSX goes here
  // );
  

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
   <AppNavigator /> 
  )
}

export default App