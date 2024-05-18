import { View, StyleSheet, ScrollView, Image, TextInput, Text, KeyboardAvoidingView, Platform, Pressable, Keyboard, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import axios from "axios";
import * as FileSystem from 'expo-file-system';

import { Divider, RadioGroup, HStack, Radio, RadioIndicator, RadioIcon, RadioLabel, CircleIcon } from "@gluestack-ui/themed";

import { useDispatch, useSelector } from "react-redux";
import { setDiaryTitle, setDiaryContent, setDiaryColors, setDiaryTags } from "../redux/uploadDiarySlice";
import { selectTitle, selectContent, selectTags } from "../redux/uploadDiarySlice";

import { useGetColorTags, useGetCustomTags, useDeleteColorTag, useDeleteCustomTag, useAddTag } from "../../react-query";

export default function EditDiaryScreen({ route }) {

    const { image } = route.params;

    //取得tags
    const getColorTags = useGetColorTags();
    const getCustomTags = useGetCustomTags();

    //刪除tags
    const getDeleteColorTag = useDeleteColorTag();
    const getDeleteCustomTag = useDeleteCustomTag();

    //增加tag
    const getAddTag = useAddTag();

    const [inputTag, setInputTag] = useState(""); // 存儲正在輸入的標籤文字
    const [radioValue, setRadioValue] = useState("Color");
    const [colorData, setColorData] = useState([]);

    const diaryTitle = useSelector(selectTitle);
    const diaryContent = useSelector(selectContent);
    const diaryTags = useSelector(selectTags);


    const [chosenTags, setChosenTags] = useState(diaryTags);
    const [title, setTitle] = useState(diaryTitle);
    const [content, setContent] = useState(diaryContent);

    const dispatch = useDispatch();

    const analyzeImage = async () => {
        try {
            if (!image) {
                alert('Please select an image first!');
                return;
            }
            const apiKey = "AIzaSyAlmM6ay3Txhg8Zd-1moRn64RFqfwrnRpA"
            const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`

            setColorData([]);
            const base64ImageData = await FileSystem.readAsStringAsync(image, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const requestData =
            {
                requests: [
                    {
                        image: {
                            content: base64ImageData,
                        },
                        features: [{
                            "maxResults": 5,
                            "type": "IMAGE_PROPERTIES"
                        }],
                    }
                ],
            };

            const apiResponse = await axios.post(apiURL, requestData);
            const colors = apiResponse.data.responses[0].imagePropertiesAnnotation.dominantColors.colors;
            colors.forEach(color => console.log(color));
            const hexColors = colors.map(color => rgbToHex(color.color));
            setColorData(hexColors);
        } catch (error) {
            console.error('Error analyzing image: ', error);
            alert('Error analyzing image.Please try again later')
        }
    }

    useEffect(() => {
        analyzeImage();
    }, [image]);

    const rgbToHex = (color) => {
        const { red, green, blue } = color;
        return "#" + componentToHex(red) + componentToHex(green) + componentToHex(blue);
    }

    const componentToHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

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


    useEffect(() => {
        dispatch(setDiaryTitle(title));
    }, [title]);
    useEffect(() => {
        dispatch(setDiaryContent(content));
    }, [content]);

    useEffect(() => {
        dispatch(setDiaryTags(chosenTags));
    }, [chosenTags]);

    useEffect(() => {
        dispatch(setDiaryColors(colorData));
    }, [colorData]);


    return (


        <View style={styles.container}>
            <LinearGradient
                colors={['#faf6ec', '#d7e5e1']}
                style={styles.lineargradient}
            >
                {
                    colorData.length !== 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}>
                            <KeyboardAvoidingView
                                keyboardVerticalOffset={Platform.select({ ios: 0, android: -1000 })}
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                flex={1}
                            >

                                <Image source={{ uri: image }} style={styles.image} />
                                <View style={styles.palette}>
                                    {
                                        colorData.map((color, index) => (
                                            <View
                                                key={index}
                                                style={{
                                                    ...styles.color,
                                                    backgroundColor: color,
                                                    ...(index === 0 && { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }),
                                                    ...(index === colorData.length - 1 && { borderTopRightRadius: 20, borderBottomRightRadius: 20 }),
                                                    flex: 1 / colorData.length
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

                                <View style={{ height: 50 }}></View>
                            </KeyboardAvoidingView>
                        </ScrollView>
                    ) : (
                        <View style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size={100} color="#456F5F" />
                        </View>
                    )
                }

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
    }
});