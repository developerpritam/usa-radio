import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import Exclamation from 'react-native-vector-icons/FontAwesome6';

const NoInternet = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Subscribe
        const unsubscribe = NetInfo.addEventListener(state => {
            // console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);
            setIsConnected(state.isConnected);
        });

        // Unsubscribe
        return () => {
            unsubscribe();
        };
    }, []);


    return (
        <>
            {!isConnected && (
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#3f3f3f',
                        // backgroundColor: '#ff2434',
                        height: 26,
                        width: '100%',
                    }}
                >
                    <Text style={{ fontWeight: '500', color: '#fff'}}><Exclamation name="circle-exclamation" size={16} />  No Internet Connection</Text>
                </View>
            )}
        </>
    );
};

export default NoInternet