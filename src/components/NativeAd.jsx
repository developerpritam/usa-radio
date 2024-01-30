import { View, useColorScheme, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect } from 'react'
import NativeAdView, { AdBadge, AdManager, AdvertiserView, CallToActionView, HeadlineView, IconView, ImageView, NativeMediaView, PriceView, StarRatingView, StoreView, TaglineView } from "react-native-admob-native-ads";
import { MyColor } from '../drawer/screen/Home';

const NativeAd = () => {
    const theme = useColorScheme();
    const nativeAdViewRef = useRef();

    React.useEffect(() => {
        nativeAdViewRef.current?.loadAd();
    }, []);

    AdManager.registerRepository({
        name: 'imageAd',
        // adUnitId: "ca-app-pub-5603289619370435/5594889292",
        adUnitId: "ca-app-pub-3940256099942544/2247696110", // test ads 
        requestNonPersonalizedAdsOnly: false,
        videoOptions: {
            mute: false,
        },
    })

    // =================== Auto refresh native ad ========================
    const loadNativeAd = () => {
        nativeAdViewRef.current?.loadAd();
    };

    useEffect(() => {
        // Initial load
        loadNativeAd();
        const refreshInterval = setInterval(loadNativeAd, 60000);
        return () => {
            clearInterval(refreshInterval);
        };
    }, []);
    // =================== Auto refresh native ad ========================

    return (
        <View style={{ alignItems: 'center' }}>
            <NativeAdView
                style={{ alignItems: 'center', marginBottom: 10, justifyContent: 'center' }}
                ref={nativeAdViewRef}
                repository="imageAd"
            >
                <View style={{ backgroundColor: theme === 'light' ? MyColor.white : MyColor.cardDarkBg, padding: 15, flexDirection: 'row', alignItems: 'center', borderRadius: 10, width: '70%' }}>
                    <AdBadge style={{ alignItems: 'center', justifyContent: 'center' }} />
                    <View style={{ marginRight: 15 }}>
                        <IconView style={{ width: 85, height: 85 }} />
                    </View>
                    <View>
                        <AdvertiserView />
                        <TaglineView style={{ color: theme === 'light' ? MyColor.fontColor : MyColor.darkText, fontWeight: '600', marginVertical: 8 }} />

                        <HeadlineView style={{ color: theme === 'light' ? MyColor.fontColor : MyColor.darkText, fontSize: 13 }} />
                        {/* <ImageView /> */}
                        {/* <NativeMediaView /> */}
                        {/* <PriceView style={{ color: theme === 'light' ? MyColor.fontColor : MyColor.darkText }} /> */}
                        {/* <StarRatingView /> */}
                        {/* <StoreView style={{ color: theme === 'light' ? MyColor.fontColor : MyColor.darkText }} /> */}

                        {/* <TouchableOpacity onPress={() => handleCTAButtonPress()} style={{ marginTop: 8, backgroundColor: MyColor.primaryColor, paddingVertical: 6, borderRadius: 5 }}>
                            <CallToActionView style={{ height: 25, fontWeight: '700' }} />
                        </TouchableOpacity> */}
                    </View>
                </View>
            </NativeAdView>
        </View>
    );
}


export default NativeAd