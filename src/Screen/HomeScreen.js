import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { selectPickedColors } from "../redux/pickColorSlice";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import ColorRing from "../component/ColorRing";


SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {

    const colors = useSelector(selectPickedColors);

    const [fontsLoaded, fontError] = useFonts({
        'KoHo-Light' : require('../../assets/font/KoHo-Light.ttf'),
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
                            <Text style={styles.dateText}>04</Text>
                            <Text style={styles.dateText}>/12</Text>
                        </View>
                        <Text style={styles.dayOfwkText}>WED</Text>
                    </View>

                    <View style={styles.blockArea}>
                        <View style={{ ...styles.box, backgroundColor: colors.color1 }} />
                        <View style={{ ...styles.box, backgroundColor: colors.color2 }} />
                        <View style={{ ...styles.box, backgroundColor: colors.color3 }} />
                        <View style={{ ...styles.box, backgroundColor: colors.color4 }} />
                        <View style={{ ...styles.box, backgroundColor: colors.color5 }} />
                    </View>

                    <View style={styles.pieArea}>
                        <ColorRing />
                    </View>

                    <View style={styles.taskArea}>
                        <View style={styles.taskBlock}>
                            <Text style={styles.one}>每日任務</Text>
                            <Text style={styles.two}>進度</Text>
                            <Text style={styles.three}>0/5</Text>
                        </View>
                        <View style={styles.taskBlock}>
                            <Text style={styles.one}>今日代表色</Text>
                            <Text style={styles.two}>抽籤</Text>
                            <Text style={styles.three}>GO</Text>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
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
    dateArea:{
        display:'flex',
        flexDirection:'row',
        height:100,
        width:'100%',
        paddingHorizontal:'10%',
        alignItems:'flex-end',
    },
    date:{
        height:'100%',
        width:100,
        display:'flex',
        justifyContent:'flex-end'
    },
    dateText:{
        fontSize:40,
        textAlign:'center',
        fontFamily:'KoHo-Light',
        lineHeight:40,
        color:'#3A6655'
    },
    dayOfwkText:{
        fontFamily:'KoHo-Light',
        fontSize:20,
        color:'#3A6655'
    },
    blockArea: {
        height:100,
        width:'100%',
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        gap:5,
    },
    box: {
        height: 25,
        width: 40,
        backgroundColor: "gray",
        borderColor: '#F9F9F9',
        borderWidth: 0.5,
        borderRadius:5
    },
    pieArea:{
        height:300,
        width:300,
        alignSelf:'center',
    },
    taskArea:{
        marginTop:40,
        height:300,
        display:'flex',
        flexDirection:'row',
        paddingHorizontal:'10%',
        gap:15,
    },
    taskBlock:{
        width:'50%',
        backgroundColor:'#F4F3EA',
        height:150,
        borderRadius:12,
        padding:'5%'
    },
    one:{
        color:'#3A6655',
        fontSize:22,
        lineHeight:35,
        fontWeight:'bold'

    },
    two:{
        color:'#3A6655',
        fontSize:18,
        lineHeight:35,

    },
    three:{
        color:'#3A6655',
        fontSize:36,
        fontFamily:'KoHo-Light',
        textAlign:'right'

    }

});