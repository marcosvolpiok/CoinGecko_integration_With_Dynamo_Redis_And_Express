const fiatCoins = ['eur', 'usd', 'ars'];
const fetch = require('node-fetch');
const {
  cacheHelperOb
} = require('./dependencies/');

async function main() {
  await asyncForEach(fiatCoins, async (fiatCoin) => {
    let responseMarketsSize = 1;
    await cacheHelperOb.setCache(fiatCoin, '');

    for(i=1; responseMarketsSize > 0; i++){
      let cache = await cacheHelperOb.getCache(fiatCoin);
      if(cache) {
        cache = JSON.parse(cache);
      } else {
        cache = [];
      }

      const responseMarkets = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCoin}&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`);
      const responseMarketsJson = await responseMarkets.json();
      responseMarketsSize = responseMarketsJson.length;

      let arrJsonFormat = [];
      responseMarketsJson.forEach( (response) => {
        const jsonFormat = {
          id: response.id,
          symbol: response.symbol,
          name: response.name,
          image: response.image,
          current_price: response.current_price,
          last_updated: response.last_updated
        }
        arrJsonFormat.push(jsonFormat);
      });
      cache.push(...arrJsonFormat);
      await cacheHelperOb.setCache(fiatCoin, JSON.stringify(cache));
      await delay(10000);
    }
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}


main();