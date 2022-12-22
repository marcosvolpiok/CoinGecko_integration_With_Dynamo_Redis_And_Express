const Interface = require('es6-interface');
const baseRepository = require('./baseRepository');

class cotizationRepository extends Interface(baseRepository) {
    constructor(cacheClient) {
        super();
        this.cacheClient = cacheClient;
        this.fiatCoins = ['eur', 'usd', 'ars'];
    }

    async listAll () {
        let json = {};
        
        await this.asyncForEach(this.fiatCoins, async (fiatCoin) => {    
            const cache = await this.cacheClient.getCache(fiatCoin);
            if(cache) {
                json[fiatCoin] = JSON.parse(cache);
            } else {
                throw new Error('You need to run the bot');
            }
        });

        return json;
    }    

    async add (params) {
    }

    update (params) {
    }

    list (req) {
    }

    async delete (params) {
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
    }    
}

module.exports = cotizationRepository;