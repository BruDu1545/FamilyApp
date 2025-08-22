import React, { useState } from "react";
import { Button, FlatList, Text, TextInput, View, StyleSheet } from 'react-native';

import Header from "../components/Header";
import Footer from "../components/Footer";

import { addWork } from '../config/work/addWork';
import { getWork } from '../config/work/getWork';
import PopUp from "../components/PopUp";
import { delWork } from "../config/work/delWork";
import { doneWork } from "../config/work/doneWork";


export default function Works({ navigation }) {
    const [newWork, setNewWork] = useState('')

    type WorkList = { id: number; title: string };

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
            console.log('calma vai ser apagado')
            reloadItens()
        } else {
            console.log(results.message)
        }
    }

    const handleDone = async (id: number) => {
        const results = await doneWork(id)
        if (results?.success) {
            console.log('calma vai ser atualizado')
            reloadItens()
        } else {
            console.log(results.message)
        }
    }

    return <>
        <Header title="Works" navigation={navigation} />
        <Text style={style.title}>Trabalhos da casa</Text>
        <View style={style.grid}>
            <FlatList
                data={list}
                keyExtractor={(it) => String(it.id)}
                renderItem={({ item }) => (
                    <View style={style.row}>
                        <Text style={[style.iten, { color: item.status === 1 ? 'green' : 'white' }]} >{item.title}</Text>
                        <Button color="green" title="Feito" onPress={() => handleDone(item.id)} />
                        <Button color="red" title="Excluir" onPress={() => handleDelete(item.id)} />
                    </View>
                )}
            />
            <View>
                <TextInput style={style.input} onChangeText={setNewWork} placeholder='Digite aqui...' value={newWork} placeholderTextColor="#aaa" />
                <View style={style.btn}>
                    <Button onPress={addWorks} title={'Enviar'}></Button>
                </View>
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
    list: {
        margin: 15,
        marginTop: 365
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
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