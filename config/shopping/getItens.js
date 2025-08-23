import { supabase } from "../lib/supabase";

export async function getItens(type, userId) {
  let query = supabase.from("shopping").select("*");

  if (type === 1 && userId) {
    query = query.eq("created_by", userId);
  }

  const { data, error } = await query;

  if (error || !data) {
    return { success: false, message: error?.message || "Erro ao buscar" };
  }

  return { success: true, message: "ok!", data };
}
