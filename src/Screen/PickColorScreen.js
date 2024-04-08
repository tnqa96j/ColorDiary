import React, { useState, useEffect } from 'react';
import { View, Text } from "react-native";
import { Modal, StyleSheet, Pressable } from 'react-native';
import ColorPicker, { Preview, Panel5 } from 'reanimated-color-picker';
import { useDispatch, useSelector } from "react-redux";
import { setPickedColor1, setPickedColor2, setPickedColor3, setPickedColor4, setPickedColor5, setHasPickedColor } from '../redux/pickColorSlice';
import { selectPickedColors } from '../redux/pickColorSlice';
import { LinearGradient } from 'expo-linear-gradient';

export default function PickColorScreen() {

    const colors = useSelector(selectPickedColors);

    const [showModal, setShowModal] = useState(false);

    const [color1, setColor1] = useState(colors ? colors.color1 : "#000000");
    const [color2, setColor2] = useState(colors ? colors.color2 : "#000000");
    const [color3, setColor3] = useState(colors ? colors.color3 : "#000000");
    const [color4, setColor4] = useState(colors ? colors.color4 : "#000000");
    const [color5, setColor5] = useState(colors ? colors.color5 : "#000000");

    const [buttonIndex, setButtonIndex] = useState();

    const dispatch = useDispatch();

    const onSelectColor = ({ hex }) => {
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
    };

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


    return (

        <View style={styles.container}>
            <LinearGradient
                colors={['#faf6ec', '#d7e5e1']}
                style={styles.lineargradient}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>請挑選今日的五個顏色吧！</Text>
                </View>

                <View style={styles.col}>
                    <Pressable
                        onPress={() => { setShowModal(true); passIndex(1); }}
                        style={{ ...styles.pressable, backgroundColor: color1 }} />
                    <Pressable
                        onPress={() => { setShowModal(true); passIndex(2); }}
                        style={{ ...styles.pressable, backgroundColor: color2 }} />
                </View>

                <View style={styles.col}>
                    <Pressable
                        onPress={() => { setShowModal(true); passIndex(3); }}
                        style={{ ...styles.pressable, backgroundColor: color3 }} />
                    <Pressable
                        onPress={() => { setShowModal(true); passIndex(4); }}
                        style={{ ...styles.pressable, backgroundColor: color4 }} />
                    <Pressable
                        onPress={() => { setShowModal(true); passIndex(5); }}
                        style={{ ...styles.pressable, backgroundColor: color5 }} />
                </View>

                <Pressable onPress={() => { setShowModal(false); dispatch(setHasPickedColor()) }} style={styles.button}>
                    <Text style={styles.buttonText}>決定</Text>
                </Pressable>
            </LinearGradient>


            <Modal visible={showModal} animationType='slide' >
                <ColorPicker style={styles.colorPicker} onComplete={onSelectColor}>
                    <Panel5 style={styles.panel} />
                    <Preview
                        hideInitialColor={true}
                        style={styles.preview}
                        textStyle={{
                            fontSize: 28
                        }} />
                </ColorPicker>

                <Pressable onPress={() => setShowModal(false)} style={styles.button}>
                    <Text style={styles.buttonText}>決定</Text>
                </Pressable>
            </Modal>
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lineargradient: {
        position:'absolute',
        left:0,
        right:0,
        top:0,
        bottom:0,
    },
    col: {
        flex: 0.15,
        margin: 15,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    pressable: {
        width: 100,
        height: 100,
        backgroundColor: "gray",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'black'
    },
    colorPicker: {
        width: '90%',
        alignSelf: "center",
        marginTop: "40%"
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
        marginTop: 50,
        width: '80%',
        height: 50,
        backgroundColor: "purple",
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    buttonText: {
        color: "white",
        textAlign: 'center',
        fontSize: 20
    }
});