import { supabase } from "./lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function login(email, password) {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, status") 
    .eq("login", email)
    .eq("password", password) 
    .maybeSingle();

  if (error || !data) {
    return { success: false, message: "Credenciais inválidas" };
  }

  if (data.status !== true) {
    return { success: false, message: "Usuário inativo" };
  }

  const user = { id: data.id, name: data.name };

  await AsyncStorage.setItem("@user", JSON.stringify(user));

  return { success: true, message: "Login autorizado!", user };
}
