import { View, Text, StyleSheet, ScrollView, Image, TextInput, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Divider, RadioGroup, HStack, Radio, RadioIndicator, RadioIcon, RadioLabel, CircleIcon } from "@gluestack-ui/themed";
import { useEditDiary, useGetColorTags, useGetCustomTags, useDeleteColorTag, useDeleteCustomTag, useAddTag } from "../../react-query";

export default function UploadDiaryScreen({ route, navigation }) {

    //編輯日記
    const editDiary = useEditDiary();
    //取得tags
    const getColorTags = useGetColorTags();
    const getCustomTags = useGetCustomTags();

    //刪除tags
    const getDeleteColorTag = useDeleteColorTag();
    const getDeleteCustomTag = useDeleteCustomTag();

    //增加tag
    const getAddTag = useAddTag();

    const { data } = route.params;
    const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);
    const [tags, setTags] = useState(["紅色系", "心情", "藍色系", "黃色系", "綠色系", "黑色系", "學業", "白色系", "紫色系", "橘色系", "棕色系", "美食", "自然"]);
    const [inputTag, setInputTag] = useState(""); // 存儲正在輸入的標籤文字
    const [chosenTags, setChosenTags] = useState(data.tags);
    const [radioValue, setRadioValue] = useState("Color");

    const addTag = () => {
        if (inputTag.trim() !== "") { // 確保輸入的標籤不是空的
            setTags([...tags, inputTag.trim()]); // 將新的標籤添加到 tags 中
            setInputTag(""); // 清空輸入欄
        }
    };

    const removeTag = (tagToRemove) => {
        // 使用過濾函式從 tags 狀態中刪除指定的標籤
        const updatedTags = tags.filter(tag => tag !== tagToRemove);
        // 更新 tags 狀態以反映刪除後的標籤列表
        setTags(updatedTags);
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

    const tagStyle = (tag) => {
        return chosenTags.includes(tag) ? [styles.tag, styles.selectedTag] : styles.tag;
    };

    const tagTextStyle = (tag) => {
        return chosenTags.includes(tag) ? [styles.tagText, styles.selectedTagText] : styles.tagText;
    };




    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#faf6ec', '#d7e5e1']}
                style={styles.lineargradient}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView
                        keyboardVerticalOffset={Platform.select({ ios: 0, android: -1000 })}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        flex={1}
                    >
                        <Image source={{ uri: data.imageUri }} style={styles.image} />
                        <View style={styles.palette}>
                            {
                                data.palette.map((color, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            ...styles.color,
                                            backgroundColor: color,
                                            ...(index === 0 && { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }),
                                            ...(index === data.palette.length - 1 && { borderTopRightRadius: 20, borderBottomRightRadius: 20 }),
                                            flex: 1 / data.palette.length
                                        }}
                                    />
                                ))
                            }
                        </View>

                        <TextInput
                            placeholder="點擊新增日記標題"
                            style={styles.title}
                            placeholderTextColor="#71AE97"
                            multiline={true}
                            numberOfLines={2}
                            autoFocus={true}
                            value={title}
                            onChangeText={setTitle}
                        />

                        <TextInput
                            placeholder="點擊新增日記內文"
                            style={styles.content}
                            placeholderTextColor="#71AE97"
                            multiline={true}
                            numberOfLines={8}
                            value={content}
                            onChangeText={setContent}
                        />

                        <View style={styles.addTag}>
                            <Ionicons name="add" size={36} color="#456F5F" />
                            <Text style={styles.addTagText}>新增標籤</Text>
                        </View>

                        <Divider bg="#71AE97" />

                        <Text style={styles.subTitle}>色系標籤</Text>
                                <View style={styles.tagArea}>

                                    {
                                        getColorTags.isPending 
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
                                                        <Pressable onPress={() => getDeleteColorTag.mutate({ tag: tag })}>
                                                            <Ionicons
                                                                name="close-circle-outline"
                                                                style={tagTextStyle(tag)}
                                                                size={22}
                                                                color="#456F5F" />
                                                        </Pressable>
                                                    </Pressable>
                                                )
                                            )
                                    }
                                </View>

                                <Text style={styles.subTitle}>自定義標籤</Text>
                                <View style={styles.tagArea}>

                                    {
                                       getCustomTags.isPending
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
                                                        <Pressable onPress={() => getDeleteCustomTag.mutate({ tag: tag })}>
                                                            <Ionicons
                                                                name="close-circle-outline"
                                                                style={tagTextStyle(tag)}
                                                                size={22}
                                                                color="#456F5F" />
                                                        </Pressable>
                                                    </Pressable>
                                                )
                                            )
                                    }
                                </View>

                                <View style={{ height: 50 }} />

                                <View style={styles.input}>
                                    <TextInput
                                        placeholder="輸入自定義標籤"
                                        style={styles.inputField}
                                        value={inputTag}
                                        onChangeText={setInputTag} // 更新正在輸入的標籤
                                        placeholderTextColor="#71AE97"
                                    >
                                    </TextInput>
                                    <Pressable onPress={() => {getAddTag.mutate({ tag: inputTag, type: radioValue }); setInputTag("");}}>
                                        <Ionicons name="arrow-forward-circle" size={36} color="#456F5F" />
                                    </Pressable>
                                </View>

                                <View style={styles.radioArea}>
                                    <Text style={styles.tagType}>標籤種類</Text>
                                    <RadioGroup value={radioValue} onChange={setRadioValue}>
                                        <HStack space="2xl">
                                            <Radio value="Color">
                                                <RadioIndicator mr="$2" style={{ borderColor: '#456F5F' }}>
                                                    <RadioIcon as={CircleIcon} style={{ color: '#456F5F' }} />
                                                </RadioIndicator>
                                                <RadioLabel style={{ color: '#456F5F' }}>色系</RadioLabel>
                                            </Radio>
                                            <Radio value="Custom">
                                                <RadioIndicator mr="$2" style={{ borderColor: '#456F5F' }}>
                                                    <RadioIcon as={CircleIcon} style={{ color: '#456F5F' }} />
                                                </RadioIndicator>
                                                <RadioLabel style={{ color: '#456F5F' }}>自定義</RadioLabel>
                                            </Radio>
                                        </HStack>
                                    </RadioGroup>
                                </View>

                                <View style={{ height: 30 }}></View>
                        <Pressable style={styles.completeBtn} onPress={() => { editDiary.mutate({ id: data.id, title: title, content: content, tags: chosenTags }); navigation.goBack(); }}>
                            <LinearGradient
                                colors={['#F69261', '#F8AC79']}
                                style={{ ...styles.lineargradient, borderRadius: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.completeText}>完成</Text>
                            </LinearGradient>
                        </Pressable>
                        <View style={{ height: 30 }}></View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </LinearGradient>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lineargradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingHorizontal: '5%'
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 20,
        marginVertical: '5%',
    },
    palette: {
        width: '100%',
        height: 50,
        borderRadius: 20,
        marginVertical: '5%',
        display: 'flex',
        flexDirection: 'row',
    },
    color: {
        width: '20%',
        height: '100%',
        shadowColor: '#456F5F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10, // for Android
    },
    subTitle: {
        fontSize: 20,
        marginVertical: '5%',
        color: '#456F5F'
    },
    tagArea: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        columnGap: 8,
        flexWrap: 'wrap',

    },
    title: {
        fontSize: 24,
        color: '#456F5F',
    },
    content: {
        fontSize: 16,
        color: '#456F5F',
        height: 200,
        textAlignVertical: 'top',
        lineHeight: 30,
        marginBottom: '5%'
    },
    addTag: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    addTagText: {
        color: '#456F5F',
        marginVertical: 10,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 24
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
    input: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#456F5F',
    },
    inputField: {
        flex: 1,
        color: '#456F5F'
    },
    radioArea: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '2%',
    },
    tagType: {
        color: '#456F5F',
        fontSize: 16,
        marginRight: '10%'
    },
    completeBtn: {
        width: '40%',
        alignSelf: 'center',
        height: 60,
        paddingHorizontal: '10%',
        marginVertical: '10%',
        shadowColor: '#F69261',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10, // for Android
        backgroundColor: 'red',
        borderRadius: 100
    },
    completeText: {
        color: '#F4F3EA',
        fontSize: 20,
        lineHeight: 30,
        textAlign: 'center',
    }
});