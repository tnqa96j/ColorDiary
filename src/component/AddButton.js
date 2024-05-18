import { View, StyleSheet, Pressable, Modal, Text, Image, TouchableOpacity } from "react-native";
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetItem, ActionsheetItemText, ActionsheetScrollView, convertStyledToStyledVerbosed } from "@gluestack-ui/themed";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import { useDispatch, useSelector } from "react-redux";
import { setDiaryColors, setDiaryImageUri } from "../redux/uploadDiarySlice";

import * as ImageManipulator from 'expo-image-manipulator';
//Upload via camera & Upload via Gallery
//上傳完照片 -> 顯示照片縮圖以及繼續按鈕 isUpload

export default function AddButton({ navigation }) {

    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [showActionsheet, setShowActionsheet] = useState(false);
    const handleClose = () => setShowActionsheet(!showActionsheet)

    const [image, setImage] = useState(null);

    const uploadImage = async (mode) => {

        try {
            let result = {}
            if (mode == 'gallery') {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });

            }
            else {
                await ImagePicker.requestCameraPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                    CameraType: ImagePicker.CameraType.back,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,

                });
            }

            if (!result.canceled) {
                //save image
                await saveImage(result.assets[0].uri);
            }

        } catch (error) {
            alert("Error uploading image: " + error.message);
        }
    };

    const saveImage = async (image) => {
        try {
            const manipulateResult = await ImageManipulator.manipulateAsync(
                image,
                [],
               { compress: 0.5 } // from 0 to 1 "1 for best quality"
           );
            setImage(manipulateResult.uri);
            dispatch(setDiaryImageUri(manipulateResult.uri));
            setModalVisible(true);
            handleClose();

        } catch (error) {
            throw error
        }
    }

    return (
        <>
            <Pressable style={styles.button} onPress={handleClose}>
                <LinearGradient
                    style={styles.lineargradient}
                    colors={['#F69261', '#F8AC79']}>
                    <Ionicons name="add" size={24} color="#F4F3EA" />
                </LinearGradient>
            </Pressable>

            <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
                <ActionsheetBackdrop />
                <ActionsheetContent zIndex={999}>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>
                    <Text style={styles.title}>新增一篇日記</Text>
                    <View style={styles.uploadBlock}>
                        <TouchableOpacity style={styles.uploadOption} onPress={uploadImage}>
                            <MaterialIcons name="photo-camera" size={64} color="#4A5759" />
                            <Text style={styles.text}>拍照</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.uploadOption} onPress={() => uploadImage('gallery')}>
                            <MaterialIcons name="photo" size={64} color="#4A5759" />
                            <Text style={styles.text}>上傳相片</Text>
                        </TouchableOpacity>
                    </View>
                </ActionsheetContent>
            </Actionsheet>

            {
                image && <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <Pressable style={styles.bg} onPress={() => setModalVisible(false)}>
                        <Pressable style={styles.block} onPress={(event) => event.stopPropagation()}>
                            <Text style={styles.title}>新增一篇日記</Text>
                            <View style={{ ...styles.uploadBlock, flexDirection: 'column' }}>
                                <Image
                                    source={{ uri: image }}
                                    style={{ ...styles.image }}
                                />

                            </View>
                            <Pressable style={styles.continue} onPress={() => { setModalVisible(false); navigation.navigate('UploadPage', { image }) }}>
                                <LinearGradient
                                    colors={['#F69261', '#F8AC79']}
                                    style={styles.lineargradient}
                                >
                                    <Text style={styles.btntext}>下一步</Text>
                                    <MaterialIcons name="arrow-forward" size={24} color="#F4F3EA" />
                                </LinearGradient>
                            </Pressable>
                        </Pressable>
                    </Pressable>
                </Modal>
            }
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        width: 70,
        height: 70,
        bottom: 100,
        right: "5%",
        borderRadius: 100,
        shadowColor: '#F69261',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10, // for Android
    },
    lineargradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        gap: 5
    },
    bg: {
        position: 'relative',
        backgroundColor: 'rgba(198, 210, 199, 0.6)',
        flex: 1,
        paddingHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    block: {
        width: '100%',
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
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        marginVertical: '1%'
    },
    uploadBlock: {
        width: '100%',
        paddingVertical: '5%',
        paddingHorizontal: '3%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: 25,
    },
    image: {
        marginVertical: '5%',
        width: '100%',
        height: 200,
        borderRadius: 12,
    },
    uploadOption: {
        padding: '5%',
        borderRadius: 12,
        flexDirection: 'column',
        borderRadius: 12,

    },
    text: {
        alignSelf: 'center',
    },
    continue: {
        marginBottom: '3%',
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
    },
    btntext: {
        color: '#F4F3EA',
        fontSize: 20,
        lineHeight: 30,
    }
});