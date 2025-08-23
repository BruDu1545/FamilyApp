import { supabase } from "../lib/supabase";

export async function checkIten(id) {
    const { data, error } = await supabase
        .from("shopping")
        .select("check")
        .eq('id', id)
        .single();
    if (data.check == 1) {
        const { error } = await supabase.from("shopping")
            .update({ check: 0 })
            .eq("id", id)
            .select();
    } else {
        const { error } = await supabase.from("shopping")
            .update({ check: 1 })
            .eq("id", id)
            .select();
    }


    if (error) {
        return { success: false, message: error?.message || "Erro ao atualizar" };
    }

    return { success: true, message: "ok!", data };
}
