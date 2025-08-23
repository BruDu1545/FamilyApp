import { supabase } from "../lib/supabase";

export async function delItens(id) {
  const { error } = await supabase.from("shopping").delete().eq("id", id);

  if (error) {
    return { success: false, message: error?.message || "Erro ao deletar" };
  }

  return { success: true, message: "ok" };
}
