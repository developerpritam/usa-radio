import { View, Text, useColorScheme, Image, ActivityIndicator, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { globalStyle } from '../../globalStyle';
import Video from 'react-native-video';
import NativeAd from '../../components/NativeAd';
import { MyColor } from './Home';
// import PrevNext from 'react-native-vector-icons/MaterialCommunityIcons';
// import PlayPause from 'react-native-vector-icons/AntDesign';
import PlayPause from 'react-native-vector-icons/Ionicons';
import NoInternet from '../../components/NoInternet';
// import InterAd from '../../components/InterAd';

const ListenRadio = ({ navigation, route }) => {
    const theme = useColorScheme();
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [paused, setPaused] = useState(false);
    // const showInterstitialAd = InterAd();

    // this is for hide video controls after 3 seconds
    const { myUserData, currentIndex } = route.params;

    const videoLoaded = () => setIsVideoLoaded(true);

    useEffect(() => {
        // Set the currentIndex as the initial video to play
        setIsVideoLoaded(false);
    }, [currentIndex]);

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % myUserData.length;
        navigation.setParams({ currentIndex: nextIndex });
    };

    const handlePrevious = () => {
        const prevIndex = (currentIndex - 1 + myUserData.length) % myUserData.length;
        navigation.setParams({ currentIndex: prevIndex });
    };
    // ========= video control ==========

    const showToast = () => {
        ToastAndroid.show('This Channel is not available now, Please try again later', ToastAndroid.LONG);
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme === 'light' ? MyColor.bgColor : MyColor.darkmodeBg }}>

            <NoInternet />
            <View style={{ marginVertical: 10 }}>
                {/* <MyAds /> */}
                <NativeAd />
            </View>
            <View style={globalStyle.radioWrapper}>
                <Image
                    style={globalStyle.radioImg}
                    source={{
                        uri: myUserData[currentIndex].image,
                    }}
                />
                <Text style={[globalStyle.radioTitle, { color: theme === 'light' ? MyColor.fontColor : MyColor.darkText }]}>{myUserData[currentIndex].title}</Text>

                <View style={[globalStyle.radioDetailWr, { backgroundColor: theme === 'light' ? MyColor.white : MyColor.cardDarkBg }]}>
                    <View style={{ width: '50%', paddingRight: 8 }}>
                        <Text style={{ color: theme === 'light' ? MyColor.fontColor : MyColor.darkText }}><Text style={{ fontWeight: '500' }}>Language:</Text> {myUserData[currentIndex].Language}</Text>
                    </View><Text style={{
                        height: '100%',
                        width: 1,
                        backgroundColor: '#39393a',
                    }}>|</Text>
                    <View style={{ width: '50%', justifyContent: 'flex-end', flexDirection: 'row', paddingLeft: 8 }}>
                        <Text style={{ color: theme === 'light' ? MyColor.fontColor : MyColor.darkText }}><Text style={{ fontWeight: '500' }}>Categories:</Text> {myUserData[currentIndex].Categories}</Text>
                    </View>
                </View>
            </View>

            <View style={{ position: 'absolute', alignItems: 'center', bottom: 0, width: '100%' }}>

                <Video
                    source={{ uri: myUserData[currentIndex].radioUrl }}
                    paused={paused}
                    style={globalStyle.radioControl}
                    resizeMode='contain'
                    playInBackground={true}
                    onLoad={videoLoaded} // set isVideoLoaded to true when the video is loaded
                    audioOnly={true}
                    onError={() => {
                        showToast();
                        // setIsVideoLoaded(true);
                    }}
                />

                {/* ================= controls ================== */}

                <TouchableOpacity
                    activeOpacity={1}
                    // onPress={toggleControls}
                    style={{
                        width: '90%',
                        height: 120,
                        // position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: theme === 'light' ? MyColor.white : MyColor.cardDarkBg,
                        elevation: 10,
                        bottom: 15,
                        borderRadius: 30
                    }}>



                    <View style={{ flexDirection: 'row', width: '75%', justifyContent: 'space-between', alignItems: 'center', }}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => {
                            // showInterstitialAd(),
                            handlePrevious();
                        }}>
                            <PlayPause name="play-skip-back-circle" size={45} color={MyColor.primaryColor} />
                        </TouchableOpacity>

                        {isVideoLoaded ? (<TouchableOpacity activeOpacity={.5} onPress={() => { setPaused(!paused) }}>
                            <PlayPause name={paused ? "play-circle" : "pause-circle"} size={70} color={MyColor.primaryColor} />
                        </TouchableOpacity>) : (
                            <View>
                                <ActivityIndicator
                                    size="large"
                                    color={MyColor.primaryColor}
                                />
                            </View>
                        )}

                        <TouchableOpacity activeOpacity={.5} onPress={() => {
                            // showInterstitialAd(),
                            handleNext();
                        }}>
                            <PlayPause name="play-skip-forward-circle" size={45} color={MyColor.primaryColor} />
                        </TouchableOpacity>

                    </View>

                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 15,
                        right: 15,
                    }}>
                    </View>
                </TouchableOpacity>
            </View>

            {/* ================= controls ================== */}
        </View>
    )
}

export default ListenRadio

