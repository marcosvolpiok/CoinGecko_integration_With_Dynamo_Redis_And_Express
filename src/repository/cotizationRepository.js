const Interface = require('es6-interface');
const baseRepository = require('./baseRepository');

class cotizationRepository extends Interface(baseRepository) {
    constructor(AWS, config, cacheClient) {
        super();
        this.cacheClient = cacheClient;
        this.fiatCoins = ['eur', 'usd', 'ars'];
        this.table = 'cotizationUser';
        this.AWS = AWS;
        this.AWS.config.update({
            region: config.AWS_REGION,
            accessKeyId: config.AWS_ACCESS_KEY_ID,
            secretAccessKey: config.AWS_SECRET_ACCESS_KEY});
        this.ddb = new this.AWS.DynamoDB({apiVersion: '2012-08-10'});
        this.docClient = new this.AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
        this.dynamodb = new this.AWS.DynamoDB();
    }

    async listAll () {
        let json = {};
        
        await this.asyncForEach(this.fiatCoins, async (fiatCoin) => {    
            const cache = await this.cacheClient.getCache(fiatCoin);
            if(cache) {
                json[fiatCoin] = JSON.parse(cache);
            } else {
                json[fiatCoin] = {'message': 'You need to run the bot to have information of this coin'};
                
            }
        });

        return json;
    }
    
    async getCotizationByUserAndFiatCoinAndCoinCode (userName, coinCode){
        const cotizationUser = await this.ddb.getItem({
            TableName: this.table,
            Key: {
              'username': {S: userName},
              'coinCode': {S: coinCode}
            },
            ProjectionExpression: 'coinCode'
          }).promise();

        return cotizationUser;
    }

    async getCoinPrice (coinId) {
        let result = [];
        
        let p = Promise.resolve();
        this.fiatCoins.forEach((fiatCoin) => {
          p = p.then(async () => {
            const cache = await this.cacheClient.getCache(fiatCoin);
            if (cache) {
              const cacheJson = JSON.parse(cache);
              const coinPrice = cacheJson.filter((coin) => coin.id == coinId);
              result.push({ [fiatCoin]: coinPrice[0] });
            }
          });
        });
        
        await p;
        


        return result;
    };

    async getCotizationByUser (userName){

        const params = {
            FilterExpression: "username = :username",
            ExpressionAttributeValues: {
              ":username": {S: userName},
            },
            ProjectionExpression: "coinCode",
            TableName: this.table,
          };

        const cotizaionsUser = await this.ddb.scan(params).promise();

        return cotizaionsUser;
    }    

    async add (params) {
        const paramsAdd = {
            TableName: this.table,
            Item: {
                'username': params.userName,
                'coinCode': params.coinCode
            }
        };

        const result = await this.docClient.put(paramsAdd).promise();
        
        return result;
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

Array.prototype.asyncForEach = async function (fn) {
    for (let i = 0; i < this.length; i++) {
      await fn(this[i], i);
    }
};

module.exports = cotizationRepository;