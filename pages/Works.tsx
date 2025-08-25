import React, { useState } from "react";
import { Button, FlatList, Text, Image, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';

import Header from "../components/Header";
import Footer from "../components/Footer";

import { addWork } from '../config/work/addWork';
import { getWork } from '../config/work/getWork';
import PopUp from "../components/PopUp";
import { delWork } from "../config/work/delWork";
import { doneWork } from "../config/work/doneWork";
import { AntDesign, Ionicons } from "@expo/vector-icons";


export default function Works({ navigation }) {
    const [newWork, setNewWork] = useState('')

    type WorkList = {
        status: number; id: number; title: string
    };

    const [list, setList] = useState<WorkList[]>([]);
    const [popUpVisible, setPopUpVisible] = useState(false);
    const [popUpData, setPopUpData] = useState({ isTrue: false, text: "Erro interno no servidor!" });

    const addWorks = async () => {
        if (newWork) {
            const result = await addWork(newWork.trim())
            if (result?.success) {
                const itens = await getWork();
                const rows = itens.data as any[];
                setList(
                    rows.map((r) => ({
                        id: r.id,
                        title: (r.title ?? r.item ?? "").trim(),
                        status: r.status,
                    }))
                );
                setNewWork('');
                closeAddMenu()
            } else {
                setPopUpVisible(true)
                setPopUpData({ isTrue: true, text: result.message })
                const timer = setTimeout(() => {
                    setPopUpVisible(false)
                }, 3000)
            }
        }
    }

    async function reloadItens() {
        const itens = await getWork();
        if (itens?.success) {
            const rows = itens.data as any[];
            setList(
                rows.map((r) => ({
                    id: r.id,
                    title: (r.title ?? r.item ?? "").trim(),
                    status: r.status,
                }))
            );
        } else {
            setPopUpVisible(true);
            setPopUpData({ isTrue: true, text: itens?.message ?? "Erro ao carregar a lista" });
            setTimeout(() => setPopUpVisible(false), 3000);
        }
    }
    reloadItens()

    const handleDelete = async (id: number) => {
        const results = await delWork(id)
        if (results?.success) {
            reloadItens()
        } else {
            console.log(results.message)
        }
    }

    const handleDone = async (id: number) => {
        const results = await doneWork(id)
        if (results?.success) {
            reloadItens()
        } else {
            console.log(results.message)
        }
    }

    const [addMenu, SetAddMenu] = useState(false);

    const openAddMenu = () => {
        SetAddMenu(true)
    }
    const closeAddMenu = () => {
        SetAddMenu(false)
    }

    return <>
        <Header title="Works" navigation={navigation} />
        <Text style={style.title}>Trabalhos da casa</Text>
        <View style={style.grid}>
            <FlatList
                data={list}
                keyExtractor={(it) => String(it.id)}
                renderItem={({ item }) => (
                    <View style={style.card}>
                        <Text style={[style.iten, { color: item.status === 1 ? 'green' : 'black', textDecorationLine: item.status === 1 ? "line-through" : "none" }]} >{item.title}</Text>
                        <View style={style.row}>
                            <TouchableOpacity style={[style.btn, { borderColor: 'green' }]} onPress={() => handleDone(item.id)}>
                                <AntDesign name="checkcircle" size={24} color="green" />
                                <Text style={style.text}>Feito</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[style.btn, { borderColor: 'red' }]} onPress={() => handleDelete(item.id)}>
                                <Ionicons name="trash" size={24} color="red" />
                                <Text style={style.text}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity style={style.btnFloating} onPress={() => openAddMenu()}>
                <AntDesign name="plus" size={45} color="#0A1A40" />
            </TouchableOpacity>
            <TouchableOpacity style={[style.overlay, { display: addMenu ? 'flex' : 'none' }]} onPress={() => closeAddMenu()}></TouchableOpacity>
            <View style={[style.addMenu, { display: addMenu ? 'flex' : 'none' }]}>
                <View style={style.hero}>
                    <Image source={require('../assets/tasks.png')} style={{ width: 150, height: 133 }}></Image>
                </View>
                <Text style={[style.title, { color: "black" }]}>
                    Adicionar Itens
                </Text>
                <TextInput style={style.input} onChangeText={setNewWork} placeholder='Digite aqui...' value={newWork} placeholderTextColor="#aaa" />
                <TouchableOpacity style={style.btnEnviar} onPress={() => addWorks()}>
                    <Text style={[style.text, { color: "white" }]}>
                        Enviar
                    </Text>
                </TouchableOpacity >
            </View>
        </View>
        <PopUp visible={popUpVisible} onClose={() => setPopUpVisible(false)} isTrue={popUpData.isTrue} text={popUpData.text} />
        <Footer select="Works" navigation={navigation} />
    </>
}

const style = StyleSheet.create({
    grid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: 85
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        color: 'white',
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        margin: 10,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    iten: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        marginTop: 15,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 15,
        marginTop: 15,
    },
    btn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
        borderRadius: 15
    },
    text: {
        color: 'black',
    },
    btnFloating: {
        position: 'absolute',
        bottom: 5,
        right: 10,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        borderRadius: 585,
        width: '17%',
        height: '10%',
        borderWidth: 1,
        borderColor: '#0A1A40',
    },
    addMenu: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 15,
        padding: 15,
        width: '85%',
        height: '55%',
        position: 'absolute',
        top: '8%',
        left: '8%'
    },
    hero: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingBottom: 10,
        paddingTop: 10,
    },
    btnEnviar: {
        marginTop: 15,
        borderRadius: 15,
        backgroundColor: '#0A1A40',
        padding: 15,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
})