import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from "react-native";

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function Footer({ select, navigation }) {

    return <>

        <View style={style.footer}>
            <TouchableOpacity style={style.center} onPress={() => navigation.navigate("Home")}>
                <Entypo name="home" size={30} color={select === "Home" ? "#ffbb00ff" : "#1c1c1c"} />
                <Text style={[style.span, { color: select === "Home" ? "#ffbb00ff" : "#1c1c1c" }]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.center} onPress={() => navigation.navigate("Finance")}>
                <MaterialIcons name="attach-money" size={30} color={select === "Finance" ? "#ffbb00ff" : "#1c1c1c"} />
                <Text style={[style.span, { color: select === "Finance" ? "#ffbb00ff" : "#1c1c1c" }]}>Finanças</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.center} onPress={() => navigation.navigate("Works")}>
                <MaterialIcons name="work" size={30} color={select === "Works" ? "#ffbb00ff" : "#1c1c1c"} />
                <Text style={[style.span, { color: select === "Works" ? "#ffbb00ff" : "#1c1c1c" }]}>Tarefas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.center} onPress={() => navigation.navigate("Shopping")}>
                <Fontisto name="shopping-basket" size={30} color={select === "Shopping" ? "#ffbb00ff" : "#1c1c1c"} />
                <Text style={[style.span, { color: select === "Shopping" ? "#ffbb00ff" : "#1c1c1c" }]}>Compras</Text>
            </TouchableOpacity>
        </View>
    </>
}

const style = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 12,
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        paddingBottom: 35,
        left: 0,
        right: 0,
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    span: {

    }
})