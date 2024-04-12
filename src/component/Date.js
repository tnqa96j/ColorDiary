import { View, Text, StyleSheet, Pressable } from "react-native";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Date({ date, onSelectDate, selected }) {
    //props : 1.onSelectDate 2.selected 
    //state : 1.scrollPosition 2.date 3.currentMonth

    const day = moment(date).format('ddd');
    const dayNumber = moment(date).format('D');

    const fullDate = moment(date).format('YYYY-MM-DD');

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
        <View onLayout={onLayoutRootView}>
            <Pressable
                onPress={() => onSelectDate(fullDate)}
                style={styles.dayBox}
            >
                <LinearGradient
                    style={[styles.lineargradient, selected === fullDate && { display: 'flex' }]}
                    colors={['#F69261', '#FFBA8F']}
                />
                <Text
                    style={[styles.dateText, selected === fullDate && { color: "#faf6ec" }]}>
                    {dayNumber}
                </Text>
                <Text
                    style={[styles.dayNumber, selected === fullDate && { color: "#faf6ec" }]}
                >
                    {day}
                </Text>

            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    dayBox: {
        backgroundColor: "#f7f6f0",
        borderRadius: 12,
        alignItems: 'center',
        justifyContent:'center',
        height: 80,
        width: 70,
        marginHorizontal: 5,
    },
    lineargradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: 12,
        justifyContent: 'center',
        display: 'none'
    },
    dateText: {
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'KoHo-Light',
        marginTop:'5%',
        color:'#3A6655'
    },
    dayNumber: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'KoHo-Light',
        marginBottom:'5%',
        color:"#3A6655"
    }
});