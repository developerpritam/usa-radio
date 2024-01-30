import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { InterstitialAd } from 'react-native-google-mobile-ads'

const adUnitId = 'ca-app-pub-5603289619370435/4460898882';
  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: false,
  })

  const InterAd = () => {
    const [loaded, setLoaded] = useState(false);
  
    const loadInterstitialAd = async () => {
      try {
        await interstitial.load();
        setLoaded(true);
      } catch (error) {
        // console.log('Failed to load interstitial ad', error);
      }
    };
  
    const showInterstitialAd = async () => {
      if (loaded) {
        try {
          await interstitial.show();
          // setLoaded(false);
          setTimeout(() => setLoaded(false), 60000);
        } catch (error) {
          // console.log('Failed to show interstitial ad', error);
        }
      } else {
        loadInterstitialAd();
      }
    };
  
    return showInterstitialAd
  }

export default InterAd