import { supabase } from "../lib/supabase";

export async function setMoney(id, value) {
  const { error } = await supabase
    .from("salaries")
    .update({value: value})
    .eq("by", id)
    .select();

  if (error) {
    return { success: false, message: error?.message || "Erro ao adicionar" };
  }

  return { success: true, message: "ok" };
}
