import { View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AddIcon = () => {
    return <Ionicons name="add" size={24} color="black" />
}
export default function AddButton() {
    return (

        <Pressable style={styles.button} >
            <LinearGradient
                style={styles.lineargradient}
                colors={['#F69261', '#F8AC79']}>
                <Ionicons name="add" size={24} color="#F4F3EA" />
            </LinearGradient>
        </Pressable>

    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        width: 70,
        height:70,
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
        alignItems: "center"
    }
});