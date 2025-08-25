// config/addWork.ts
import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function addItens(name, type) {
  try {
    const jsonValue = await AsyncStorage.getItem("@user");
    const user = jsonValue ? JSON.parse(jsonValue) : null;
    const userId = user?.id;

    let data, error;

    if (type) {
      ({ data, error } = await supabase
        .from("shopping")
        .insert([{ name: name, created_by: userId, type: 1 }])
        .select()
        .single())
    } else {
      ({ data, error } = await supabase
        .from("shopping")
        .insert([{ name: name, created_by: userId, type: 0 }])
        .select()
        .single())
    }

    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: "Item adicionado!", item: data };
  } catch (e) {
    return { success: false, message: e?.message ?? "Erro inesperado" };
  }
}
