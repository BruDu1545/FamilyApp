import React, { useState } from 'react';

import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { login } from '../config/login';
import PopUp from "../components/PopUp";

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [popUpVisible, setPopUpVisible] = useState(false);
    const [popUpData, setPopUpData] = useState({ isTrue: false, text: "Erro interno no servidor!" });


    const headleLogin = async  () => {
        const result = await login(email, password);

        if (result.success) {
            setPopUpVisible(true)
            setPopUpData({ isTrue: true, text: result.message})

            const timer = setTimeout(() => {
                navigation.reset({ index: 0, routes: [{ name: "Home" , params: {userName: result.user }}], });
            }, 3000)
        } else {
            setPopUpVisible(true)
            setPopUpData({ isTrue: false, text: result.message });
        }
    }

    return <>
        <View style={style.main}>
            <Image style={style.logo} source={require('../assets/favicon.png')}></Image>
            <Text style={style.title}>Login</Text>

            <Text style={style.label}>Insira seu Email:</Text>
            <TextInput style={style.input} onChangeText={setEmail} placeholder='Email...' />

            <Text style={style.label}>Insira sua Senha:</Text>
            <TextInput style={style.input} onChangeText={setPassword} secureTextEntry placeholder='Senha...' />

            <View style={style.btn}>
                <Button onPress={headleLogin} title={'Enviar'}></Button>
            </View>

            <PopUp visible={popUpVisible} onClose={() => setPopUpVisible(false)} isTrue={popUpData.isTrue} text={popUpData.text} />
        </View>
    </>
}

const style = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#000fff',
        padding: 15,
        borderRadius: 8,
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: "center",
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#fff',
    },
    label: {
        textAlign: 'left',
        color: '#fff',
        marginTop: 15

    },
    input: {
        color: '#fff',
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
    },
    btn: {
        marginTop: 15
    },
});
