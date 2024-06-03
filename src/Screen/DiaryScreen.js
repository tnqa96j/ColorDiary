import { View, Text, StyleSheet, Pressable, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper } from '@gluestack-ui/themed';
import ArticleItem from "../component/ArticleItem";
import AddButton from "../component/AddButton";
import CalendarStrip from 'react-native-calendar-strip';
import { useGetDiary, useGetColorTags, useGetCustomTags } from "../../react-query";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/pickColorSlice";
SplashScreen.preventAutoHideAsync();

export default function DiaryScreen({ navigation }) {

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

    //使用者
    const user = useSelector(selectUser);

    //取得全部日記
    const { data, isPending } = useGetDiary(user);
    const [diaryData,setDiaryData]= useState(data);

    //取得tags
    const getColorTags = useGetColorTags();
    const getCustomTags = useGetCustomTags();

    //篩選
    const [selectedDate, setSelectedDate] = useState(null);
    const [chosenTags, setChosenTags] = useState([]);

    const tagStyle = (tag) => {
        return chosenTags.includes(tag) ? [styles.tag, styles.selectedTag] : styles.tag;
    };

    const tagTextStyle = (tag) => {
        return chosenTags.includes(tag) ? [styles.tagText, styles.selectedTagText] : styles.tagText;
    };

    const toggleAddTag = (tag) => {
        if (chosenTags.includes(tag)) //tag已在chosenTags中的話，則刪除
        {
            const updatedTags = chosenTags.filter((chosenTag) => chosenTag !== tag);
            setChosenTags(updatedTags);
        }
        else { //tag不在chosentags中的話，則添加它
            setChosenTags([...chosenTags, tag]);
        }
    }

    useEffect(() => {
        if(chosenTags.length > 0){
            const filteredData = filterDiaryByTag(chosenTags,data);
            setDiaryData(filteredData);
        }
        else{
            setDiaryData(data);
        }
    }, [chosenTags,data]);

    const filterDiaryByTag = (selectedTags, data) => {
        return data.filter(diary => {
            return diary.tags.some(tag => selectedTags.includes(tag));
        });
    };

    useEffect(()=>{
        if(!selectedDate){
            setDiaryData(data);
        }
        else{
            const filteredTimeData = filterDiaryByDate(selectedDate,data);
            setDiaryData(filteredTimeData);
        }
    },[selectedDate]);

    const filterDiaryByDate = (selectedDate,data) =>{
        const selectedTimestamp = new Date(selectedDate).getTime();
        const filteredData = data.filter(diary => {
            return new Date(diary.time).toDateString() === new Date(selectedTimestamp).toDateString();
        })

        return filteredData;
    }

    const markedDatesFunc = (date) => {
        const today = moment(); // 獲取當前日期的 Moment 對象
        // 檢查日期是否與今天相同
        if (date.isSame(today, 'day')) {
            return {
                lines: [
                    {
                      color:"#F69261" ,
                      selectedColor:"transparent",
                    },
                ],
            };
        }
        return {}; // 如果不是今天的日期，返回空對象
    }
    const handleDateSelected = date => {
        setSelectedDate(date);
        console.log(date);
    }

    ListHeaderComponent = () => {
        return (
            <>
            <CalendarStrip 
                scrollerPaging={true}
                onDateSelected={handleDateSelected}
                style={{
                    height:100,
                }}
                calendarHeaderContainerStyle={{
                    marginBottom:20
                }}
                calendarHeaderStyle={{
                    color:'#3A6655',
                    fontWeight:100
                }}
                dateNumberStyle={{
                    fontWeight: 100,
                    color:'#3A6655'
                }}
                dateNameStyle={{
                    fontWeight: 100,
                    color:'#3A6655',
                }}
                highlightDateNameStyle={{
                    color:'#faf6ec',
                    marginTop:5
                }}
                highlightDateNumberStyle={{
                    color:'#faf6ec',
                }}
                highlightDateContainerStyle={{
                   backgroundColor:'#F69261',
                   borderRadius:10,
                }}
                markedDates={markedDatesFunc}
                calendarAnimation={{type:'sequence',duration:250,useNativeDriver:false}}
                daySelectionAnimation={{type:'background',duration:100,highlightColor:'#F69261'}}

            />
                <View style={styles.tagArea}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.tagScroll}
                    >
                        {
                            chosenTags.map((tag, index) => (
                                <View
                                    key={index}
                                    style={styles.tags}>
                                    <LinearGradient
                                        colors={['#F69261', '#FFBA8F']}
                                        style={{ ...styles.lineargradient, borderRadius: 100 }}
                                    />
                                    <Text style={styles.shownTag}>{tag}</Text>
                                </View>
                            ))
                        }

                    </ScrollView>

                    <Pressable style={{ ...styles.tags, borderColor: '#F69463', borderWidth: 0.5, backgroundColor: "#F7F5EC" }}
                        onPress={handleClose}>
                        <AntDesign name="filter" size={24} style={styles.filter} color="#3A6655" />
                    </Pressable>
                </View>
            </>
        );

    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <LinearGradient
                colors={['#faf6ec', '#d7e5e1']}
                style={styles.lineargradient}
            >
                {
                    isPending
                        ? (
                            <View style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                                <ActivityIndicator size={100} color="#456F5F" />
                            </View>
                        )
                        : (
                            <View style={styles.articleArea}>
                                <FlatList
                                    data={diaryData}
                                    renderItem={({ item }) => <ArticleItem data={item} navigation={navigation} />}
                                    keyExtractor={item => item.id}
                                    showsVerticalScrollIndicator={false}
                                    ListHeaderComponent={this.ListHeaderComponent()}
                                    ListFooterComponent={() => <View style={{ height: 100 }} />}
                                />
                            </View>
                        )
                }


            </LinearGradient >

            <AddButton navigation={navigation} />

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
                        <View style={styles.tagArea2}>
                            {
                                getColorTags.isLoading
                                    ? (
                                        <ActivityIndicator />
                                    )
                                    : (
                                        getColorTags.data.map((tag, index) =>
                                            <Pressable
                                                style={tagStyle(tag)}
                                                key={index}
                                                onPress={() => toggleAddTag(tag)}>
                                                <Text style={tagTextStyle(tag)}>{tag}</Text>
                                            </Pressable>
                                        )
                                    )

                            }
                        </View>
                        <Text style={styles.subTitle}>自訂</Text>
                        <View style={styles.tagArea2}>
                            {
                                getCustomTags.isLoading
                                    ? (
                                        <ActivityIndicator />
                                    )
                                    : (
                                        getCustomTags.data.map((tag, index) =>
                                            <Pressable
                                                style={tagStyle(tag)}
                                                key={index}
                                                onPress={() => toggleAddTag(tag)}>
                                                <Text style={tagTextStyle(tag)}>{tag}</Text>
                                            </Pressable>
                                        )
                                    )

                            }
                        </View>

                    </ScrollView>
                </ActionsheetContent>
            </Actionsheet>
        </View >
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

        paddingVertical: 5,

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
    shownTag: {
        marginVertical: 5,
        marginHorizontal: 20,
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
    articleArea: {
        paddingHorizontal: '5%',
        paddingVertical: 5,
        flex: 1
    },
    tag: {
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: '#F69261',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: "#faf6ec",
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    selectedTag: {
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: '#F69261',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: "#F69261"
    },
    tagText: {
        color: '#456F5F',
    },
    selectedTagText: {
        color: '#faf6ec',
    },
});

