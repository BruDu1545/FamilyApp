import React, { useEffect, useState } from 'react';

import { Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { login } from '../config/login';
import PopUp from "../components/PopUp";
import { getLoggedUser } from '../config/auth';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [popUpVisible, setPopUpVisible] = useState(false);
    const [popUpData, setPopUpData] = useState({ isTrue: false, text: "Erro interno no servidor!" });


    const headleLogin = async () => {
        const result = await login(email, password);

        if (result.success) {
            setPopUpVisible(true)
            setPopUpData({ isTrue: true, text: result.message })

            const timer = setTimeout(() => {
                navigation.reset({ index: 0, routes: [{ name: "Home", params: { userName: result.user } }], });
            }, 3000)
        } else {
            setPopUpVisible(true)
            setPopUpData({ isTrue: false, text: result.message });
        }
    }

    useEffect(() => {
        const checkUser = async () => {
            const user = await getLoggedUser();
            if (user) {
                navigation.replace("Home");
            }
        };
        checkUser();
    }, []);


    return <>
        <View style={style.main}>
            <View style={style.grid}>
                <View style={style.hero}>
                    <Image style={style.logo} source={require('../assets/favicon.png')}></Image>
                </View>
                <View style={style.form}>
                    <Text style={style.title}>Login</Text>

                    <TextInput style={style.input} onChangeText={setEmail} placeholder='   Login...' placeholderTextColor="#000" />

                    <TextInput style={style.input} onChangeText={setPassword} secureTextEntry placeholder='   Senha...' placeholderTextColor="#000" />

                    <TouchableOpacity style={style.btn} onPress={headleLogin}>
                        <Text style={style.btnText}>Enviar</Text>
                    </TouchableOpacity>

                </View>
                <View style={style.down}></View>
            </View>
            <PopUp visible={popUpVisible} onClose={() => setPopUpVisible(false)} isTrue={popUpData.isTrue} text={popUpData.text} />
        </View>
    </>
}

const style = StyleSheet.create({
    main: {
        backgroundColor: '#0A1A40',
        flex: 1,
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
    },
    hero: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
        backgroundColor: 'white',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 220,
        borderBottomLeftRadius: 0,
    },
    logo: {
        height: 180,
        width: 180,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 40
    },
    title: {
        color: 'white',
        fontSize: 55
    },
    label: {
        fontSize: 15,
        color: 'white',
        textAlign: 'left'
    },
    input: {
        width: '80%',
        height: '11.5%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderBlockColor: 'white',
        borderRadius: 25,
        color: 'black'
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '80%',
        height: '10%',
        borderWidth: 1,
        borderBlockColor: 'white',
        borderRadius: 25,
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    down: {
        height: 80,
        backgroundColor: 'white',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    }
});