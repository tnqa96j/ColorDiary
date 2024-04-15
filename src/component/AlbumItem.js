import { View, Text, StyleSheet, Pressable } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

export default function AlbumItem({ data, navigation }) {

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
        <View onLayout={onLayoutRootView} style={styles.item}>
            <Pressable
                onPress={() => navigation.navigate('ColorDetail',data)}
                style={{ alignItems: 'center' }}>
                <View style={{ ...styles.block, backgroundColor: data.hex }} />
                <Text style={styles.text}>{data.hex}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        width: '30%',
        alignItems: 'center',
        marginVertical: 10,
    },
    block: {
        width: '100%',
        width: 90,
        height: 90,
        borderRadius: 12,
        borderColor:'#9AA0A1',
        borderWidth:0.5
    },
    text: {
        fontFamily: 'KoHo-Light',
        fontSize: 16,
        lineHeight: 35
    }
});