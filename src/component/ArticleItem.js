import { View, Text, StyleSheet, Image } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { Divider } from "@gluestack-ui/themed";
import { bottomLeft, bottomRight } from "@shopify/react-native-skia";

SplashScreen.preventAutoHideAsync();

export default function ArticleItem({ data }) {

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
            <View style={styles.articleImage}>
                <Image source={{ uri: data.image }} style={styles.image} />
                <View style={styles.pantone}>
                    <View style={{ ...styles.colorBlock, backgroundColor: data.color1, borderTopRightRadius: 20 }}></View>
                    <View style={{ ...styles.colorBlock, backgroundColor: data.color2 }}></View>
                    <View style={{ ...styles.colorBlock, backgroundColor: data.color3 }}></View>
                    <View style={{ ...styles.colorBlock, backgroundColor: data.color4 }}></View>
                    <View style={{ ...styles.colorBlock, backgroundColor: data.color5, borderBottomRightRadius: 20 }}></View>
                </View>
            </View>

            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.content}>{data.content}</Text>
            <View style={styles.bottomText}>

                <Text style={styles.time}>{data.date} {data.time}</Text>

                <View style={styles.bottomRight}>
                    <Text style={styles.time}>編輯</Text>
                    <Text style={styles.time}>刪除</Text>
                </View>
            </View>
            <Divider />
            <View style={{height:20}}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    articleImage: {
        width: '100%',
        height: 200,
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        marginBottom: 15
    },
    image: {
        width: '80%',
        height: '100%',
        backgroundColor: 'blue',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    pantone: {
        width: '20%',

    },
    colorBlock: {
        width: '100%',
        height: '20%',
    },
    title: {

        color: "#456F5F",
        fontSize: 20,
        marginTop: 5,
        fontWeight: 'bold',
        paddingLeft: 5
    },
    content: {
        color: "#456F5F",
        fontSize: 14,
        paddingLeft: 5
    },
    bottomText: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomLeft: {

    },
    bottomRight: {
        display: 'flex',
        flexDirection: 'row',
        gap:20
    },
    time: {
        fontFamily: 'KoHo-Light',
        color: "#71AE97",
        fontSize: 12,
        marginVertical: 10,
        paddingLeft: 5

    },
});