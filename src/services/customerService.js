class customerService {
    constructor(customerRepository, bcrypt, loginHelper) {
        this.customerRepository=customerRepository;
        this.bcrypt = bcrypt;
        this.loginHelper = loginHelper;
    }
      
    listByIdUser = async (req, res) => {
        const customer=await this.customerRepository.listByIdUser(req.params.idUser);
        
        return customer;
    }

    add = async (req) => {
        console.log('service user name ', req.body)


        const existingUser = await this.customerRepository.findByUserName(req.body.username);

        if(existingUser.Item && Object.keys(existingUser.Item).length){
            return {status: "USER_EXISTS", "message": "The User already exists"};
        }

        const hashPassword = await this.bcrypt.hash(req.body.password, 10);
        await this.customerRepository.add({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hashPassword,
            username: req.body.username,
            favorite_fiat_coin: req.body.favorite_fiat_coin
        });

        return {status: 'Created'};
    }

    login = async (req, res) => {
        const existingUser = await this.customerRepository.findByUserName(req.body.username);

        let customerLoged;
        if(existingUser.Item){
            customerLoged = await this.loginHelper.verifyPassword(existingUser.Item, req);
        } else {
            customerLoged = {status: 'USER_DOESNT_EXIST', message: 'Usuario o contraseña incorrecto'};
        }

        return customerLoged;
    }
}

module.exports = customerService;