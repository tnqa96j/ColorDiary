import { View, Text, Pressable, StyleSheet, Image, SafeAreaView, StatusBar } from "react-native";
import { useDispatch,useSelector } from "react-redux";
import { setPickedColor1, setPickedColor2, setPickedColor3, setPickedColor4, setPickedColor5, setHasPickedColor } from '../redux/pickColorSlice';
import { LinearGradient } from "expo-linear-gradient";
import { selectUser } from "../redux/pickColorSlice";

import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

export default function StartScreen({ navigation }) {

    const dispatch = useDispatch();
    const userName = useSelector(selectUser);

    let color1 = "", color2 = "", color3 = "", color4 = "", color5 = "";

    const generateRandomColor = () => {
        // 生成隨機的 R、G、B 
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // 將 R、G、B 轉換為 HEX 格式的顏色代碼
        const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

        return hexColor;
    }

    //按下隨機產生鍵後，隨機產生一個顏色，將顏色存進global state，重複五次這個動作
    const handlePress = () => {
        color1 = generateRandomColor();
        dispatch(setPickedColor1(color1));
        color2 = generateRandomColor();
        dispatch(setPickedColor2(color2));
        color3 = generateRandomColor();
        dispatch(setPickedColor3(color3));
        color4 = generateRandomColor();
        dispatch(setPickedColor4(color4));
        color5 = generateRandomColor();
        dispatch(setPickedColor5(color5));

        dispatch(setHasPickedColor());
    }

    const [fontsLoaded, fontError] = useFonts({
        'KoHo-Light': require('../../assets/font/KoHo-Light.ttf'),
        'Caveat-Medium': require('../../assets/font/Caveat-Medium.ttf')
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
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar />
            <LinearGradient
                colors={['#faf6ec', '#d7e5e1']}
                style={styles.lineargradient}>

                <View style={{
                    display: 'flex',
                    padding: '10%',
                    justifyContent: 'space-evenly',
                    flex: 1
                }}>
                    <Text style={styles.hello}> 你好，{userName}</Text>

                    <View >
                        <Image style={styles.image} source={require('../../assets/shine-painting-tools-and-brushes.png')} />
                    </View>

                    <View style={styles.titleArea}>
                        <Text allowFontScaling={true} style={styles.subTitle}>開始挑選</Text>
                        <Text allowFontScaling={true} style={styles.mainTitle}>今天的五個顏色！</Text>
                    </View>

                    <View style={styles.buttonArea}>
                        <Pressable
                            style={{ ...styles.button, backgroundColor: '#F7F5EC', borderColor: '#F69463', borderWidth: 0.5 }}
                            onPress={handlePress}>
                            <Text style={{ ...styles.buttonText, color: '#3A6655' }}>隨機產生</Text>
                        </Pressable>

                        <Pressable
                            style={styles.button}
                            onPress={() => navigation.navigate('pickColor')}>
                            <LinearGradient
                                style={{ ...styles.lineargradient, display:'flex',borderRadius: 100, justifyContent: 'center',alignContent:'center' }}
                                colors={['#F69261', '#F8AC79']}>
                                <Text style={styles.buttonText}>手動選擇</Text>
                            </LinearGradient>
                        </Pressable>

                    </View>
                </View>


            </LinearGradient>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        marginTop: '20%'
    },
    hello:{
        fontSize:32,
        color: "#3A6655"
    },
    image: {
        alignSelf: 'center',
    },
    mainTitle: {
        fontSize: 32,
        color: "#3A6655"
    },
    subTitle: {
        fontSize: 28,
        color: '#3A6655'
    },
    buttonArea: {
        height: '8%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        gap: 15
    },
    button: {
        width: '50%',
        height: '100%',
        padding:'5%',
        borderRadius: 100,
        shadowColor: '#F69261',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4, // for Android
        justifyContent: 'center'
    },
    buttonText: {
        color: "white",
        textAlign: 'center',
        textAlignVertical:'center',
        fontSize:18,
        lineHeight:20
    },
    lineargradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});