import { supabase } from "../lib/supabase";

export async function getMoney(id) {
  if (id) {
    const { data, error } = await supabase
      .from("salaries")
      .select("value")
      .eq("id", id);

    if (error) {
      return { success: false, message: error?.message || "Erro ao buscar" };
    }

    return { success: true, message: "ok!", data: data };
  } else {
    const { data, error } = await supabase
      .from("salaries")
      .select("value")

    if (error) {
      return { success: false, message: error?.message || "Erro ao buscar" };
    }

    return { success: true, message: "ok!", data: data };
  }
}
