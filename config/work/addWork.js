import { supabase } from "../lib/supabase";

export async function addWork(name) {
  try {
    const { data, error } = await supabase
      .from("works")        
      .insert([{ title: name, created_by: 1, status: 0 }])   
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
