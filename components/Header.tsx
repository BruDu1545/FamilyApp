import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import MenuHamburguer from '../components/MenuHamburguer';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Header({ title, navigation }) {
    const [hamburguerVisible, setHamburguerVisible] = useState(false);

    const activeHamburguer = () => {
        setHamburguerVisible(!hamburguerVisible)
    }

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
        <View style={style.header}>
            <Entypo name="menu" size={50} color="black" onPress={activeHamburguer} />
            <Text style={style.title}>{title}</Text>
        </View>
        <MenuHamburguer visible={hamburguerVisible} onClose={() => setHamburguerVisible(false)} navigation={navigation} select={title} name={userName} />
    </>
}

const style = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white'
    },
    title: {
        color: '#000',
        fontSize: 30
    }
})