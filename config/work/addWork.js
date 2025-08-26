import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function addWork(name, option) {
  const jsonValue = await AsyncStorage.getItem("@user");
  const user = jsonValue ? JSON.parse(jsonValue) : null;
  const userId = user?.id;

  try {
    const { data, error } = await supabase
      .from("works")
      .insert([{ title: name, for: option, created_by: userId, status: 0 }])
      .select()
      .single();

    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: "tarefa adicionada!", item: data };
  } catch (e) {
    return { success: false, message: e?.message ?? "Erro inesperado" };
  }
}
