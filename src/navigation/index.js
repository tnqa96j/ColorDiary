import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screen/HomeScreen";
import DiaryScreen from "../Screen/DiaryScreen";
import ColorAlbumScreen from "../Screen/ColorAlbumScreen";
import SettingScreen from "../Screen/SettingScreen";
import PickColorScreen from "../Screen/PickColorScreen";
import StartScreen from "../Screen/StartScreen";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSelector } from "react-redux";
import { selectHasPickedColor } from "../redux/pickColorSlice";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



export default function Navigation() {
    const hasPickedColor = useSelector(selectHasPickedColor)
    return (

        <NavigationContainer>
            {!hasPickedColor ?<NyStack />:<MyTab />}
        </NavigationContainer>

    );
}

const NyStack = () => {
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

const MyTab = () => {

    const inset = useSafeAreaInsets();

    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                tabBarStyle: {
                    paddingBottom: Platform.OS === 'ios' ? inset.bottom : 5,
                    paddingTop: Platform.OS === 'ios' ? inset.top : 5,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen
                name="Diary"
                component={DiaryScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="book" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="ColorAlbum"
                component={ColorAlbumScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="albums" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="settings" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}