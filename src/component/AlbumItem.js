import { View, Text, StyleSheet, Pressable } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { useSelector } from "react-redux";
import { selectUnlockedColors } from "../redux/taskSlice";
import FontAwesome from '@expo/vector-icons/FontAwesome';


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

    //解鎖顏色
    const unlockedColors = useSelector(selectUnlockedColors);
    const isUnlocked = unlockedColors.includes(data.hex);

    return (
        <View onLayout={onLayoutRootView} style={styles.item}>
            {
                isUnlocked
                    ? (
                        <Pressable
                            onPress={() => navigation.navigate('ColorDetail', data)}
                            style={{ alignItems: 'center' }}>
                            <View style={{ ...styles.block, backgroundColor: data.hex }} />
                            <Text style={styles.text}>{data.hex}</Text>
                        </Pressable>
                    )
                    : (
                        <>
                            <View style={{ ...styles.block, backgroundColor: `${data.hex}50` }}>
                                <FontAwesome name="lock" size={30} color="#3A6655" style={styles.lock} />
                            </View>
                            <Text style={styles.text}>{data.hex}</Text>
                        </>
                    )
            }

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
        borderColor: '#9AA0A1',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'KoHo-Light',
        fontSize: 16,
        lineHeight: 35,
    },
    lock: {

    }
});
