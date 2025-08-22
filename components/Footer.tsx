import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from "react-native";

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function Footer({ select, navigation }) {
    
    return <>

        <View style={style.footer}>
            <TouchableOpacity onPress={() => navigation.navigate("Finance")}>
                <MaterialIcons name="attach-money" size={30} color={select === "Finance" ? "#fff000" : "white"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Works")}>
                <MaterialIcons name="work" size={30} color={select === "Works" ? "#fff000" : "white"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Shopping")}>
                <Fontisto name="shopping-basket" size={30} color={select === "Shopping" ? "#fff000" : "white"} />
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
        backgroundColor: "#1c1c1c",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
})