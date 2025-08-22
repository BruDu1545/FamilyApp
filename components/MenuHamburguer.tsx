import React from "react";
import { Modal, Image, View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo } from "@expo/vector-icons";

export default function Hamburguer({ visible, onClose, navigation }) {

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.hamburguer}>
                    <Button color="red" title="X" onPress={onClose} />
                    <View style={styles.navList}>
                        <TouchableOpacity onPress={() => navigation.navigate("User")}>
                            <View style={styles.navIten}>
                                <FontAwesome name="user" size={24} color="black" />
                                <Text style={styles.navTitle}>Perfil</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Finance")}>
                            <View style={styles.navIten}>
                                <MaterialIcons name="attach-money" size={30} color="black" />
                                <Text style={styles.navTitle}>Finanças</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <View style={styles.navIten}>
                                <Entypo name="home" size={30} color="black" />
                                <Text style={styles.navTitle}>Pagina inicial</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Shopping")}>
                            <View style={styles.navIten}>
                                <Fontisto name="shopping-basket" size={30} color="black" />
                                <Text style={styles.navTitle}>Shopping</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Finance")}>
                            <View style={styles.navIten}>
                                <Ionicons name="exit" size={24} color="black" />
                                <Text style={styles.navTitle}>Sair</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",

    },
    hamburguer: {
        backgroundColor: "#fff",
        padding: 20,
        width: "80%",
        height: '100%',
    },
    navList: {
        display: 'flex',
        flexDirection: 'column',
        gap: 50,
        marginTop: 50
    },
    navIten: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
        borderWidth: 1,
        borderRadius: 8,
    },
    navTitle: {
        fontWeight: 'bold',
        fontSize: 15
    }
});
