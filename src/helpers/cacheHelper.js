
class cacheHelper{


    constructor(createClientOb) {
      this.createClientOb = createClientOb;
      this.clientConnectionInstance = null;
      this.clientConnectionInstance = this.getClientConnectionInstance();
    }



    getClientConnection = async () => {
        const connection = await this.createClientOb({
            //host: process.env.REDIS_HOST,
            //port: process.env.REDIS_PORT
            host: "172.17.0.2",
            port: 6379
        });
        await connection.connect();

        return connection;
    }

    getClientConnectionInstance = async () => {
        if(this.clientConnectionInstance == null) {
            this.clientConnectionInstance = await this.getClientConnection();
        }

        return this.clientConnectionInstance;
    }

    getCache = async (key) => {
       const connection_instance = await this.getClientConnectionInstance();
       
       return await connection_instance.get(key);
    }

    setCache = async (key, value) => {
        const connection_instance = await this.getClientConnectionInstance();
        connection_instance.set(key, value);
    }
}

module.exports = {cacheHelper};