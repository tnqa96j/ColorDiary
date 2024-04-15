import { View, Text, StyleSheet, FlatList, ScrollView, SectionList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ColorPicker, { Swatches, colorKit } from 'reanimated-color-picker';
import colorsData from '../json/color.json'
import AlbumItem from "../component/AlbumItem";
import AddButton from "../component/AddButton";

export default function ColorAlbumScreen({ navigation }) {

    const customSwatches = ['#FA6969', '#FAC969', '#FAE369', '#BAFA69', '#69C6FA', '#CC69FA']

    const onSelectColor = ({ hex }) => {
        console.log(hex);
    }

    return (
        <View style={{ flex: 1, justifyContent: "center" }} >
            <LinearGradient
                colors={['#faf6ec', '#d7e5e1']}
                style={styles.lineargradient}
            >


                <View style={styles.albumArea}>
                    <FlatList
                        data={colorsData}
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
                                <ColorPicker
                                    sliderThickness={24}
                                    thumbSize={24}
                                    onChange={onSelectColor}
                                    adaptSpectrum
                                    boundedThumb>
                                    <Swatches
                                        colors={customSwatches}
                                        swatchStyle={styles.swatch}
                                        style={styles.swatchContainer}
                                    />
                                </ColorPicker>
                            </View>
                        }

                        ListFooterComponent={() => <View style={{ height: 150 }} />}
                    />
                </View>
                        <AddButton />
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
    colorTypeArea: {

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