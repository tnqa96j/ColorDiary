import 'react-native-gesture-handler'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screen/HomeScreen";
import DiaryScreen from "../Screen/DiaryScreen";
import ColorAlbumScreen from "../Screen/ColorAlbumScreen";
import SettingScreen from "../Screen/SettingScreen";
import PickColorScreen from "../Screen/PickColorScreen";
import StartScreen from "../Screen/StartScreen";
import ColorDetailScreen from '../Screen/ColorDetailScreen';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';


import { useSelector } from "react-redux";
import { selectHasPickedColor } from "../redux/pickColorSlice";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



export default function Navigation() {
    const hasPickedColor = useSelector(selectHasPickedColor)
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
                    headerShadowVisible:false,
                    headerLeft: () => (
                        <CustomGoBackButton route={route} />
                    ),
                    headerShown: true
                })}
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