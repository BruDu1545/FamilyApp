import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Button, TextInput, FlatList } from 'react-native';
import Header from "../components/Header";
import Footer from "../components/Footer";

import { addItens } from '../config/shopping/addItens';
import { getItens } from '../config/shopping/getItens';
import PopUp from "../components/PopUp";
import { delItens } from "../config/shopping/delIten";


export default function Shopping({ navigation }) {

    const [newItem, setNewIten] = useState('')

    type ShoppingItem = { id: number; name: string };

    const [list, setList] = useState<ShoppingItem[]>([]);
    const [popUpVisible, setPopUpVisible] = useState(false);
    const [popUpData, setPopUpData] = useState({ isTrue: false, text: "Erro interno no servidor!" });

    async function reloadItens() {
        const itens = await getItens();
        if (itens?.success) {
            const rows = itens.data as any[];
            setList(
                rows.map((r) => ({
                    id: r.id,
                    name: (r.name ?? r.item ?? "").trim(),
                }))
            );
        } else {
            setPopUpVisible(true);
            setPopUpData({ isTrue: true, text: itens?.message ?? "Erro ao carregar a lista" });
            setTimeout(() => setPopUpVisible(false), 3000);
        }
    }
    reloadItens()

    const addIten = async () => {
        if (newItem) {
            const result = await addItens(newItem.trim())
            if (result?.success) {
                // setList([...list, newItem.trim()]);
                // setNewIten('');
                const itens = await getItens();
                const rows = itens.data as any[];
                setList(
                    rows.map((r) => ({
                        id: r.id,
                        name: (r.name ?? r.item ?? "").trim(),
                    }))
                );
                setNewIten('');
            } else {
                setPopUpVisible(true)
                setPopUpData({ isTrue: true, text: result.message })
                const timer = setTimeout(() => {
                    setPopUpVisible(false)
                }, 3000)
            }
        }
    }
    const handleDelete = async (id: number) => {
        const results = await delItens(id)
        if (results?.success) {
            console.log('calma vai ser apagado')
            reloadItens()
        } else {
            console.log(results.message)
        }
    }

    return <>
        <Header title="Shopping" navigation={navigation} />
        <Text style={style.title}>Lista de compras</Text>
        <View style={style.grid}>
            <FlatList
                data={list}
                keyExtractor={(it) => String(it.id)}
                renderItem={({ item }) => (
                    <View style={style.row}>
                        <Text style={style.iten}>{item.name}</Text>
                        <Button title="Excluir" onPress={() => handleDelete(item.id)} />
                    </View>
                )}
            />
            <View>
                {/* <Text style={style.label}>Insira o item:</Text> */}
                <TextInput style={style.input} onChangeText={setNewIten} placeholder='Digite aqui...' value={newItem} placeholderTextColor="#aaa" />
                <View style={style.btn}>
                    <Button onPress={addIten} title={'Enviar'}></Button>
                </View>
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
    },
    list: {
        margin: 15,
        marginTop: 365
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    iten: {
        color: 'white',
        fontSize: 20,
        marginTop: 15
    },
    input: {
        color: 'white',
        borderWidth: 1,
        borderColor: '#fff',
        marginBottom: 15
    },
    btn: {},
})