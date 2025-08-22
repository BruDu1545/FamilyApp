import { supabase } from "../lib/supabase";

export async function getWork() {
  const { data, error } = await supabase
    .from("works")
    .select("*");

  if (error || !data) {
    return { success: false, message: error?.message || "Erro ao buscar" };
  }

  return { success: true, message: "ok!", data };
}
