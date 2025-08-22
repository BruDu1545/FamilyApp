import { supabase } from "../lib/supabase";

export async function doneWork(id) {
  const { error } = await supabase.from("works")
    .update({ status: 1 })  
    .eq("id", id)              
    .select();

  if (error) {
    return { success: false, message: error?.message || "Erro ao atualizar" };
  }

  return { success: true, message: "ok!", data };
}
