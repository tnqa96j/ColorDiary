import React, { useState, useEffect,useRef } from 'react';
import { View, Text,SafeAreaView,StatusBar } from "react-native";
import { StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setPickedColor1, setPickedColor2, setPickedColor3, setPickedColor4, setPickedColor5, setHasPickedColor } from '../redux/pickColorSlice';
import { selectPickedColor1,selectPickedColor2,selectPickedColor3,selectPickedColor4,selectPickedColor5 } from '../redux/pickColorSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper } from '@gluestack-ui/themed';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ColorPicker, { LuminanceCircular, Panel3, PreviewText, Swatches, colorKit } from 'reanimated-color-picker';
import { debounce } from 'lodash';
import Color from 'color';

import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

export default function PickColorScreen() {

    const reduxColor1 = useSelector(selectPickedColor1);
    const reduxColor2 = useSelector(selectPickedColor2);
    const reduxColor3 = useSelector(selectPickedColor3);
    const reduxColor4 = useSelector(selectPickedColor4);
    const reduxColor5 = useSelector(selectPickedColor5);


    const [showActionsheet, setShowActionsheet] = React.useState(false)
    const handleClose = () => setShowActionsheet(!showActionsheet)

    const [color1, setColor1] = useState(reduxColor1 ? reduxColor1 : '#DCE2E3');
    const [color2, setColor2] = useState(reduxColor2 ? reduxColor2 : '#DCE2E3');
    const [color3, setColor3] = useState(reduxColor3 ? reduxColor3 : '#DCE2E3');
    const [color4, setColor4] = useState(reduxColor4 ? reduxColor4 : '#DCE2E3');
    const [color5, setColor5] = useState(reduxColor5 ? reduxColor5 : '#DCE2E3');

    const [buttonIndex, setButtonIndex] = useState();

    const dispatch = useDispatch();
    
    //防抖函數
    const debouncedOnSelectColor = debounce(({ hex }) => {
        if (buttonIndex == 1) {
            setColor1(hex);
        }
        else if (buttonIndex == 2) {
            setColor2(hex);
        }
        else if (buttonIndex == 3) {
            setColor3(hex);
        }
        else if (buttonIndex == 4) {
            setColor4(hex);
        }
        else {
            setColor5(hex);
        }
    }, 300); 

    const onSelectColor = ({ hex }) => {
        debouncedOnSelectColor({ hex });
    };

    const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());
    const selectedColor = useSharedValue(customSwatches[0]);

    const passIndex = (index) => {
        setButtonIndex(index);
        console.log("colorIndex " + index);
    }

    useEffect(() => {
        dispatch(setPickedColor1(color1));
    }, [color1]);
    useEffect(() => {
        dispatch(setPickedColor2(color2));
    }, [color2]);

    useEffect(() => {
        dispatch(setPickedColor3(color3));
    }, [color3]);

    useEffect(() => {
        dispatch(setPickedColor4(color4));
    }, [color4]);

    useEffect(() => {
        dispatch(setPickedColor5(color5));
    }, [color5]);

    const darkenColor = (color) =>{
        const originColor = Color(color);
        const darkerColor = originColor.darken(0.3);
        const saturatedColor = darkerColor.saturate(0.3)
        return saturatedColor.hex();
    }

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

        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <LinearGradient
                colors={['#faf6ec', '#d7e5e1']}
                style={styles.lineargradient}
            >
                <View style={styles.title}>
                    <Text style={styles.titleText}>挑選今天的五個顏色吧！</Text>
                </View>

                <View style={styles.col}>
                    <Pressable
                        onPress={() => { handleClose(); passIndex(1); }}
                        style={{ ...styles.pressable, backgroundColor: color1, height: '60%' }} >
                            <View style={styles.pressableTextBox}>
                                <Text style={{...styles.pressableText,color:darkenColor(color1)}} >{color1}</Text>
                            </View>           
                    </Pressable>
                    <Pressable
                        onPress={() => { handleClose(); passIndex(2); }}
                        style={{ ...styles.pressable, backgroundColor: color2, height: '70%' }} >
                            <View style={{...styles.pressableTextBox,bottom:'8%'}}>
                                <Text style={{...styles.pressableText,color:darkenColor(color2)}} >{color2}</Text>
                            </View>           
                    </Pressable>
                    <Pressable
                        onPress={() => { handleClose(); passIndex(3); }}
                        style={{ ...styles.pressable, backgroundColor: color3, height: '80%' }} >
                            <View style={{...styles.pressableTextBox,bottom:'6%'}}>
                                <Text style={{...styles.pressableText,color:darkenColor(color3)}} >{color3}</Text>
                            </View>           
                    </Pressable>
                    <Pressable
                        onPress={() => { handleClose(); passIndex(4); }}
                        style={{ ...styles.pressable, backgroundColor: color4, height: '90%' }} >
                            <View style={{...styles.pressableTextBox,bottom:'4%'}}>
                                <Text style={{...styles.pressableText,color:darkenColor(color4)}} >{color4}</Text>
                            </View>           
                    </Pressable>
                    <Pressable
                        onPress={() => { handleClose(); passIndex(5); }}
                        style={{ ...styles.pressable, backgroundColor: color5, height: '100%' }} >
                            <View style={{...styles.pressableTextBox,bottom:'2%'}}>
                                <Text style={{...styles.pressableText,color:darkenColor(color5)}} >{color5}</Text>
                            </View>           
                    </Pressable>
                </View>

                <Pressable onPress={() => { dispatch(setHasPickedColor()) }} style={styles.button} >
                    <LinearGradient
                        style={{ ...styles.lineargradient, borderRadius: 100, display: 'flex', justifyContent: 'center', alignItems: "center" }}
                        colors={['#F69261', '#F8AC79']}>
                        <Text style={styles.buttonText}>決定 </Text>
                    </LinearGradient>
                </Pressable>
            </LinearGradient>


            <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
                <ActionsheetBackdrop />
                <ActionsheetContent h="$72" zIndex={999}>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>


                    <View style={styles.pickerContainer}>
                        <ColorPicker
                            value={selectedColor.value}
                            sliderThickness={24}
                            thumbSize={24}
                            onChange={onSelectColor}
                            adaptSpectrum
                            boundedThumb
                        >
                            <LuminanceCircular
                                containerStyle={styles.hueContainer}
                                thumbShape='circle'
                                thumbInnerStyle={{ borderWidth: 4, borderColor: '#fff' }}
                                thumbScaleAnimationValue={1}
                            >
                                <Panel3 style={styles.panelStyle} centerChannel='hsl-saturation' />
                            </LuminanceCircular>

                            <Swatches style={styles.swatchesContainer} swatchStyle={styles.swatchStyle} colors={customSwatches} />

                            <View style={styles.previewTxtContainer}>
                                <PreviewText style={{ color: '#707070' }} colorFormat='hsl' />
                            </View>
                        </ColorPicker>
                    </View>

                    <Pressable style={styles.closeButton} onPress={handleClose}>
                        <Text style={{ color:'#3A6655', fontWeight: 'bold' }}>確認</Text>
                    </Pressable>
                </ActionsheetContent>
            </Actionsheet>
        </SafeAreaView >
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
    },
    title: {
        height: '20%',
        paddingTop: '20%'
    },
    titleText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#3A6655',
    },
    col: {
        flex: 0.8,
        flexDirection: "row",
        justifyContent: 'center'
    },
    pressable: {
        width: '16%',
        height: '100%',
        backgroundColor: "gray",
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: '#FFFFFF'
    },
    pressableTextBox:{
        position:'absolute',
        height:'50%',
        width:'100%',
        bottom:'10%',
        display:'flex',
        justifyContent:'center'
    },
    pressableText:{
        fontSize:15,
        width:85,
        transform:[{translateX:100},{translateY:15}],
        transform:[{ rotate:'-90deg' }],
        bottom:0,
        fontFamily:'KoHo-Light'
    },
    colorPicker: {
        width: '90%',
        alignSelf: "center",
        margin: '10%'
    },
    panel: {
        borderRadius: 20,
    },
    preview: {
        width: '50%',
        height: 70,
        borderRadius: 20,
        alignSelf: 'center',
        margin: 15
    },
    button: {
        position: 'absolute',
        width: 100,
        height: 100,
        bottom: "10%",
        left: "10%",
        borderRadius: 100,
        shadowColor: '#F69261',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10, // for Android
        flex:0.4,
    },
    buttonText: {
        color: "white",
        textAlign: 'center',
        fontSize: 20
    },
    pickerContainer: {
        alignSelf: 'center',
        width: 300,
        padding: 20,
        borderRadius: 20,
    },
    hueContainer: {
        justifyContent: 'center',
    },
    panelStyle: {
        width: '90%',
        height: '90%',
        alignSelf: 'center',
        borderRadius: 16,
    },
    previewTxtContainer: {
        paddingTop: 20,
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: '#bebdbe',
    },
    swatchesContainer: {
        paddingTop: 20,
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: '#bebdbe',
        alignItems: 'center',
        flexWrap: 'nowrap',
        gap: 10,
    },
    swatchStyle: {
        borderRadius: 20,
        height: 30,
        width: 30,
        margin: 0,
        marginBottom: 0,
        marginHorizontal: 0,
        marginVertical: 0,
    },
    closeButton: {
        borderRadius: 100,
        borderWidth:0.5,
        borderColor:'#F69463',
        paddingHorizontal: 40,
        paddingVertical: 10,
        marginBottom:20,
        alignSelf: 'center',
        backgroundColor: '#F7F5EC',
    
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
      },
});