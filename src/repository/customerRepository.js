const Interface = require('es6-interface');
const baseRepository = require('./baseRepository');

class customerRepository extends Interface(baseRepository) {
    constructor(AWS, config) {
        super();
        this.AWS=AWS;
        this.AWS.config.update({
            region: 'us-east-2',
            accessKeyId: config.AWS_ACCESS_KEY_ID,
            secretAccessKey: config.AWS_SECRET_ACCESS_KEY});
        this.docClient = new this.AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
        this.ddb = new this.AWS.DynamoDB({apiVersion: '2012-08-10'});
        this.table = 'users';
    }

    async findByUserName (userName) {
        console.log('userName', userName);

        const customer = await this.ddb.getItem({
            TableName: this.table,
            Key: {
              'username': {S: userName}
            },
            ProjectionExpression: 'first_name, last_name, username, favorite_coin, password'
          }).promise();

        return customer;
    }    

    async add (params) {
        var params = {
            TableName: this.table,
            Item: {
                'first_name': params.first_name,
                'last_name': params.last_name,
                'username': params.username,
                'password': params.password,
                favorite_coin: null
            }
          };
          const result = await this.docClient.put(params).promise();

          return result
    }

    update (params) {
    }

    list (req) {
    }

    async delete (params) {
    }
}

module.exports = customerRepository;