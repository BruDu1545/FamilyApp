import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getLoggedUser() {
  const jsonValue = await AsyncStorage.getItem("@user");
  return jsonValue ? JSON.parse(jsonValue) : null;
}
