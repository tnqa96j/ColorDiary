import { View, Text, StyleSheet, Image, Pressable, Modal,TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useState } from 'react';
import { Divider } from "@gluestack-ui/themed";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetItem, ActionsheetItemText, ActionsheetIcon } from "@gluestack-ui/themed";
import { deleteDiary } from "../../api/firebase";
import { useDeleteDiary } from "../../react-query";

SplashScreen.preventAutoHideAsync();

export default function ArticleItem({ data,navigation }) {

    const [showActionsheet, setShowActionsheet] = useState(false)
    const handleClose = () => setShowActionsheet(!showActionsheet)

    const [modalVisible, setModalVisible] = useState(false);

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

    const timestampToData = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const amOrPm = hours >= 12 ? 'P.M.' : 'A.M.';

        // 轉換成 12 小時制
        hours = hours % 12 || 12;

        const formattedDate = `${year}／${month}／${day}`
        const formattedTime = `${hours}:${minutes} ${amOrPm}`

        return `${formattedDate}      ${formattedTime}`
    }

    const deleteDiary = useDeleteDiary();

    return (
        <View onLayout={onLayoutRootView}>
            <View style={styles.articleImage}>
                <Image source={{ uri: data.imageUri }} style={styles.image} />
                <View style={styles.pantone}>
                    {
                        data.palette.map((color, index) => (
                            <View
                                key={index}
                                style={{
                                    ...styles.colorBlock,
                                    backgroundColor: color,
                                    ...(index === 0 && { borderTopRightRadius: 20 }),
                                    ...(index === data.palette.length - 1 && { borderBottomRightRadius: 20 }),
                                }}
                            />
                        ))
                    }
                </View>
            </View>

            <View style={styles.bottomText}>
                <Text style={styles.title}>{data.title}</Text>
                <Pressable onPress={handleClose}>
                    <MaterialCommunityIcons name="dots-horizontal" size={36} color="#456F5F" />
                </Pressable>
            </View>

            <Text style={styles.content}>{data.content}</Text>
            <View style={styles.bottomText}>
                <Text style={styles.time}>{timestampToData(data.time)}</Text>
            </View>
            <Divider />
            <View style={{ height: 40 }}></View>

            <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
                <ActionsheetBackdrop />

                <ActionsheetContent h="$72" zIndex={999}>

                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>

                    <ActionsheetItem onPress={() => {handleClose(); navigation.navigate('EditPage',{data})}}>
                        <ActionsheetIcon>
                            <AntDesign name="edit" size={16} color="black" />
                        </ActionsheetIcon>
                        <ActionsheetItemText>編輯</ActionsheetItemText>
                    </ActionsheetItem>
                    <ActionsheetItem onPress={() => {handleClose();setModalVisible(!modalVisible)}}>
                        <ActionsheetIcon>
                            <AntDesign name="delete" size={16} color="black" />
                        </ActionsheetIcon>
                        <ActionsheetItemText>刪除</ActionsheetItemText>
                    </ActionsheetItem>
                </ActionsheetContent>
            </Actionsheet>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                    <View style={styles.bg}>
                        <View style={styles.alertBlock}>
                            <Text style={styles.deleteTitle}>刪除日記</Text>
                            <Text style={styles.deleteContent}>確定要刪除這篇日記嗎？進行此操作後將無法復原</Text>
                            <View style={styles.btnArea}>
                                <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={{fontSize:18,color:'#456F5F'}}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => {deleteDiary.mutate(data); setModalVisible(!modalVisible)}}>
                                    <Text style={{fontSize:18,color:'#456F5F'}}>刪除</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
            </Modal>
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
        marginBottom: 15,
        backgroundColor: '#c1ceca',
        borderRadius: 20
    },
    image: {
        width: '80%',
        height: '100%',
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
        marginVertical: 5,
        fontWeight: 'bold',
        paddingLeft: 5
    },
    content: {
        color: "#456F5F",
        fontSize: 16,
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
        gap: 20
    },
    time: {
        fontFamily: 'KoHo-Light',
        color: "#71AE97",
        fontSize: 12,
        marginVertical: 10,
        paddingLeft: 5,
        marginRight: 20

    },
    bg:{
        position: 'relative',
        backgroundColor: 'rgba(198, 210, 199, 0.6)',
        flex: 1,
        paddingHorizontal: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertBlock:{
        width: '100%',
        backgroundColor: '#F5F4EB',
        borderRadius: 12,
        paddingVertical: '5%',
        paddingHorizontal:'10%',
        shadowColor: '#4A5759',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        elevation: 10,
        justifyContent:'center',
    },
    deleteTitle:{
        fontSize:24,
        color:'#456F5F',
        marginVertical:'5%',
    },
    deleteContent:{
        marginBottom:'5%',
    },
    btnArea:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        gap:10
    },
    btn:{
        paddingHorizontal:10,
        paddingVertical:10
    },
});