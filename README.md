*Install and Run API*
```
docker build .
docker-compose up
```
Complete the .env and config/config.json file with the AWS API Key Id and the Access Key. You need this to run DynamoDB.

*Run bot*
Before using the API you need to run a bot wich'll fetch all the data from the CoinGecko API.
```
docker-compose run --service-ports coingecko_integration bash
```

*Using the API*
Use the Postman collection and environment you can see on the root of this project.