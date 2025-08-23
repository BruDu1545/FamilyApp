import React from "react";
import { Modal, Image, View, Text, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo } from "@expo/vector-icons";

export default function Hamburguer({ visible, onClose, navigation, select, name}) {

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.hamburguer}>
                    <TouchableOpacity style={styles.btn} onPress={onClose}>
                        <Text style={styles.btnText}>Fechar                                               X</Text>
                    </TouchableOpacity>
                    <View style={styles.userProfile}>
                        <Image source={require('../assets/profile_photo.png')} style={styles.imageProfile}></Image>
                        <View style={styles.textProfile}>
                            <Text style={styles.nameUser}>{name}</Text>
                            <Text style={styles.textUser}>Membro fundamental</Text>
                        </View>
                    </View>
                    <View style={styles.navList}>
                        <TouchableOpacity onPress={() => navigation.navigate("User")}>
                            <View style={[styles.navIten, select === 'User' ? { backgroundColor: '#0A1A40' } : []]}>
                                <FontAwesome name="user" size={24} color={select === 'User' ? 'white' : 'black'} />
                                <Text style={[styles.navTitle, select === 'User' ? { color: 'white' } : []]}>Perfil</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Finance")}>
                            <View style={[styles.navIten, select === 'Finance' ? { backgroundColor: '#0A1A40' } : []]}>
                                <MaterialIcons name="attach-money" size={30} color={select === 'Finance' ? 'white' : 'black'} />
                                <Text style={[styles.navTitle, select === 'Finance' ? { color: 'white' } : []]}>Finanças</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <View style={[styles.navIten, select === 'Home' ? { backgroundColor: '#0A1A40' } : []]}>
                                <Entypo name="home" size={30} color={select === 'Home' ? 'white' : 'black'} />
                                <Text style={[styles.navTitle, select === 'Home' ? { color: 'white' } : []]}>Pagina inicial</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Shopping")}>
                            <View style={[styles.navIten, select === 'Shopping' ? { backgroundColor: '#0A1A40' } : []]}>
                                <Fontisto name="shopping-basket" size={30} color={select === 'Shopping' ? 'white' : 'black'} />
                                <Text style={[styles.navTitle, select === 'Shopping' ? { color: 'white' } : []]}>Shopping</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Finance")}>
                            <View style={[styles.navIten, select === 'Finance' ? { backgroundColor: '#0A1A40' } : []]}>
                                <Ionicons name="exit" size={24} color={select === 'Finance' ? 'white' : 'black'} />
                                <Text style={[styles.navTitle, select === 'Finance' ? { color: 'white' } : []]}>Sair</Text>
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
        gap: 25,
        marginTop: 50
    },
    navIten: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
        gap: 25,
        borderRadius: 15
    },
    navTitle: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    btn: {
        backgroundColor: 'red',
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 15,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
    },
    userProfile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 50,
        gap: 15,
        borderWidth: 1,
        borderRadius: 15,
        padding: 15
    },
    textProfile: {
        display: 'flex',
        flexDirection: 'column',
    },
    nameUser: {
        fontWeight: 'bold',
        fontSize: 20
    },
    textUser: {
        fontSize: 15
    },
    imageProfile: {
        width: 80,
        height: 80
    }
});
