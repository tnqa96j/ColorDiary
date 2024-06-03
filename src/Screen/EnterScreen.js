import { View, Text, Pressable, StyleSheet, Image, SafeAreaView, StatusBar, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from '@expo/vector-icons/AntDesign';
import { setUser } from "../redux/pickColorSlice";

import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useState,useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function EnterScreen({ navigation }) {

    const dispatch = useDispatch();

    const [userName, setUserName] = useState("");
    const handlePress = () => {
        // 如果userName為空，則不執行導航操作
        if (!userName.trim()) {
            alert('請輸入日記使用者名稱');
            return;
        } else {
            // 否則執行導航到下一頁的操作
            dispatch(setUser(userName));
            navigation.navigate('start');
        }

    }

    const [fontsLoaded, fontError] = useFonts({
        'KoHo-Light': require('../../assets/font/KoHo-Light.ttf'),
        'Caveat-Medium': require('../../assets/font/Caveat-Medium.ttf'),
        'AbrilFatface-Regular': require('../../assets/font/AbrilFatface-Regular.ttf')
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    /*useEffect(() => {
        dispatch(setUser(userName));
      }, [userName]);*/


    return (
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar />
            <LinearGradient
                colors={['#faf6ec', '#d7e5e1']}
                style={styles.lineargradient}>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={Platform.select({ ios: 0, android: -1000 })}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    flex={1}
                >
                    <View style={{
                        display: 'flex',
                        padding: '5%',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flex: 1
                    }}>
                        <View style={styles.logo}>
                            <Text style={styles.logoText}>COLORFUL</Text>
                            <Text style={{
                                ...styles.logoText,
                                fontSize: 30,
                                letterSpacing: 15
                            }}>DIARY</Text>
                        </View>

                        <View style={{
                            width: '100%',
                            padding: 5,
                            borderBottomColor: '#3A6655',
                            borderBottomWidth: 1
                        }}>
                            <TextInput
                                placeholder="請輸入日記使用者名稱"
                                style={styles.inputField}
                                placeholderTextColor="#71AE97"
                                value={userName}
                                onChangeText={setUserName}
                            />
                        </View>

                        <Pressable style={styles.button} onPress={handlePress}>
                            <LinearGradient
                                style={{ ...styles.lineargradient, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: "center" }}
                                colors={['#F69261', '#F8AC79']}>
                                <AntDesign name="arrowright" size={32} color="white" />
                            </LinearGradient>
                        </Pressable>

                    </View>
                </KeyboardAvoidingView>
            </LinearGradient>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
    },
    logoText: {
        alignSelf: 'center',
        fontSize: 40,
        color: '#3A6655',
        fontFamily: 'AbrilFatface-Regular',
        letterSpacing: 2.5
    },
    title: {
        fontSize: 28,
        color: "#3A6655",
        fontWeight: '100'
    },
    lineargradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    inputField: {
        fontSize: 22,
        textAlign: 'center',
        color: '#3A6655'
    },
    button: {
        width: 100,
        height: 100,
        borderRadius: 100,
        shadowColor: '#F69261',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10, // for Android
    },
    buttonText: {
        color: "white",
        textAlign: 'center',
        fontSize: 20
    },
});