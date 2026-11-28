import AsyncStorage from "@react-native-async-storage/async-storage";
const KEY="freedom-paper-trades-v1";
export async function readTrades():Promise<any[]>{try{return JSON.parse((await AsyncStorage.getItem(KEY))||"[]");}catch{return[];}}
export async function addTrade(t:any){const a=await readTrades();a.unshift({...t,id:String(Date.now()),createdAt:new Date().toISOString()});await AsyncStorage.setItem(KEY,JSON.stringify(a.slice(0,300)));}
