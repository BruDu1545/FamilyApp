import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getWork() {
  const jsonValue = await AsyncStorage.getItem("@user");
  const user = jsonValue ? JSON.parse(jsonValue) : null;
  const userId = user?.id;

  const { data, error } = await supabase
    .from("works")
    .select("*")
    .in("for", [0, userId]);

  if (error || !data) {
    return { success: false, message: error?.message || "Erro ao buscar" };
  }

  return { success: true, message: "ok!", data };
}
