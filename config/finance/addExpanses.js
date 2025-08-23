import { supabase } from "../lib/supabase";

export async function addExpanses(name, value, by) {
  try {
    const { data, error } = await supabase
      .from("expenses")
      .insert([{ descp: name, value: value, created_by: by }])
      .select();

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: "Item adicionado!", item: data[0] };
  } catch (e) {
    return { success: false, message: e?.message ?? "Erro inesperado" };
  }
}
