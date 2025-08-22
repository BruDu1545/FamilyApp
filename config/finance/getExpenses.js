import { supabase } from "../lib/supabase";

export async function getExpenses(id) {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("created_by", id)

  if (error) {
    return { success: false, message: error?.message || "Erro ao buscar" };
  }

  return { success: true, message: "ok!", data: data };
}
