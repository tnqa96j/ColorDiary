import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useDispatch } from "react-redux";
import { setPickedColor1, setPickedColor2, setPickedColor3, setPickedColor4, setPickedColor5, setHasPickedColor } from '../redux/pickColorSlice';
import { LinearGradient } from "expo-linear-gradient";

export default function StartScreen({ navigation }) {

    const dispatch = useDispatch();

    let color1 = "", color2 = "", color3 = "", color4 = "", color5 = "";

    const generateRandomColor = () => {
        // 生成隨機的 R、G、B 
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // 將 R、G、B 轉換為 HEX 格式的顏色代碼
        const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

        return hexColor;
    }

    //按下隨機產生鍵後，隨機產生一個顏色，將顏色存進global state，重複五次這個動作
    const handlePress = () => {
        color1 = generateRandomColor();
        dispatch(setPickedColor1(color1));
        color2 = generateRandomColor();
        dispatch(setPickedColor2(color2));
        color3 = generateRandomColor();
        dispatch(setPickedColor3(color3));
        color4 = generateRandomColor();
        dispatch(setPickedColor4(color4));
        color5 = generateRandomColor();
        dispatch(setPickedColor5(color5));

        dispatch(setHasPickedColor());
    }


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#faf6ec', '#d7e5e1']}
                style={styles.lineargradient}>

                <View style={styles.logo}>
                    <Text style={styles.logoText}>COLORFUL</Text>
                </View>

                <View style={styles.image}>
                    <Image source={require('../../assets/shine-painting-tools-and-brushes.png')} />
                </View>

                <View style={styles.titleArea}>
                    <Text style={styles.subTitle}>開始挑選</Text>
                    <Text style={styles.mainTitle}>今天的五個顏色！</Text>
                </View>

                <View style={styles.buttonArea}>
                    <Pressable
                        style={{ ...styles.button, backgroundColor: '#F7F5EC', borderColor: '#F69463', borderWidth: 1 }}
                        onPress={handlePress}>
                        <Text style={{ ...styles.buttonText, color: '#3A6655' }}>隨機產生</Text>
                    </Pressable>

                    <Pressable 
                        style={styles.button}
                        onPress={() => navigation.navigate('pickColor')}>
                        <LinearGradient 
                            style={{...styles.lineargradient,borderRadius:100}}
                            colors={['#F69261','#F8AC79']}>
                            <Text style={styles.buttonText}>手動選擇</Text>
                        </LinearGradient>
                    </Pressable>

                </View>


            </LinearGradient>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        paddingTop: 70,
    },
    logoText: {
        fontSize: 40,
        textAlign: 'center',
        color:'#3A6655',
        textShadowColor:"black",
        textShadowOffset:{ width: 0, height: 2 },
        textShadowRadius:4,
        elevation:4,
    },
    image: {

    },
    titleArea: {
        width: '80%',
        alignSelf: 'center'

    },
    mainTitle: {
        fontSize: 36,
        color:"#3A6655"
    },
    subTitle: {
        fontSize: 28,
        color:'#3A6655'
    },
    buttonArea: {
        flex: 0.4,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
        gap: 15
    },
    button: {
        width: '40%',
        height: '90%',
        backgroundColor: 'purple',
        borderRadius: 100,
        shadowColor: '#F69261',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4, // for Android
        
    },
    buttonText: {
        color: "white",
        textAlign: 'center',
        fontSize: 20,
        lineHeight: 55
    },
    lineargradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});