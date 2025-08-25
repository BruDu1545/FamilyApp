import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getItens(type) {
  const jsonValue = await AsyncStorage.getItem("@user");
  const user = jsonValue ? JSON.parse(jsonValue) : null;
  const userId = user?.id;

  let query = supabase.from("shopping").select("*");

  if (type == 1) {
    query = query.eq("type", 1);
  } else {
    query = query.eq("type", 0).eq("created_by", userId);
  }

  const { data, error } = await query;

  if (error || !data) {
    return { success: false, message: error?.message || "Erro ao buscar" };
  }

  return { success: true, message: "ok!", data };
}
