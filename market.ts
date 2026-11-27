export type Coin={symbol:string;price:number;change24h:number;volume24h:number};
const API="https://sckt5-dev.suncrypto.in/api";
const n=(v:unknown)=>{const x=typeof v==="number"?v:Number(v);return Number.isFinite(x)?x:0;};
export async function getMarketCoins():Promise<Coin[]>{
 const r=await fetch(`${API}/tickerArr`,{headers:{Accept:"application/json"}});
 if(!r.ok)throw new Error(`HTTP ${r.status}`);
 const body:any=await r.json();
 const rows=Array.isArray(body)?body:Array.isArray(body?.data)?body.data:[];
 return rows.map((x:any)=>{const raw=String(x.s??x.symbol??x.market??"");return {symbol:raw.replace(/[-_/]?(INR|USDT)$/i,"").toUpperCase(),price:n(x.c??x.price??x.lastPrice),change24h:n(x.P??x.change24h??x.priceChangePercent),volume24h:n(x.q??x.v??x.quoteVolume??x.volume)};}).filter((x:Coin)=>x.symbol.length>0&&x.price>0);
}