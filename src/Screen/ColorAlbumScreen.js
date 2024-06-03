import { View, Text, StyleSheet, FlatList, ScrollView, SectionList, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ColorPicker, { Swatches, colorKit } from 'reanimated-color-picker';
import AlbumItem from "../component/AlbumItem";
import AddButton from "../component/AddButton";
import { useGetAlbum } from "../../react-query";
import { Radio, RadioIndicator, CircleIcon, RadioIcon, RadioGroup, HStack } from "@gluestack-ui/themed";
import React, { useState, useEffect } from 'react';


export default function ColorAlbumScreen({ navigation }) {

    const customSwatches = ['#FA6969', '#FAC969', '#FAE369', '#BAFA69', '#69C6FA', '#CC69FA']

    const onSelectColor = ({ hex }) => {
        console.log(hex);
    }

    //取得顏色資料
    const { data, isPending } = useGetAlbum();

    const [radioValue, setRadioValue] = useState();
    const [colorData, setColorData] = useState(data);


    //篩選
    useEffect(()=>{
        if(radioValue){
            console.log("radio" + " " + radioValue);
            const filteredData = data.filter(item => item.type === radioValue);
            setColorData(filteredData);
        }else{
            setColorData(data);
        }
    },[radioValue,data]);




    return (
        <View style={{ flex: 1, justifyContent: "center" }} >
            <LinearGradient
                colors={['#faf6ec', '#d7e5e1']}
                style={styles.lineargradient}
            >
                {
                    isPending
                        ? (
                            <View style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                                <ActivityIndicator size={100} color="#456F5F" />
                            </View>
                        )
                        : (
                            <View style={styles.albumArea}>
                                <FlatList
                                    data={colorData}
                                    renderItem={({ item }) => <AlbumItem data={item} navigation={navigation} />}
                                    keyExtractor={item => item.id}
                                    showsVerticalScrollIndicator={false}
                                    numColumns={3}
                                    horizontal={false}
                                    columnWrapperStyle={{
                                        columnGap: 15,
                                    }}
                                    ListHeaderComponent={() =>
                                        <View style={styles.colorTypeArea}>
                                            <RadioGroup value={radioValue} onChange={setRadioValue}>
                                                <HStack space="2xl">
                                                    <Radio value="red">
                                                        <RadioIndicator  style={{ borderColor: '#FA6969' }}>
                                                            <RadioIcon as={CircleIcon} style={{ color: '#FA6969' }} />
                                                        </RadioIndicator>
                                                    </Radio>
                                                    <Radio value="orange">
                                                        <RadioIndicator style={{ borderColor: '#FAC969' }}>
                                                            <RadioIcon as={CircleIcon} style={{ color: '#FAC969' }} />
                                                        </RadioIndicator>
                                                    </Radio>
                                                    <Radio value="yellow">
                                                        <RadioIndicator  style={{ borderColor: '#FAE369' }}>
                                                            <RadioIcon as={CircleIcon} style={{ color: '#FAE369' }} />
                                                        </RadioIndicator>
                                                    </Radio>
                                                    <Radio value="green">
                                                        <RadioIndicator  style={{ borderColor: '#BAFA69' }}>
                                                            <RadioIcon as={CircleIcon} style={{ color: '#BAFA69' }} />
                                                        </RadioIndicator>
                                                    </Radio>
                                                    <Radio value="blue">
                                                        <RadioIndicator  style={{ borderColor: '#69C6FA' }}>
                                                            <RadioIcon as={CircleIcon} style={{ color: '#69C6FA' }} />
                                                        </RadioIndicator>
                                                    </Radio>
                                                    <Radio value="purple">
                                                        <RadioIndicator  style={{ borderColor: '#CC69FA' }}>
                                                            <RadioIcon as={CircleIcon} style={{ color: '#CC69FA' }} />
                                                        </RadioIndicator>
                                                    </Radio>
                                                    <Radio value="">
                                                        <RadioIndicator style={{ borderColor: 'gray' }}>
                                                            <RadioIcon as={CircleIcon} style={{ color: 'gray' }} />
                                                        </RadioIndicator>
                                                    </Radio>
                                                </HStack>
                                            </RadioGroup>
                                        </View>
                                    }

                                    ListFooterComponent={() => <View style={{ height: 150 }} />}
                                />
                            </View>

                        )
                }
            </LinearGradient>
            <AddButton navigation={navigation} />
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
    colorTypeArea: {
        alignItems: 'center',
        paddingVertical: '10%'
    },
    swatchContainer: {
        paddingVertical: 40,
        borderColor: '#bebdbe',
        alignItems: 'center',
        flexWrap: 'nowrap',
        gap: 10,
        width: '70%',
        alignSelf: 'center'
    },
    swatch: {
        borderRadius: 20,
        height: 15,
        width: 15,
        margin: 0,
        marginBottom: 0,
        marginHorizontal: 0,
        marginVertical: 0,

    },
    albumArea: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: '5%'
    }
});