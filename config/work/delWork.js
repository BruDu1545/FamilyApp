import { supabase } from "../lib/supabase";

export async function delWork(id) {
  const { error } = await supabase.from("works").delete().eq("id", id);

  if (error) {
    return { success: false, message: error?.message || "Erro ao deletar" };
  }

  return { success: true, message: "ok!", data };
}
