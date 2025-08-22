import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = { id: number } & Record<string, any>;

export function useUserId(defaultId = 0) {
  const [user, setuser] = useState<number>(defaultId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const json = await AsyncStorage.getItem("@user");
      if (json) {
        const user = JSON.parse(json) as User;
        setuser(Number(user?.id ?? defaultId));
      } else {
        setuser(defaultId);
      }
      setError(null);
    } catch (e) {
      console.error("Erro ao ler usuário", e);
      setuser(defaultId);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [defaultId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await load();
    })();
    return () => {
      cancelled = true;
    };
  }, [load]);

  const setUser = useCallback(
    async (user: User | null) => {
      try {
        if (user) {
          await AsyncStorage.setItem("@user", JSON.stringify(user));
          setuser(Number(user.id ?? defaultId));
        } else {
          await AsyncStorage.removeItem("@user");
          setuser(defaultId);
        }
      } catch (e) {
        console.error("Erro ao salvar usuário", e);
        setError(e);
      }
    },
    [defaultId]
  );

  return { user, loading, error, refresh: load, setUser };
}
