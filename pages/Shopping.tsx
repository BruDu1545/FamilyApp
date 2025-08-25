import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Button, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import Header from "../components/Header";
import Footer from "../components/Footer";

import { addItens } from '../config/shopping/addItens';
import { getItens } from '../config/shopping/getItens';
import PopUp from "../components/PopUp";
import { delItens } from "../config/shopping/delIten";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { checkIten } from "../config/shopping/checkIten";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Shopping({ navigation }) {

    const [newItem, setNewIten] = useState('')

    type ShoppingItem = { id: number; name: string, check: number };

    const [list, setList] = useState<ShoppingItem[]>([]);
    const [popUpVisible, setPopUpVisible] = useState(false);
    const [popUpData, setPopUpData] = useState({ isTrue: false, text: "Erro interno no servidor!" });
    const [addMenu, SetAddMenu] = useState(false);
    const [typeMenu, setTypeMenu] = useState(1);

    async function reloadItens(type) {
        const itens = await getItens(type);
        if (itens?.success) {
            const rows = itens.data as any[];
            setList(
                rows.map((r) => ({
                    id: r.id,
                    check: r.check,
                    name: (r.name ?? r.item ?? "").trim(),
                }))
            );
        } else {
            setPopUpVisible(true);
            setPopUpData({ isTrue: true, text: itens?.message ?? "Erro ao carregar a lista" });
            setTimeout(() => setPopUpVisible(false), 3000);
        }
    }

    const addIten = async () => {
        if (newItem) {
            const result = await addItens(newItem.trim(), typeMenu)
            if (result?.success) {
                const itens = await getItens();
                const rows = itens.data as any[];
                if (rows.length > 0) {
                    setList(
                        rows.map((r) => ({
                            id: r.id,
                            check: r.check,
                            name: (r.name ?? r.item ?? "").trim(),
                        }))
                    );
                }
                setNewIten('');
                closeAddMenu()
            } else {
                setPopUpVisible(true)
                setPopUpData({ isTrue: false, text: result.message })
                const timer = setTimeout(() => {
                    setPopUpVisible(false)
                }, 3000)
            }
        }
    }

    const handleDelete = async (id: number) => {
        const results = await delItens(id)
        if (results?.success) {
            reloadItens(typeMenu)
        } else {
            console.log(results.message)
        }
    }

    const openFamily = async () => {
        setTypeMenu(1)
        await reloadItens(1)
    }

    const openPessoal = async () => {
        setTypeMenu(0)
        await reloadItens(0);
    };

    const heandleCheck = async (id: number) => {
        const result = await checkIten(id);
        if (!result.success) {
            setPopUpVisible(true)
            setPopUpData({ isTrue: true, text: result.message })
            const timer = setTimeout(() => {
                setPopUpVisible(false)
            }, 3000)
        } else {
            reloadItens(typeMenu)
        }
    }

    useEffect(() => {
        reloadItens(1)
    }, []);

    const openAddMenu = () => {
        SetAddMenu(true)
    }

    const closeAddMenu = () => {
        SetAddMenu(false)
    }

    return <>
        <Header title="Shopping" navigation={navigation} />
        <View style={style.grid}>
            <Text style={style.title}>Lista de compras</Text>
            <View style={style.changeList}>
                <TouchableOpacity style={[style.btns, { backgroundColor: typeMenu === 1 ? '#ffbb00ff' : 'white' }]} onPress={openFamily}>
                    <FontAwesome name="users" size={24} color="green" />
                    <Text style={style.text}>
                        Familia
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[style.btns, { backgroundColor: typeMenu === 0 ? '#ffbb00ff' : 'white' }]} onPress={openPessoal}>
                    <FontAwesome name="user" size={24} color="green" />
                    <Text style={style.text}>
                        Pessoal
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={list}
                keyExtractor={(it) => String(it.id)}
                renderItem={({ item }) => (
                    <View style={style.row}>
                        <View style={style.btnCheck}>
                            <TouchableOpacity style={style.trash} onPress={() => heandleCheck(item.id)}>
                                <AntDesign name="checkcircle" size={24} color="green" />
                            </TouchableOpacity>
                            <Text style={[style.iten, { color: item.check === 1 ? "green" : "black" }]}>{item.name}</Text>
                        </View>
                        <TouchableOpacity style={style.trash} onPress={() => handleDelete(item.id)}>
                            <Ionicons name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={style.btnFloating} onPress={() => openAddMenu()}>
                <AntDesign name="plus" size={45} color="#0A1A40" />
            </TouchableOpacity>
            <TouchableOpacity style={[style.overlay, { display: addMenu ? 'flex' : 'none' }]} onPress={() => closeAddMenu()}></TouchableOpacity>
            <View style={[style.addMenu, { display: addMenu ? 'flex' : 'none' }]}>
                <View style={style.hero}>
                    <Image source={require('../assets/cesta.png')} style={{ width: 150, height: 133 }}></Image>
                </View>
                <Text style={[style.title, { color: "black" }]}>
                    Adicionar Itens
                </Text>
                <TextInput style={style.input} onChangeText={setNewIten} placeholder='Digite aqui...' value={newItem} placeholderTextColor="#aaa" />
                <TouchableOpacity style={style.btnEnviar} onPress={() => addIten()}>
                    <Text style={[style.text, { color: "white" }]}>
                        Enviar
                    </Text>
                </TouchableOpacity >
            </View>
        </View>
        <PopUp visible={popUpVisible} onClose={() => setPopUpVisible(false)} isTrue={popUpData.isTrue} text={popUpData.text} />
        <Footer select="Shopping" navigation={navigation} />
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
        marginTop: 15,
        marginBottom: 15
    },
    changeList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    btns: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        backgroundColor: 'white',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 15
    },
    text: {
        fontWeight: 'bold'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: 15
    },
    btnCheck: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    iten: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    trash: {
        borderRadius: 15,
        padding: 10,
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
        width: '18%',
        height: '10%',
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
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 15,
        marginTop: 15,
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