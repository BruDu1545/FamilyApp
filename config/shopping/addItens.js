// config/addWork.ts
import { supabase } from "../lib/supabase";

export async function addItens(name) {
  try {
    const { data, error } = await supabase
      .from("shopping")        
      .insert([{ name: name, created_by: 1 }])   
      .select()                     
      .single();                   

    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: "Item adicionado!", item: data };
  } catch (e) {
    return { success: false, message: e?.message ?? "Erro inesperado" };
  }
}
