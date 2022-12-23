class cotizationService {
    constructor(cotizationRepository) {
        this.cotizationRepository=cotizationRepository;
    }
      
    list = async () => {
        const cotization = await this.cotizationRepository.listAll();

        return cotization;
    }

    add = async (req, res) => {
        const existingCotizationUser = await this.cotizationRepository.getCotizationByUserAndFiatCoinAndCoinCode(res.userData.username, req.body.coinCode);
        
        if(existingCotizationUser.Item && Object.keys(existingCotizationUser.Item).length) {
            return {status: "COTIZATION_EXISTS", "message": "The Cotizaion already exists on this user"};
        }

        const cotizationUser = await this.cotizationRepository.add({
            userName: res.userData.username,
            coinCode: req.body.coinCode
        });

        return {status: 'Created'};
    }

    listByUser = async (req, res) => {
        const cotizationsUser = await this.cotizationRepository.getCotizationByUser(res.userData.username);
        let result = [];

        let p = Promise.resolve();
        cotizationsUser.Items.forEach(async (cotizationUser) => {
            p = p.then(async () => {
                result.push({[cotizationUser.coinCode.S]: await this.cotizationRepository.getCoinPrice(cotizationUser.coinCode.S)})
            });
        })
        await p;

        //sort
        const resultOrdered = result.sort((a, b)=>{
            const favoriteFiatCoin = 'usd';
            
            const cotizationA = a[Object.keys(a)].filter((coinCotization) => Object.keys(coinCotization) == favoriteFiatCoin);
            const cotizationB = b[Object.keys(b)].filter((coinCotization) => Object.keys(coinCotization) == favoriteFiatCoin);
        
            if(req.params.order.toUpperCase() == 'ASC') {
                return cotizationA[0][favoriteFiatCoin].current_price - cotizationB[0][favoriteFiatCoin].current_price;
            } else if (req.params.order.toUpperCase() == 'DESC') {
                return cotizationB[0][favoriteFiatCoin].current_price - cotizationA[0][favoriteFiatCoin].current_price;
            } else {
                throw new Error('Order parameter is wrong');
            }
        })


        //Limit


        return resultOrdered;
    }
}

module.exports = cotizationService;