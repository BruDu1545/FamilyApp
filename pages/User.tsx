import React from "react";
import { Text } from 'react-native';
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function User({ navigation }) {
    return <>
        <Header title="User" navigation={navigation} />
        <Text>User</Text>
        <Footer select="User" navigation={navigation} />
    </>
}