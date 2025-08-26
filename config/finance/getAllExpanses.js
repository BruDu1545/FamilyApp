import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getAllExpenses(type) {
  const jsonValue = await AsyncStorage.getItem("@user");
  const user = jsonValue ? JSON.parse(jsonValue) : null;
  const userId = user?.id;

  let query;

  if (type) {
    query = supabase.from("expenses").select("value").eq("created_by", userId);
  } else {
    query = supabase.from("expenses").select("value");
  }

  const { data, error } = await query;

  if (error) {
    return { success: false, message: error?.message || "Erro ao buscar" };
  }

  return { success: true, message: "ok!", data };
}
