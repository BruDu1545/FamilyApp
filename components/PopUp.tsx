import React from "react";
import { Modal, Image, View, Text, Button, StyleSheet } from "react-native";

export default function PopUp({ visible, onClose, text, isTrue }) {
    let icon;

    if (isTrue) {
        icon = require('../assets/icon_ok.png');
    } else {
        icon = require('../assets/icon_erro.png');
    }

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.popup}>
                    <Image source={icon} style={{ width: 64, height: 64 }}></Image>
                    <Text style={styles.text}>{text}</Text>
                    <Button title="Fechar" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    popup: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
});
