import { supabase } from "./lib/supabase";

export async function testConnection() {
  const { data, error } = await supabase.from("users").select("*").limit(1);

  if (error) {
    console.log("❌ Erro de conexão:", error.message);
  } else {
    console.log("✅ Conexão ok, primeira linha:", data);
  }
}
