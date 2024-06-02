import 'react-native-gesture-handler'
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../Screen/HomeScreen";
import DiaryScreen from "../Screen/DiaryScreen";
import ColorAlbumScreen from "../Screen/ColorAlbumScreen";
import SettingScreen from "../Screen/SettingScreen";
import PickColorScreen from "../Screen/PickColorScreen";
import StartScreen from "../Screen/StartScreen";
import EnterScreen from '../Screen/EnterScreen';
import ColorDetailScreen from '../Screen/ColorDetailScreen';
import EditDiaryScreen from '../Screen/EditDiaryScreen';
import UploadDiaryScreen from '../Screen/UploadDiaryScreen';

import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, Text, Keyboard, Platform, Modal, View, ActivityIndicator } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { selectHasPickedColor } from "../redux/pickColorSlice";
import { setDiaryTitle, setDiaryContent, setDiaryColors, setDiaryImageUri, setDiaryTags, setIsPending } from "../redux/uploadDiarySlice";
import { selectTitle, selectContent, selectColors, selectImageUri, selectTags, selectIsPending } from "../redux/uploadDiarySlice";


import * as FileSystem from 'expo-file-system';

import React, { useState, useEffect } from 'react';
import { useAddDiary } from '../../react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { firebase } from '../../api/firebase'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



export default function Navigation() {

    const hasPickedColor = useSelector(selectHasPickedColor);


    return (
        <NavigationContainer>
            {!hasPickedColor ? <FirstStack /> : <AlbumStack />}
        </NavigationContainer>
    );
}

const FirstStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeStack"
            screenOptions={{
                headerShown: false,

            }}>
            <Stack.Screen  name='enter' component={EnterScreen}/>
            <Stack.Screen name="start" component={StartScreen} />
            <Stack.Screen name="pickColor" component={PickColorScreen} />
        </Stack.Navigator>
    );
}

const CustomGoBackButton = ({ route }) => {
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={() => navigation.goBack()}
        >
            <AntDesign
                name="left"
                size={24}
                color={route.params.isTextDark == true ? 'black' : 'white'} />
        </Pressable>
    );
}

const CancelButton = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const deleteDraft = () => {
        dispatch(setDiaryTitle(''));
        dispatch(setDiaryContent(''));
        dispatch(setDiaryColors([]));
        dispatch(setDiaryTags([]));
        dispatch(setDiaryImageUri(null));
        Keyboard.dismiss();
    }
    return (
        <Pressable
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onPress={() => { navigation.goBack(); deleteDraft(); }}
        >
            <AntDesign
                name="left"
                size={20}
                color="#3A6655" />
            <Text
                style={{
                    fontSize: 16,
                    lineHeight: 20,
                    color: '#3A6655'
                }}>
                取消
            </Text>
        </Pressable>
    );
}

const CompleteButton = () => {
    const navigation = useNavigation();
    const diaryTitle = useSelector(selectTitle);
    const diaryContent = useSelector(selectContent);
    const diaryColors = useSelector(selectColors);
    const diaryTags = useSelector(selectTags);
    const diaryImageUri = useSelector(selectImageUri);
    const dispatch = useDispatch();

    const addDiary = useAddDiary();

    const [modalVisible, setModalVisible] = useState(false);

    const isPending = useSelector(selectIsPending)

    const uploadImage = async () => {
        try {
            const { uri } = await FileSystem.getInfoAsync(diaryImageUri);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError('NetWork request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });

            const filename = diaryImageUri.substring(diaryImageUri.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(filename);

            const task = ref.put(blob);
            dispatch(setIsPending());
            task.then((snapshot) => {
                snapshot.ref.getDownloadURL()
                    .then((uri) => {
                        console.log('Uri');
                        console.log(uri);
                        const timestamp = Date.now();
                        addDiary.mutateAsync({ diaryTitle, diaryContent, diaryColors, diaryTags, timestamp, uri })
                            .then(() => {
                                dispatch(setDiaryTitle(''));
                                dispatch(setDiaryContent(''));
                                dispatch(setDiaryColors([]));
                                dispatch(setDiaryTags([]));
                                dispatch(setDiaryImageUri(null));
                                Keyboard.dismiss();
                            }).catch((error) => {
                                alert(error);
                            })
                    })
            })
                .catch((error) => {
                    console.log(error);
                })
        }
        catch (error) {
            console.error(error);
        }
        finally {
        }

    }
    return (
        <>
            <Pressable
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={() => { uploadImage(); setModalVisible(!modalVisible) }}
            >

                <Text
                    style={{
                        fontSize: 16,
                        lineHeight: 20,
                        color: '#3A6655'
                    }}>
                    完成
                </Text>

                <AntDesign name="check" size={20} color="#3A6655" />

            </Pressable>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View
                    style={{
                        position: 'relative',
                        backgroundColor: 'rgba(198, 210, 199, 0.6)',
                        flex: 1,
                        paddingHorizontal: '5%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                    <View style={{
                        width: '90%',
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
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        {
                            isPending === true
                                ? (
                                    <View style={{
                                        paddingVertical: '10%',
                                    }}>
                                        <ActivityIndicator size={100} color="#456F5F" />
                                    </View>
                                )
                                : (
                                    <>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontSize: 26,
                                                color: '#456F5F',
                                                marginVertical: '10%'
                                            }}
                                        >
                                            日記新增成功
                                        </Text>
                                        <AntDesign name="checkcircleo" size={60} color="#456F5F" />
                                        <Pressable
                                            style={{
                                                marginVertical: '10%',
                                                borderRadius: 100,
                                                paddingHorizontal: '5%',
                                                height: 60,
                                                width: '50%',
                                                alignSelf: 'center',
                                                backgroundColor: 'red',
                                                shadowColor: '#F69261',
                                                shadowOffset: { width: 0, height: 10 },
                                                shadowOpacity: 0.2,
                                                shadowRadius: 10,
                                                elevation: 10, // for Android
                                            }}
                                            onPress={() => { setModalVisible(!modalVisible); navigation.goBack(); }}
                                        >
                                            <LinearGradient
                                                colors={['#F69261', '#F8AC79']}
                                                style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    right: 0,
                                                    top: 0,
                                                    bottom: 0,
                                                    borderRadius: 100,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: '#F4F3EA',
                                                        fontSize: 20,
                                                        lineHeight: 30,
                                                    }}>
                                                    返回
                                                </Text>
                                            </LinearGradient>
                                        </Pressable>
                                    </>
                                )
                        }

                    </View>
                </View>
            </Modal>
        </>
    );
}

const AlbumStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='AlbumStack'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="ColorAlbum" component={MyTab} />
            <Stack.Screen
                name="ColorDetail"
                component={ColorDetailScreen}
                options={({ route }) =>
                ({
                    title: '',
                    headerStyle: {
                        backgroundColor: route.params.hex,
                    },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <CustomGoBackButton route={route} />
                    ),
                    headerShown: true,

                })}
            />
            <Stack.Screen
                name='UploadPage'
                component={EditDiaryScreen}
                options={{
                    headerShown: true,
                    title: '日記',
                    headerStyle: {
                        backgroundColor: '#FAF6EC',
                    },
                    headerTitleStyle: {
                        color: '#3A6655'
                    },
                    headerTintColor: {
                        color: '#3A6655'
                    },
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerRight: () => (
                        <CompleteButton />
                    ),
                    headerLeft: () => (
                        <CancelButton />
                    ),
                }}
            />
            <Stack.Screen
                name='EditPage'
                component={UploadDiaryScreen}
                options={{
                    headerShown: true,
                    title: '編輯日記',
                    headerStyle: {
                        backgroundColor: '#FAF6EC',
                    },
                    headerTitleStyle: {
                        color: '#3A6655'
                    },
                    headerTintColor: {
                        color: '#3A6655'
                    },
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                }}
            />
        </Stack.Navigator>
    );
}

const MyTab = () => {

    const inset = useSafeAreaInsets();

    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                tabBarStyle: {
                    paddingBottom: Platform.OS === 'ios' ? inset.bottom : 5,
                    paddingTop: Platform.OS === 'ios' ? inset.top : 5,
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    borderRadius: 100,
                    backgroundColor: '#F5F4EB',
                    height: 60,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 4, // for Android
                    borderWidth: 0.5,
                    borderColor: '#CCD9D6',
                },
                tabBarShowLabel: false,
                headerStyle: {
                    backgroundColor: '#FAF6EC',
                },
                headerTitleStyle: {
                    color: '#3A6655'
                },
                headerTitleAlign: 'center',
                tabBarActiveBackgroundColor: '#4A5759',
                tabBarItemStyle: {
                    marginHorizontal: 10,
                    borderRadius: 20,
                },
            }}

        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="home" color={focused ? '#F5F4EB' : '#4A5759'} size={28} />
                    ),
                    headerTitle: '首頁',
                }} />
            <Tab.Screen
                name="Diary"
                component={DiaryScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="book" color={focused ? '#F5F4EB' : '#4A5759'} size={28} />
                    ),
                    headerTitle: '日記',
                }}
            />
            <Tab.Screen
                name="ColorAlbumStack"
                component={ColorAlbumScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="albums" color={focused ? '#F5F4EB' : '#4A5759'} size={28} />
                    ),
                    headerTitle: '圖鑑',
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="settings" color={focused ? '#F5F4EB' : '#4A5759'} size={28} />
                    ),
                    headerTitle: '設定',
                }}
            />
        </Tab.Navigator>
    );
}