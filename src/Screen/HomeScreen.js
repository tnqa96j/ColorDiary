import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { selectPickedColors } from "../redux/pickColorSlice";

export default function HomeScreen() {

    const colors = useSelector(selectPickedColors);
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.row1}>
                <View style={{...styles.box,backgroundColor:colors.color1}} />
                <View style={{...styles.box,backgroundColor:colors.color2}} />
                <View style={{...styles.box,backgroundColor:colors.color3}} />
                <View style={{...styles.box,backgroundColor:colors.color4}} />
                <View style={{...styles.box,backgroundColor:colors.color5}} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row1: {
        flex: 0.5,
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent:'center'
    },
    box: {
        height:50,
        width:50,
        backgroundColor:"gray",
        marginTop:10,
        borderColor:'white',
        borderWidth:2
    }
});