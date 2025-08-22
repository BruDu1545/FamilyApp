import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from "react-native";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import Footer from '../components/Footer';


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
        <View style={style.grid}>
            <TouchableOpacity onPress={() => navigation.navigate("Finance")}>
                <View style={style.card}>
                    <MaterialIcons style={style.icon} name="attach-money" size={50} color="black" />
                    <Text style={style.text}>
                        Finanças
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Shopping")}>
                <View style={style.card}>
                    <MaterialIcons style={style.icon} name="shopping-basket" size={50} color="black" />
                    <Text style={style.text}>
                        Shopping
                    </Text>
                </View>
            </TouchableOpacity >
            <TouchableOpacity onPress={() => navigation.navigate("Works")}>
                <View style={style.card}>
                    <MaterialIcons style={style.icon} name="work" size={50} color="black" />
                    <Text style={style.text}>
                        Works
                    </Text>
                </View>
            </TouchableOpacity >
        </View>
        <Footer select="Home" navigation={navigation} />
    </>
}

const style = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: 35,
        margin: 25
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        margin: 25,
        gap: 15,
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 200,
        borderWidth: 1,
        borderRadius: 8,
    },
    icon: {
        color: 'green'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 30
    }
})