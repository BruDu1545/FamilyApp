import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Header from "../components/Header";
import Footer from "../components/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function User({ navigation }) {
    const [user, setUser] = useState<{ id: number, name: string } | null>(null);
    const [newName, setNewName] = useState('');


    useEffect(() => {
        const loadUser = async () => {
            const jsonValue = await AsyncStorage.getItem("@user");
            if (jsonValue) {
                const data = JSON.parse(jsonValue);
                setUser(data);
                setNewName(data.name);
            }
        };
        loadUser();
    }, []);

    const handleSave = async () => {
        if (!newName.trim()) return;
        const updatedUser = { ...user, name: newName };
        await AsyncStorage.setItem("@user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        Alert.alert("Sucesso", "Nome atualizado!");
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem("@user");
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };
    return (
        <>
            <Header title="Meu Perfil" navigation={navigation} />
            <View style={style.container}>
                <View style={style.hero}>
                    <Image source={require('../assets/profile_photo.png')} style={style.imageProfile}></Image>
                    <View style={style.textProfile}>
                        <Text style={style.nameUser}>{newName}</Text>
                        <Text style={style.textUser}>Membro fundamental</Text>
                    </View>
                </View>
                <View style={style.grid}>
                    <Text style={style.label}>ID do Usuário:</Text>
                    <Text style={style.value}>{user?.id ?? "-"}</Text>

                    <Text style={style.label}>Nome:</Text>
                    <TextInput
                        style={style.input}
                        value={newName}
                        onChangeText={setNewName}
                        placeholder="Digite seu nome"
                        placeholderTextColor="#aaa"
                    />

                    <TouchableOpacity style={style.btnSave} onPress={handleSave}>
                        <Text style={style.btnText}>Salvar Alterações</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.btnLogout} onPress={handleLogout}>
                        <Text style={style.btnText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer select="User" navigation={navigation} />
        </>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A1A40',
    },
    label: {
        color: '#fff',
        fontSize: 16,
        marginTop: 20,
    },
    value: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        color: '#fff',
    },
    btnSave: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
    },
    btnLogout: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
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
        width: 150,
        height: 150
    },
    hero: {
        backgroundColor: 'white',
        borderBottomEndRadius: 19999,
        height: '35%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 35,
        paddingLeft: 35
    },
    grid: {
        margin: 25
    }
});
