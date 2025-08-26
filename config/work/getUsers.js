import { supabase } from "../lib/supabase";

export async function getUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("id, name");

  if (error || !data) {
    return { success: false, message: error?.message || "Erro ao buscar" };
  }

  return { success: true, message: "ok!", data: data };
}
