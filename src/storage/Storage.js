import * as SecureStore from 'expo-secure-store';

export async function getToken(key) {
    const result = await SecureStore.getItemAsync(key);
    return result;
}

export async function setToken(key, value){
    await SecureStore.setItemAsync(key, value);
}


export async function removeToken(key) {
    // return SecureStore.deleteItemAsync(key);
    const result = await SecureStore.setItemAsync(key,null);
    return result;
  }