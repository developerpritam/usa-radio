import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, StatusBar, ActivityIndicator, useColorScheme } from 'react-native'
import MyAds from '../../components/MyAds';
import Play from 'react-native-vector-icons/FontAwesome6';
import Favorite from 'react-native-vector-icons/MaterialIcons';
import InterAd from '../../components/InterAd';
import { globalStyle } from '../../globalStyle';
import NoInternet from '../../components/NoInternet';

export const MyColor = {
  white: '#fff',
  fontColor: '#333',
  // primaryColor: '#6445ff',
  primaryColor: '#6e44ff',
  cardDarkBg: '#1F2125',
  secondaryColor: 'rgba(0,0,0,0.05)',
  thirdColor: 'rgba(255,255,255,0.05)',
  // lightmodeBg: '#F5F5F5',
  darkText: '#B6B6B6',
  darkmodeBg: '#181A1E',
  // darkModeText: '#777777',
  // darkTextTitle: '#A8A8A8',
  controlsBg: 'rgba(100,69,255,.6)',
  drawerActiveBg: 'rgba(100, 69, 255, .2)'
}

const Home = ({ navigation }) => {
  const [myUserData, setMyUserData] = useState();
  const [isLoaded, setIsLoaded] = useState(true);
  const theme = useColorScheme();
  const showInterstitialAd = InterAd();

  const getUserData = async () => {
    try {
      const response = await fetch("https://thedailygardening.com/Usa%20Radio%20api/usaRadio.json");
      const myData = await response.json();
      setMyUserData(myData);
      setIsLoaded(false);
      // console.log(myData);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);


  return (
    <>
      <StatusBar barStyle={theme === 'light' ? "dark-content" : "light-content"} backgroundColor={theme === 'light' ? MyColor.white : MyColor.darkmodeBg} />
      <View style={[globalStyle.mainContainer, { backgroundColor: theme === 'light' ? MyColor.lightmodeBg : MyColor.darkmodeBg }]}>
        {
          isLoaded ? (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size={'large'} color={MyColor.primaryColor} /></View>)
            : (
              <View>
                <NoInternet />
                <FlatList
                  data={myUserData}
                  ListHeaderComponent={MyAds}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {

                    const handlePress = () => {
                      showInterstitialAd();
                      navigation.navigate('ListenRadio', { myUserData, currentIndex: index });
                    };

                    return (
                      <TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
                        <View style={[globalStyle.card, { backgroundColor: theme === 'light' ? MyColor.white : MyColor.cardDarkBg, elevation: 0, shadowColor: false }]}>
                          <View style={globalStyle.imgContainer}>
                            <Image style={globalStyle.thumbImg} source={{ uri: item.image }}
                            />
                          </View>
                          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={[globalStyle.radioDetails]}>
                              <Text style={[globalStyle.title, { color: theme === 'light' ? MyColor.fontColor : MyColor.darkText }]} numberOfLines={2}>{item.title}</Text>
                              <Text numberOfLines={1} style={{ backgroundColor: theme === 'light' ? MyColor.secondaryColor : MyColor.thirdColor, alignSelf: 'flex-start', paddingVertical: 3, paddingHorizontal: 10, borderRadius: 15, marginTop: 8, fontSize: 12, maxWidth: 100, color: theme === 'light' ? MyColor.fontColor : MyColor.darkText }}>{item.Categories}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                              {/* <TouchableOpacity>
                              <Favorite name="favorite" size={25} color={theme === 'light' ? MyColor.fontColor : MyColor.darkText} style={{ marginRight: 15 }} />
                              </TouchableOpacity> */}
                              <Play name="play" size={25} color={theme === 'light' ? MyColor.fontColor : MyColor.darkText} style={{ marginHorizontal: 15 }} />
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )
        }
      </View>
    </>
  )
}

export default Home
