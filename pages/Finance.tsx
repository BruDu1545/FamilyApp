import React, { useCallback, useEffect, useState } from "react";

import { Text, View, StyleSheet, FlatList, Image, TextInput, Button, TouchableOpacity } from 'react-native';

import Header from "../components/Header";
import Footer from "../components/Footer";
import PopUp from "../components/PopUp";


import { getMoney } from "../config/finance/getMoney";
import { setMoney } from "../config/finance/setMoney";
import { getExpenses } from "../config/finance/getExpenses";
import { delExpanses } from "../config/finance/delExpanses";
import { addExpanses } from "../config/finance/addExpanses";
import { getAllExpenses } from "../config/finance/getAllExpanses";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Finance({ navigation }) {

    const [userId, setUserName] = useState<number>(0);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("@user");
                if (jsonValue) {
                    const user = JSON.parse(jsonValue);
                    setUserName(user.id);
                } else {
                    setUserName(0);
                }
            } catch (error) {
                console.error("Erro ao ler usuário", error);
                setUserName(0);
            }
        };

        loadUser();
    }, []);

    const [pessoal, setPessoal] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    let miniTotal = 0;

    const [popUpVisible, setPopUpVisible] = useState(false);
    const [popUpData, setPopUpData] = useState({ isTrue: false, text: "Erro interno no servidor!" });

    const [newValue, setNewValue] = useState<String>('');
    const [typeList, setTypeList] = useState<String>('Familia');

    const getMyFinace = async () => {
        const resp = await getMoney(userId)
        if (resp.success) {
            setPessoal(resp.data[0].value)
        }
    }

    const getAllFinance = useCallback(async () => {
        const resp = await getMoney(null);
        if (resp?.success && Array.isArray(resp.data)) {
            const soma = resp.data.reduce((acc: number, it: any) => acc + Number(it.value || 0), 0);
            setTotal(soma);
        } else {
            setTotal(0);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const loadData = async () => {
                await getMyFinace();
                await getAllFinance();
                await sumAllExpanses()
                await reloadItens(typeList === 'Familia' ? 1 : 0);
            }
            loadData();
        }
    }, [userId]);

    const handlePutValue = async () => {
        const result = await setMoney(userId, newValue);
        if (result.success) {
            await getMyFinace();
            await getAllFinance();
            await reloadItens(typeList === "Familia" ? 1 : 0);
        }
    }

    type FinacesType = { id: number, value: number; descp: string };

    const [list, setList] = useState<FinacesType[]>([]);

    async function reloadItens(mode: number) {
        const itens = await getExpenses(userId, mode);
        if (itens?.success) {
            const rows = Array.isArray(itens.data) ? itens.data : [itens.data];
            setList(
                rows.map((r) => ({
                    id: r.id,
                    value: r.value,
                    descp: (r.descp ?? "").trim(),
                }))
            );
        } else {
            setPopUpVisible(true);
            setPopUpData({ isTrue: true, text: itens?.message ?? "Erro ao carregar a lista" });
            setTimeout(() => setPopUpVisible(false), 3000);
        }
    }

    const handleDelete = async (id: number) => {
        const results = await delExpanses(id)
        if (results?.success) {
            await reloadItens(typeList === "Familia" ? 1 : 0);
            console.log('ojk')
        } else {
            console.log(results.message)
        }
    }

    const [newExpanses, setNewExpanses] = useState<String>('');
    const [newExpansesValue, setNewExpansesValue] = useState<String>('');

    const headleAddExpanses = async () => {
        const result = await addExpanses(newExpanses, newExpansesValue, userId)
        if (result.success) {
            reloadItens(1)
            setNewExpanses('')
            setNewExpansesValue('')
            closeAddMenu()
        } else {
            console.log(result.message)
        }
    }

    const swapMode = async () => {
        const newMode = typeList === 'Familia' ? "Pessoal" : 'Familia';
        setTypeList(newMode);
        await getMyFinace();
        await getAllFinance();
        await sumAllExpanses(true)
        await sumAllExpanses()
        setMode(!mode)
        await reloadItens(newMode === 'Familia' ? 1 : 0);
    };

    const [addMenu, SetAddMenu] = useState(false);

    const openAddMenu = () => {
        SetAddMenu(true)
    }
    const closeAddMenu = () => {
        SetAddMenu(false)
    }

    const sumAllExpanses = async (type = false) => {
        const rst = await getAllExpenses(type);

        if (rst?.success) {
            let soma = rst.data.reduce((acc, item) => acc + Number(item.value), 0);
            if (!type) {
                setDespesas(soma);
            } else {
                setDespesasPessoal(soma);
            }
        } else {
            console.log("Erro ao buscar despesas:", rst.message);
            return 0;
        }
    };

    const [despesas, setDespesas] = useState<number>(0);
    const [despesasPessoal, setDespesasPessoal] = useState<number>(0);
    const [resto, setResto] = useState<number>(0);
    const [restoMy, setRestoMy] = useState<number>(0);
    const [mode, setMode] = useState<Boolean>(true);

    useEffect(() => {
        setResto(total - despesas);
    }, [total, despesas]);

    useEffect(() => {
        setRestoMy(pessoal - despesasPessoal);
    }, [pessoal, despesasPessoal]);

    return <>
        <Header title="Finance" navigation={navigation} />
        <View style={style.grid}>
            <View style={style.topBar}>
                <View style={[style.row, { display: mode ? 'flex' : 'none' }]}>
                    <View style={style.column}>
                        <Text style={style.titleMoney}>Familia</Text>
                        <Text style={[style.money, { color: total > 0 ? 'green' : 'red' }]}>R$ {total}</Text>
                    </View>
                    <View style={style.column}>
                        <Text style={style.titleMoney}>Despesas</Text>
                        <Text style={[style.money, { color: 'red' }]}>R$ {despesas}</Text>
                    </View>
                    <View style={style.column}>
                        <Text style={style.titleMoney}>Resto</Text>
                        <Text style={[style.money, { color: resto > 0 ? 'green' : 'red' }]}>R$ {resto}</Text>
                    </View>
                </View>
                <View style={[style.row, { display: !mode ? 'flex' : 'none' }]}>
                    <View style={style.column}>
                        <Text style={style.titleMoney}>Pessoal</Text>
                        <Text style={[style.money, { color: pessoal > 0 ? 'green' : 'red' }]}>R$ {pessoal}</Text>
                    </View>
                    <View style={style.column}>
                        <Text style={style.titleMoney}>Despesas</Text>
                        <Text style={[style.money, { color: 'red' }]}>R$ {despesasPessoal}</Text>
                    </View>
                    <View style={style.column}>
                        <Text style={style.titleMoney}>Resto</Text>
                        <Text style={[style.money, { color: restoMy > 0 ? 'green' : 'red' }]}>R$ {restoMy}</Text>
                    </View>
                </View>
                <View style={style.rowInput}>
                    <TextInput onChangeText={setNewValue} style={style.input} placeholder='Digite aqui seu salario...' placeholderTextColor="#aaa" />
                    <TouchableOpacity style={style.btn} onPress={handlePutValue}>
                        <Text style={style.btnText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={style.changeList}>
                <TouchableOpacity style={style.changeBtns} onPress={swapMode}>
                    <FontAwesome name={typeList === 'Familia' ? "users" : "user"} size={24} color="green" />
                    <Text style={style.changeText}>
                        {typeList}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={style.list}>
                <FlatList
                    data={list}
                    keyExtractor={(it) => String(it.id)}
                    renderItem={({ item }) => (
                        <View style={style.rowF}>
                            <View style={style.row}>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={style.descp}>{item.descp}</Text>
                                <Text style={style.value}>R${item.value}</Text>
                            </View>
                            <TouchableOpacity style={style.trash} onPress={() => handleDelete(item.id)}>
                                <Ionicons name="trash" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            <TouchableOpacity style={style.btnFloating} onPress={() => openAddMenu()}>
                <AntDesign name="plus" size={45} color="#0A1A40" />
            </TouchableOpacity>
            <TouchableOpacity style={[style.overlay, { display: addMenu ? 'flex' : 'none' }]} onPress={() => closeAddMenu()}></TouchableOpacity>
            <View style={[style.addMenu, { display: addMenu ? 'flex' : 'none' }]}>
                <View style={style.hero}>
                    <Image source={require('../assets/money.png')} style={{ width: 150, height: 150 }}></Image>
                </View>
                <Text style={[style.title, { color: "black" }]}>
                    Adicionar Itens
                </Text>
                <TextInput style={style.inputF} onChangeText={setNewExpanses} placeholder='Descrição...' value={newExpanses} placeholderTextColor="#aaa" />
                <TextInput style={style.inputF} onChangeText={setNewExpansesValue} placeholder='Valor...' value={newExpansesValue} placeholderTextColor="#aaa" />
                <TouchableOpacity style={style.btnEnviar} onPress={() => headleAddExpanses()}>
                    <Text style={[style.text, { color: "white" }]}>
                        Enviar
                    </Text>
                </TouchableOpacity >
            </View>
        </View>
        <PopUp visible={popUpVisible} onClose={() => setPopUpVisible(false)} isTrue={popUpData.isTrue} text={popUpData.text} />
        <Footer select="Finance" navigation={navigation} />
    </>
}

const style = StyleSheet.create({
    grid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        gap: 35,
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleMoney: {
        color: 'white',
        fontSize: 22,
    },
    money: {
        color: 'green',
        fontSize: 25,
        fontWeight: 'bold'
    },
    input: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        padding: 5,
        color: 'white'
    },
    rowInput: {
        display: 'flex',
        flexDirection: 'row',
        gap: 30,
        marginTop: 15
    },
    btn: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        padding: 15,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold'
    },
    changeList: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    changeBtns: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        backgroundColor: 'white',
        padding: 10,
        paddingLeft: 80,
        paddingRight: 80,
        borderRadius: 15
    },
    changeText: {
        fontWeight: 'bold'
    },
    list: {
        marginTop: 25,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'white',
        height: '53.5%',
        width: '80%',
        padding: 15
    },
    iten: {

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
        height: '60%',
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
    title: {

    },
    text: {

    },
    inputF: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 15,
        marginTop: 15,
    },
    descp: {
        color: 'white',
        fontSize: 15,
        flexWrap: 'wrap'
    },
    value: {
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold'
    },
    rowF: {
        display: 'flex',
        flexDirection: 'row',
        gap: 35,
        justifyContent: 'space-between',
        marginTop: 5
    }
})