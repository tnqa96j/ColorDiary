import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectPickedColor1, selectPickedColor2, selectPickedColor3, selectPickedColor4, selectPickedColor5, selectTodayColor, selectTodayColorName } from "../redux/pickColorSlice";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import ColorRing from "../component/ColorRing";
import AddButton from "../component/AddButton";
import moment from "moment";
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState, useEffect } from 'react';
import colorData from '../json/color.json'
import { useSharedValue, withTiming,useAnimatedStyle  } from 'react-native-reanimated';
import Animated from "react-native-reanimated";

import { setTodayColor, setTodayColorName } from "../redux/pickColorSlice";
import { selectDailyTask, selectUnlockedColors, selectNewColors } from "../redux/taskSlice";

SplashScreen.preventAutoHideAsync();

export default function HomeScreen({ navigation }) {

    const color1 = useSelector(selectPickedColor1);
    const color2 = useSelector(selectPickedColor2);
    const color3 = useSelector(selectPickedColor3);
    const color4 = useSelector(selectPickedColor4);
    const color5 = useSelector(selectPickedColor5);

    const todayColor = useSelector(selectTodayColor);
    const todayColorName = useSelector(selectTodayColorName);

    const dispatch = useDispatch();

    const colorOpacity = useSharedValue(0);

    const opacity = useAnimatedStyle(()=>{
        return{
            opacity:colorOpacity.value
        }
    });


    useEffect(()=>{
        colorOpacity.value = withTiming(1,{duration:5000})
    },[]);



    //日期
    const today = moment();
    const month = today.format('MM');
    const date = today.format('DD');
    const dayOfWeek = today.format('ddd').toUpperCase();

    //任務
    const dailyTask = useSelector(selectDailyTask);
    const unlockedColors = useSelector(selectUnlockedColors);
    const newColors = useSelector(selectNewColors);

    const [modalVisible, setModalVisible] = useState(false);

    const randomColor = () => {
        const randomIndex = Math.floor(Math.random() * colorData.length);
        const randomColor = colorData[randomIndex];
        const randomHex = randomColor.hex;
        const name = randomColor.kanji;
        dispatch(setTodayColor(randomHex));
        dispatch(setTodayColorName(name));
    }

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
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <LinearGradient
                colors={['#faf6ec', '#d7e5e1']}
                style={styles.lineargradient}
            >
                <ScrollView >
                    <View style={styles.dateArea}>
                        <View style={styles.date}>
                            <Text style={styles.dateText}>{month}</Text>
                            <Text style={styles.dateText}>/{date}</Text>
                        </View>
                        <Text style={styles.dayOfwkText}>{dayOfWeek}</Text>
                    </View>

                    <View style={styles.blockArea}>
                        <Animated.View style={[styles.box, { backgroundColor: color1 }, opacity]} />
                        <Animated.View style={[styles.box, { backgroundColor: color2 }, opacity]} />
                        <Animated.View style={[styles.box, { backgroundColor: color3 }, opacity]} />
                        <Animated.View style={[styles.box, { backgroundColor: color4 }, opacity]} />
                        <Animated.View style={[styles.box, { backgroundColor: color5 }, opacity]}/>
                    </View>

                    <View style={styles.pieArea}>
                        <ColorRing />
                    </View>

                    <View style={styles.taskArea}>
                        <TouchableOpacity style={styles.task}>
                            <Text style={styles.one}>每日任務</Text>
                            {
                                dailyTask >= 5
                                    ? (
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                            <Text style={{ color: '#3A6655', fontSize: 16 }}>已達成</Text>
                                            <AntDesign name="checkcircle" size={20} color="#F69261" />
                                        </View>
                                    )
                                    : (
                                        <Text style={styles.three}>{dailyTask}／5</Text>
                                    )
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.task}>
                            <Text style={styles.one}>解鎖圖鑑</Text>
                            <Text style={styles.three}>{unlockedColors.length}／18</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.task}>
                            <Text style={styles.one}>今日探索新色彩</Text>
                            <Text style={styles.three}>{newColors}</Text>
                        </TouchableOpacity>
                        {
                            todayColor == null
                                ? (
                                    <TouchableOpacity style={styles.task} onPress={() => { randomColor(); setModalVisible(true) }}>
                                        <Text style={styles.one}>今日代表色</Text>
                                        <Text style={styles.three}>GO</Text>
                                    </TouchableOpacity>
                                )
                                : (
                                    <TouchableOpacity style={styles.task} onPress={() => setModalVisible(true)}>
                                        <Text style={styles.one}>今日代表色</Text>
                                        <View style={{...styles.circle,backgroundColor:todayColor}}></View>
                                    </TouchableOpacity>
                                )
                        }

                    </View>
                    <View style={{ height: 300 }} />
                </ScrollView>
            </LinearGradient>
            <AddButton navigation={navigation} />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <Pressable style={styles.bg} onPress={() => { setModalVisible(false) }}>
                    <Pressable style={styles.block} onPress={(event) => event.stopPropagation()}>
                        <Text style={styles.title}>今日代表色</Text>
                        <View style={{ ...styles.color, backgroundColor: todayColor }}></View>
                        <Text style={styles.title}>{todayColorName}</Text>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>

    );
}

const styles = StyleSheet.create({
    lineargradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    dateArea: {
        display: 'flex',
        flexDirection: 'row',
        height: 100,
        width: '100%',
        paddingHorizontal: '10%',
        alignItems: 'flex-end',
        marginTop: 5,
    },
    date: {
        height: '100%',
        width: 100,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    dateText: {
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'KoHo-Light',
        lineHeight: 40,
        color: '#3A6655'
    },
    dayOfwkText: {
        fontFamily: 'KoHo-Light',
        fontSize: 20,
        color: '#3A6655'
    },
    blockArea: {
        height: 100,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    box: {
        height: 25,
        width: 40,
        backgroundColor: "gray",
        borderColor: '#F9F9F9',
        borderWidth: 0.5,
        borderRadius: 5
    },
    pieArea: {
        height: 300,
        width: 300,
        alignSelf: 'center',
    },
    taskArea: {
        marginTop: 40,
        height: 300,
        paddingHorizontal: '5%',
        gap: 15,
    },
    taskBlock: {
        width: '50%',
        backgroundColor: '#F4F3EA',
        height: 180,
        borderRadius: 12,
        padding: '5%'
    },
    task: {
        width: '100%',
        backgroundColor: '#F4F3EA',
        borderRadius: 12,
        padding: '5%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    one: {
        color: '#3A6655',
        fontSize: 20,
        lineHeight: 35,
        fontWeight: 'bold'

    },
    two: {
        color: '#3A6655',
        fontSize: 18,
        lineHeight: 35,

    },
    three: {
        color: '#3A6655',
        fontSize: 28,
        fontFamily: 'KoHo-Light',
        textAlign: 'right'

    },
    bg: {
        position: 'relative',
        backgroundColor: 'rgba(198, 210, 199, 0.6)',
        flex: 1,
        paddingHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    block: {
        width: '100%',
        backgroundColor: '#F5F4EB',
        borderRadius: 12,
        padding: '5%',
        shadowColor: '#4A5759',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        elevation: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        marginVertical: '5%',
        color: '#3A6655'
    },
    color: {
        width: '80%',
        height: 200,
        borderRadius: 12,
        backgroundColor: 'red',
        alignSelf: 'center'
    },
    circle:{
        height:'100%',
        width:'20%',
        borderRadius:100
    }

});

