import { supabase } from "../lib/supabase";

export async function getAllExpenses() {
  let query = supabase.from("expenses").select("value");

  const { data, error } = await query;

  if (error) {
    return { success: false, message: error?.message || "Erro ao buscar" };
  }

  return { success: true, message: "ok!", data: data };
}
