import { View, Text, SafeAreaView, Image, Share, Linking, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { DrawerItemList, createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import Colours from 'react-native-vector-icons/Entypo';
import ShareIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home, { MyColor } from './screen/Home';

  // === This code is for Share functionallity ===
  export const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'https://play.google.com/store/apps/details?id=com.usaradioapp',
        // === App link will here ===
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log('Error =>', error);
    }
  };
  // === This code is for Share functionallity ===

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  const theme = useColorScheme();

  // === These are icons in Sidebar Drawer ===
  const colourIcon = () => {
    return (
      <Colours style={{ color: theme === 'light' ? MyColor.fontColor : MyColor.white }} name="star-outlined" size={21} />
    )
  }

  const shareIcon = () => {
    return (
      <ShareIcon style={{ color: theme === 'light' ? MyColor.fontColor : MyColor.white }} name="share" size={20} />
    )
  }

  const checkUpdate = () => {
    return (
      <Icon style={{ color: theme === 'light' ? MyColor.fontColor : MyColor.white }} name="system-update" size={20} />
    )
  }
  // === These are icons in Sidebar Drawer ===

  return (
    <Drawer.Navigator
      drawerContent={
        (props) => {
          return (
            <SafeAreaView style={{ flex: 1 }}>
              <View style={{
                height: 200,
                backgroundColor: theme === 'light' ? MyColor.drawerActiveBg : MyColor.primaryColor,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
              }}>
                <Image
                  style={{
                    height: 100,
                    width: 100,
                    marginBottom: 15,
                  }}
                  source={require('../../assets/applogo.png')} />

                <Text style={{
                  backgroundColor: theme === 'light' ? 'rgba(255,255,255,0.3)' : '#765cf9',
                  color: theme === 'light' ? MyColor.fontColor : MyColor.white,
                  paddingVertical: 5,
                  paddingHorizontal: 18,
                  borderRadius: 20,
                  fontWeight: '600',
                }}>USA RADIO</Text>
              </View>
              <DrawerItemList {...props} />
              <DrawerItem
                labelStyle={{ color: theme === 'light' ? MyColor.fontColor : MyColor.white, marginLeft: -22 }}
                label="Rate Us"
                icon={colourIcon}
                onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.usaradioapp")}
              />

              <DrawerItem
                labelStyle={{ color: theme === 'light' ? MyColor.fontColor : MyColor.white, marginLeft: -22 }}
                label="Shere this app"
                icon={shareIcon}
                onPress={onShare}
              />

              <DrawerItem
                labelStyle={{ color: theme === 'light' ? MyColor.fontColor : MyColor.white, marginLeft: -22 }}
                label="Check Update"
                icon={checkUpdate}
                onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.usaradioapp")}
              />
            </SafeAreaView>
          )
        }
      }
      screenOptions={{
        drawerActiveBackgroundColor: MyColor.primaryColor,
        drawerActiveTintColor: MyColor.white,
        drawerInactiveTintColor: MyColor.white,
        drawerLabelStyle: { marginLeft: -22 },
        drawerStyle: {
          backgroundColor: theme === 'light' ? MyColor.white : MyColor.darkmodeBg,
        },
      }}
    >
      <Drawer.Screen name="USA Radio" component={Home}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: theme === 'light' ? MyColor.white : MyColor.darkmodeBg,
          },
          headerShadowVisible: theme === 'light' ? true : false,
          headerTintColor: theme === 'light' ? MyColor.fontColor : MyColor.white,
          headerLeft: () => (
            <TouchableOpacity activeOpacity={.5} style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()}>
              <Image
                style={{ height: 37, width: 37, backgroundColor: theme === 'light' ? 'rgba(100,69,255,.08)' : MyColor.primaryColor, borderRadius: 25 }}
                source={theme === 'light' ? require('../../assets/bar-thin.png') : require('../../assets/white-bar.png')}
              />
            </TouchableOpacity>
          ),
          drawerLabel: 'Home',
          drawerActiveTintColor: theme === 'light' ? MyColor.fontColor : MyColor.white,
          drawerActiveBackgroundColor: theme === 'light' ? MyColor.drawerActiveBg : MyColor.primaryColor,
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="home"
              size={size}
              color={theme === 'light' && focused ? MyColor.fontColor : MyColor.white}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator