import React, { useCallback, useEffect, useState } from "react";

import { Text, View, StyleSheet, FlatList, TextInput, Button } from 'react-native';

import Header from "../components/Header";
import Footer from "../components/Footer";
import PopUp from "../components/PopUp";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { getMoney } from "../config/finance/getMoney";
import { setMoney } from "../config/finance/setMoney";
import { getExpenses } from "../config/finance/getExpenses";
import { delExpanses } from "../config/finance/delExpanses";


export default function Finance({ navigation }) {
    const [userId, setUserId] = useState<number>(0);
    const [pessoal, setPessoal] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    let miniTotal = 0;

    const [popUpVisible, setPopUpVisible] = useState(false);
    const [popUpData, setPopUpData] = useState({ isTrue: false, text: "Erro interno no servidor!" });

    const [newValue, setNewValue] = useState<number>(0);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("@user");
                if (jsonValue) {
                    const user = JSON.parse(jsonValue);
                    setUserId(user.id);
                } else {
                    setUserId(0);
                }
            } catch (error) {
                console.error("Erro ao ler usuário", error);
                setUserId(0);
            }
        };

        loadUser();
    }, []);

    const getMyFinace = async () => {
        const resp = await getMoney(userId)
        if (resp.success) {
            setPessoal(resp.data[0].value)
        }
    }
    getMyFinace()

    const getAllFinance = useCallback(async () => {
        const resp = await getMoney(null);
        if (resp?.success && Array.isArray(resp.data)) {
            const soma = resp.data.reduce((acc: number, it: any) => acc + Number(it.value || 0), 0);
            setTotal(soma);
        } else {
            setTotal(0);
        }
    }, []);

    getMyFinace()
    getAllFinance()

    const handlePutValue = () => {
        if (Number(newValue) || newValue === 0) {
            setMoney(userId, newValue)
            getMyFinace()
            getAllFinance()
        }
    }

    type FinacesType = { id: number, value: number; descp: string };

    const [list, setList] = useState<FinacesType[]>([]);

    async function reloadItens() {
        const itens = await getExpenses(userId);
        if (itens?.success) {
            const rows = itens.data as any[];
            setList(
                rows.map((r) => ({
                    id: r.id,
                    value: r.value,
                    descp: (r.descp ?? r.descp ?? "").trim(),
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
        const results = await delExpanses(id)
        if (results?.success) {
            reloadItens()
        } else {
            console.log(results.message)
        }
    }


    return <>
        <Header title="Finance" navigation={navigation} />
        <View style={style.grid}>
            <View style={style.grid}>
                <Text style={[style.texts, { color: total > 0 ? 'green' : 'red' }]}>Total: {total}</Text>
                <Text style={[style.texts, { color: pessoal > 0 ? 'green' : 'red' }]}>Pessoal: {pessoal}</Text>
                <TextInput onChangeText={setNewValue} style={style.input} placeholder='Digite aqui seu salario...' placeholderTextColor="#aaa" />
                <Button onPress={handlePutValue} title={'Enviar'}></Button>
            </View>
            <View style={style.grid}>
                <FlatList
                    data={list}
                    keyExtractor={(it) => String(it.id)}
                    renderItem={({ item }) => (
                        <View style={style.row}>
                            <Text style={style.iten}>{item.descp} - R${item.value}</Text>
                            <Button title="Excluir" onPress={() => handleDelete(item.id)} />
                        </View>
                    )}
                />
            </View>
            <View style={style.grid}>
                <TextInput style={style.input} placeholder='Digite aqui...' placeholderTextColor="#aaa" />
                <View style={style.btn}>
                    <Button title={'Enviar'}></Button>
                </View>
            </View>
        </View>
        <PopUp visible={popUpVisible} onClose={() => setPopUpVisible(false)} isTrue={popUpData.isTrue} text={popUpData.text} />
        <Footer select="Finance" navigation={navigation} />
    </>
}

const style = StyleSheet.create({
    grid: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    texts: {
        color: '#fff',
        fontSize: 25
    },
    input: {
        color: 'white',
        borderWidth: 1,
        borderColor: '#fff',
        marginBottom: 15,
        borderRadius: 15,
        padding: 15
    },
    btn: {

    },
    list: {
        margin: 15,
        marginTop: 365
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iten: {
        color: 'white',
        fontSize: 15,
        marginTop: 15
    },
})