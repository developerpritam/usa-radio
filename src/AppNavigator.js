import View, { TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DrawerNavigator, { onShare } from './drawer/DrawerNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ShareIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MyColor } from './drawer/screen/Home';
import ListenRadio from './drawer/screen/ListenRadio';

const Stack = createNativeStackNavigator();
const AppNavigator = ({ navigation }) => {
  const theme = useColorScheme();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Drawer Navigation' component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name='ListenRadio' component={ListenRadio} options={({ navigation }) => ({
          // headerTransparent: true,
          headerStyle: {
            backgroundColor: theme === 'light' ? '#f2f2f2' : MyColor.darkmodeBg,
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity activeOpacity={0.6} style={{ backgroundColor: MyColor.controlsBg, borderRadius: 25, padding: 4 }} onPress={() => navigation.goBack()}>
              <Icon name="keyboard-arrow-left" size={26} color={MyColor.white} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.6} style={{ padding: 7, backgroundColor: MyColor.controlsBg, borderRadius: 25 }} onPress={onShare}>
              <ShareIcon name="share" size={20} color={MyColor.white} />
            </TouchableOpacity>
          ),
        })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator