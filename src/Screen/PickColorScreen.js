import React, { useState } from 'react';
import { View, Text } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Modal, StyleSheet, Pressable } from 'react-native';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider, Panel3, Panel5 } from 'reanimated-color-picker';


export default function PickColorScreen() {
    const [showModal, setShowModal] = useState(false);
    const [color1,setColor1] = useState();
    const [color2,setColor2] = useState();
    const [color,setColor3] = useState();
    const [color4,setColor4] = useState();
    const [color5,setColor5] = useState();

    // Note: 👇 This can be a `worklet` function.
    const onSelectColor = ({ hex }) => {
        // do something with the selected color.
        console.log(hex);
    };

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>請挑選今日的五個顏色吧！</Text>
            </View>

            <View style={styles.col}>
                <Pressable onPress={() => setShowModal(true)} style={styles.pressable}/>
                <Pressable onPress={() => setShowModal(true)} style={styles.pressable}/>
            </View>

            <View style={styles.col}>
                <Pressable onPress={() => setShowModal(true)} style={styles.pressable}/>
                <Pressable onPress={() => setShowModal(true)} style={styles.pressable}/>
                <Pressable onPress={() => setShowModal(true)} style={styles.pressable}/>
            </View>


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
        backgroundColor: 'pink',
        justifyContent:'center'
    },
    col:{
        flex:0.15,
        margin:15,
        flexDirection:"row",
        justifyContent:"space-evenly"
    },
    pressable:{
        width: 100,
        height: 100,
        backgroundColor: "gray",
        borderRadius:20,
        borderWidth:3,
        borderColor:'black'
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