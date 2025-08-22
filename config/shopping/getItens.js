import { supabase } from "../lib/supabase";

export async function getItens() {
  const { data, error } = await supabase
    .from("shopping")
    .select("*");

  if (error || !data) {
    return { success: false, message: error?.message || "Erro ao buscar" };
  }

  return { success: true, message: "ok!", data };
}
