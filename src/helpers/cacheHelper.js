
class cacheHelper{
    constructor(createClientOb) {
      this.createClientOb = createClientOb;
      this.clientConnectionInstance = null;
      this.clientConnectionInstance = this.getClientConnectionInstance();
    }

    getClientConnection = async () => {       
        const url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
        const connection = await this.createClientOb({
            url
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