import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "@gluestack-ui/themed";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useState } from 'react';
import AddButton from "../component/AddButton";


SplashScreen.preventAutoHideAsync();

export default function SettingScreen() {

    const [fontsLoaded, fontError] = useFonts({
        'KoHo-Light': require('../../assets/font/KoHo-Light.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <LinearGradient
                        colors={['#faf6ec', '#d7e5e1']}
                        style={styles.lineargradient}
                    >
                        <Text style={styles.title}>帳戶</Text>
                        <View style={styles.block}>
                            <Text style={styles.text}>帳戶隱私設定</Text>
                            <Divider />
                            <View style={styles.row}>
                                <Text style={styles.text}>密碼鎖設定</Text>
                                <Text style={styles.text}>關</Text>
                            </View>
                        </View>
                        <Text style={styles.title}>每日</Text>
                        <View style={styles.block}>
                            <View style={styles.row}>
                                <Text style={styles.text}>色彩重置時間設定</Text>
                                <Text style={styles.text}>09:00a.m.</Text>
                            </View>
                            <Divider />
                            <Text style={styles.text}>抽籤設定</Text>
                            <Divider />
                            <Text style={styles.text}>每日任務設定</Text>
                        </View>

                        <Text style={styles.title}>背景</Text>
                        <View style={styles.block}>
                            <Text style={styles.text}>背景音樂</Text>
                            <Divider />
                            <Text style={styles.text}>背景主題設定</Text>
                        </View>
                    </LinearGradient>
                </View>
            </ScrollView>
            <AddButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 900
    },
    lineargradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingHorizontal: '5%'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
        paddingLeft: '5%',
    },
    block: {
        backgroundColor: '#F7F5EC',
        borderRadius: 12,
        paddingHorizontal: '5%'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    text: {
        fontSize: 16,
        color: '#3A6655',
        marginVertical: 20,
        fontFamily: 'KoHo-Light'
    }
});