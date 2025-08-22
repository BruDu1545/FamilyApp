import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import MenuHamburguer from '../components/MenuHamburguer';


export default function Header({ title, navigation }) {
    const [hamburguerVisible, setHamburguerVisible] = useState(false);

    const activeHamburguer = () => {
        setHamburguerVisible(!hamburguerVisible)
    }

    return <>
        <View style={style.header}>
            <Entypo name="menu" size={50} color="white" onPress={activeHamburguer} />
            <Text style={style.title}>{title}</Text>
        </View>
        <MenuHamburguer visible={hamburguerVisible} onClose={() => setHamburguerVisible(false)} navigation={navigation}/>
    </>
}

const style = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    title: {
        color: '#fff',
        fontSize: 30
    }
})