import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { colorKit } from 'reanimated-color-picker';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function ColorDetailScreen({ route }) {

    const { kanji, hiragana, hex, descript, isTextDark } = route.params;

    const textColor = isTextDark ? 'black' : 'white';

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

    const hexToRGB = (hex) => {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return { r, g, b };
    }

    return (
        <ScrollView style={{ backgroundColor: hex}}>
            <View style={styles.container }>
                <Text style={{ ...styles.kanji, color: textColor }}>{kanji}</Text>
                <Text style={{ ...styles.hiragana, color: textColor }}>{hiragana}</Text>
                <Image source={{ uri: route.params.image }} style={styles.image} />
                <Text style={{ ...styles.hex, color: textColor }}>{hex}</Text>
                <Text style={{ ...styles.hex, color: textColor }}>
                    R:{hexToRGB(hex).r} G:{hexToRGB(hex).g} B:{hexToRGB(hex).b}
                </Text>
                <Text style={{ ...styles.des, color: textColor }}>{descript}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    kanji: {
        fontSize: 30,

    },
    hiragana: {
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: 200,
        marginVertical: 20
    },
    hex: {
        fontFamily: 'KoHo-Light',
        fontSize: 18,
        letterSpacing: 5
    },
    des: {
        marginTop: 30,
        paddingHorizontal: '5%',
        letterSpacing: 2.5,
        lineHeight: 20,
        marginBottom:200,
    }
});