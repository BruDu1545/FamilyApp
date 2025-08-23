import React from "react";
import { Modal, Image, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

export default function PopUp({ visible, onClose, text, isTrue }) {
    let icon;

    if (isTrue) {
        icon = require("../assets/icon_ok.png");
        return (
            <Modal visible={visible} transparent={true} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.popUp}>
                        <View style={styles.hero}>
                            <Image source={icon} style={{ width: 64, height: 64 }}></Image>
                        </View>
                        <View style={styles.textPopup}>
                            <Text style={styles.title}>Success!</Text>
                            <Text style={styles.textMessage}>{text}</Text>
                            <TouchableOpacity style={styles.btn} onPress={onClose}>
                                <Text style={styles.btnText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    } else {
        icon = require("../assets/icon_erro.png");
        return (
            <Modal visible={visible} transparent={true} animationType="fade">
                <View style={styles.overlayF}>
                    <View style={styles.popUpF}>
                        <View style={styles.heroF}>
                            <Image source={icon} style={{ width: 72, height: 64 }}></Image>
                        </View>
                        <View style={styles.textPopupF}>
                            <Text style={styles.titleF}>Warning!</Text>
                            <Text style={styles.textF}>{text}</Text>
                            <TouchableOpacity style={styles.btnF} onPress={onClose}>
                                <Text style={styles.btnTextF}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }


}

const styles = StyleSheet.create({
    overlayF: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    popUpF: {
        width: '65%',
        height: '30%',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'white',
        backgroundColor: '#fff',
    },
    heroF: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff4646ff',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingBottom: 10,
        paddingTop: 10,
    },
    textPopupF: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    titleF: {
        fontWeight: 'bold',
        fontSize: 25
    },
    textF: {
        marginTop: 15
    },
    btnF: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ff4646ff',
        padding: 4,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 15,
        marginTop: 15
    },
    btnTextF: {
        color: 'white'
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    popUp: {
        width: '65%',
        height: '30%',
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: '#fff',
    },
    hero: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#41bb2bff',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingBottom: 10,
        paddingTop: 10,
    },
    textPopup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25
    },
    textMessage: {
        marginTop: 15
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#41bb2bff',
        padding: 4,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 15,
        marginTop: 15
    },
    btnText: {
        color: 'white'
    }
});
