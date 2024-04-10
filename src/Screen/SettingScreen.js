import { View,Text,StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SettingScreen(){
    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <LinearGradient
                colors={['#faf6ec', '#d7e5e1']}
                style={styles.lineargradient}
            ></LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    lineargradient:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});