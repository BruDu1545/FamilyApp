import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from "react-native";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesome } from '@expo/vector-icons';

export default function Home({ navigation }) {

    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("@user");
                if (jsonValue) {
                    const user = JSON.parse(jsonValue);
                    setUserName(user.name);
                } else {
                    setUserName("Erro");
                }
            } catch (error) {
                console.error("Erro ao ler usuário", error);
                setUserName("Erro");
            }
        };

        loadUser();
    }, []);

    return <>
        <Header title="Home" navigation={navigation} />
        <Text style={style.title}>Olá, {userName}</Text>
        <View style={style.gridButtons}>
            <View style={style.card}>
                <TouchableOpacity style={style.link} onPress={() => navigation.navigate("Finance")}>
                    <MaterialIcons style={style.icon} name="attach-money" size={40} color="black" />
                    <Text style={style.text}>
                        Finanças
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={style.card}>
                <TouchableOpacity style={style.link} onPress={() => navigation.navigate("Shopping")}>
                    <MaterialIcons style={style.icon} name="shopping-basket" size={40} color="black" />
                    <Text style={style.text}>
                        Compras
                    </Text>
                </TouchableOpacity >
            </View>
        </View>
        <View style={[style.gridButtons, { marginTop: 12 }]}>
            <View style={style.card}>
                <TouchableOpacity style={style.link} onPress={() => navigation.navigate("Works")}>
                    <MaterialIcons style={style.icon} name="work" size={40} color="black" />
                    <Text style={style.text}>
                        Tarefas
                    </Text>
                </TouchableOpacity >
            </View>
            <View style={style.card}>
                <TouchableOpacity style={style.link} onPress={() => navigation.navigate("User")}>
                    <FontAwesome style={style.icon} name="user" size={40} color="black" />
                    <Text style={style.text}>
                        Usuario
                    </Text>
                </TouchableOpacity >
            </View>
        </View>
        <Image style={style.image} source={require('../assets/logo_s_bg.png')}></Image>
        <Footer select="Home" navigation={navigation} />
    </>
}

const style = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: 35,
        margin: 25
    },
    gridButtons: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 25,
        marginRight: 32,
        gap: 15,
    },
    card: {
        width: '50%',
        backgroundColor: 'white',
        height: 'auto',
        borderWidth: 1,
        borderRadius: 8,
    },
    link: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    icon: {
        color: 'green'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15
    },
    image: {
        width: '90%',
        height: '50%',
        marginTop: 50,
        margin: 25
    }
})