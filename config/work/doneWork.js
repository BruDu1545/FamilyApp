import { supabase } from "../lib/supabase";

export async function doneWork(id) {
  const { data, error } = await supabase
    .from("works")
    .select("status")
    .eq("id", id)
    .single();

  if (error || !data) {
    return { success: false, message: error?.message || "Erro ao buscar o registro" };
  }

  const newValue = data.status === 1 ? 0 : 1;

  const { data: updated, error: updateError } = await supabase
    .from("works")
    .update({ status: newValue })
    .eq("id", id)
    .select();

  if (updateError) {
    return { success: false, message: updateError.message || "Erro ao atualizar" };
  }

  return { success: true, message: "Status atualizado!", up: updated };
}
