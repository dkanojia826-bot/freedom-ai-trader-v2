import {Coin} from "./market";
// Preliminary watchlist ranking only; not a validated trading signal.
export function rankCoins(coins:Coin[]):Coin[]{return [...coins].filter(x=>Number.isFinite(x.change24h)&&Number.isFinite(x.volume24h)).sort((a,b)=>score(b)-score(a));}
function score(x:Coin):number{return Math.max(-20,Math.min(20,x.change24h))+Math.log10(Math.max(1,x.volume24h))*0.25;}