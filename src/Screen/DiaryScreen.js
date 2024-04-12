import { View, Text, StyleSheet, Pressable, ScrollView, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useState } from 'react';
import Calendar from "../component/Calender";
import { AntDesign } from '@expo/vector-icons';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper } from '@gluestack-ui/themed';
import articleData from '../json/article.json'
import ArticleItem from "../component/ArticleItem";

SplashScreen.preventAutoHideAsync();

export default function DiaryScreen() {

    const [showActionsheet, setShowActionsheet] = React.useState(false)
    const handleClose = () => setShowActionsheet(!showActionsheet)

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
    //按tag好像也可以儲存到全域狀態變數
    const [selectedDate, setSelectedDate] = useState(null);
    const [tagsColor, setTagsColor] = useState("#F7F5EC");
    const [tagTextColor, setTagTextColor] = useState("#3A6655");
    const [isTagPressrd, setIsTagPressed] = useState(false)

    //要怎麼讓按紐有各自的狀態?
    const toggleTagColor = () => {
        setIsTagPressed(isTagPressrd => !isTagPressrd);
        if (isTagPressrd) {
            setTagsColor("#F69463");
            setTagTextColor("#F7F5EC")
        }
        else {
            setTagsColor("#F7F5EC");
            setTagTextColor("#3A6655");
        }
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <LinearGradient
                colors={['#faf6ec', '#d7e5e1']}
                style={styles.lineargradient}
            >
                <Calendar
                    onSelectDate={setSelectedDate}
                    selected={selectedDate}
                />

                <View style={styles.tagArea}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.tagScroll}
                    >
                        <Pressable style={styles.tags}>
                            <LinearGradient
                                colors={['#F69261', '#FFBA8F']}
                                style={{ ...styles.lineargradient, borderRadius: 12 }}
                            />
                            <Text style={styles.tagText}>踏青</Text>
                            <AntDesign name="close" size={24} style={styles.tagText} color="black" />
                        </Pressable>
                        <Pressable style={styles.tags}>
                            <LinearGradient
                                colors={['#F69261', '#FFBA8F']}
                                style={{ ...styles.lineargradient, borderRadius: 12 }}
                            />
                            <Text style={styles.tagText}>綠色系</Text>
                            <AntDesign name="close" size={24} style={styles.tagText} color="black" />
                        </Pressable>
                        <Pressable style={styles.tags}>
                            <LinearGradient
                                colors={['#F69261', '#FFBA8F']}
                                style={{ ...styles.lineargradient, borderRadius: 12 }}
                            />
                            <Text style={styles.tagText}>紅色系</Text>
                            <AntDesign name="close" size={24} style={styles.tagText} color="black" />
                        </Pressable>
                    </ScrollView>

                    <Pressable style={{ ...styles.tags, borderColor: '#F69463', borderWidth: 0.5, backgroundColor: "#F7F5EC" }}
                        onPress={handleClose}>
                        <AntDesign name="filter" size={24} style={styles.filter} color="#3A6655" />
                    </Pressable>
                </View>

                <View style={styles.articleArea}>
                    <FlatList
                        data={articleData}
                        renderItem={({ item }) => <ArticleItem data={item} />}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={{height:70}} />
            </LinearGradient>

            <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
                <ActionsheetBackdrop />
                <ActionsheetContent h="$72" zIndex={999}>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>

                    <ScrollView style={styles.tagsPicker}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.title}>篩選標籤</Text>
                        <Text style={styles.subTitle}>色系</Text>
                        <View style={{ ...styles.tagArea2 }}>
                            <Pressable style={{ ...styles.tags2, backgroundColor: tagsColor }} onPress={toggleTagColor}>
                                <Text style={{ ...styles.tagText, color: tagTextColor, marginLeft: 10 }}>紅色系</Text>
                            </Pressable>
                            <Pressable style={styles.tags2}>
                                <Text style={{ ...styles.tagText, color: "#3A6655", marginLeft: 10 }}>深綠色系</Text>
                            </Pressable>
                            <Pressable style={styles.tags2}>
                                <Text style={{ ...styles.tagText, color: "#3A6655", marginLeft: 10 }}>黃色系</Text>
                            </Pressable>
                            <Pressable style={styles.tags2}>
                                <Text style={{ ...styles.tagText, color: "#3A6655", marginLeft: 10 }}>暖橘</Text>
                            </Pressable>
                            <Pressable style={styles.tags2}>
                                <Text style={{ ...styles.tagText, color: "#3A6655", marginLeft: 10 }}>淺藍色</Text>
                            </Pressable>
                            <Pressable style={styles.tags2}>
                                <Text style={{ ...styles.tagText, color: "#3A6655", marginLeft: 10 }}>淡紫</Text>
                            </Pressable>
                        </View>
                        <Text style={styles.subTitle}>自訂</Text>
                        <View style={{ ...styles.tagArea2 }}>
                            <Pressable style={styles.tags2}>
                                <Text style={{ ...styles.tagText, color: "#3A6655", marginLeft: 10 }}>運動</Text>
                            </Pressable>
                            <Pressable style={styles.tags2}>
                                <Text style={{ ...styles.tagText, color: "#3A6655", marginLeft: 10 }}>美食</Text>
                            </Pressable>
                            <Pressable style={styles.tags2}>
                                <Text style={{ ...styles.tagText, color: "#3A6655", marginLeft: 10 }}>出去玩</Text>
                            </Pressable>
                            <Pressable style={styles.tags2}>
                                <Text style={{ ...styles.tagText, color: "#3A6655", marginLeft: 10 }}>娛樂</Text>
                            </Pressable>
                            <Pressable style={styles.tags2}>
                                <Text style={{ ...styles.tagText, color: "#3A6655", marginLeft: 10 }}>心情紀錄</Text>
                            </Pressable>
                            <Pressable style={styles.tags2}>
                                <Text style={{ ...styles.tagText, color: "#3A6655", marginLeft: 10 }}>日常生活</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </ActionsheetContent>
            </Actionsheet>
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
    tagArea: {
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 15,
        paddingVertical:5,

    },
    tagScroll: {

    },
    tags: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'blue',
        alignItems: 'center',
        borderRadius: 20,
        margin: 5
    },
    tagText: {
        marginVertical: 5,
        marginHorizontal: 10,
        marginLeft: 20,
        fontSize: 14,
        color: '#F7F5EC',
    },
    filter: {
        marginHorizontal: 15,
        fontSize: 20
    },
    tagsPicker: {
        height: '50%',
        width: '90%',
    },
    title: {
        color: '#3A6655',
        fontSize: 24,
        marginVertical: 20
    },
    subTitle: {
        color: '#3A6655',
        fontSize: 20,
        marginVertical: 5
    },
    tagArea2: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 15,
        flexWrap: 'wrap'
    },
    tags2: {
        backgroundColor: '#F7F5EC',
        borderColor: "#F69463",
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        height: 45,
    },
    articleArea:{
        paddingHorizontal:'5%',
        paddingVertical:5,
        flex:1
    }
});

