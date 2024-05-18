import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from 'react'
import moment from "moment";
import Date from "./Date";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { AntDesign } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

export default function Calendar({ onSelectDate, selected }) {

    const [dates, setDates] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [currentMonth, setCurrentMonth] = useState();

    const getDates = () => {
        const _dates = [];
        const startDate = moment('2024-04-01')
        for (let i = 0; i < 120; i++) {
            const date = startDate.clone().add(i, 'days');
            _dates.push(date);
        }
        setDates(_dates);
    }

    const getCurrentMonth = () => {
        const month = moment(dates[0]).add(scrollPosition / 60, 'days').format('MMMM');
        setCurrentMonth(month);
    }

    useEffect(() => {
        getDates();
    }, [])

    useEffect(() => {
        getCurrentMonth();
    }, [scrollPosition])

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
            <View style={styles.title}>
                <AntDesign name="left" size={14} color="#3A6655" />
                <Text style={styles.titleText}>{currentMonth}  {moment().year()}</Text>
                <AntDesign name="right" size={14} color="#3A6655" />
            </View>

            <View style={styles.dateSection}>
                <View style={styles.scroll}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
                    >
                        {
                            dates.map((date, index) => (
                                <Date
                                    key={index}
                                    date={date}
                                    onSelectDate={onSelectDate}
                                    selected={selected}
                                />
                            ))
                        }
                    </ScrollView>
                </View>
            </View>


        </View>

    );
}

const styles = StyleSheet.create({
    title: {
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal:'5%'
    },
    titleText: {
        fontSize: 15,
        fontFamily: 'KoHo-Light',
        color:'#3A6655',
    },
    dateSection: {
        width: '100%',
        padding: 10,

    },
    scroll: {
        height: 85,
    },
});