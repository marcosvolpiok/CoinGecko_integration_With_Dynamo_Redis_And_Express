class cartProductService {
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
        const existingUser = await this.customerRepository.findByUserName(req.body.username);
        
        if(existingUser.length > 0 && existingUser.Item.length !== 0){
            console.log(2)
            return {status: "USER_EXISTS", "message": "The User already exists"};
        }

        const hashPassword = await this.bcrypt.hash(req.body.password, 10);
        await this.customerRepository.add({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hashPassword,
            username: req.body.username,
        });

        return {status: 'Created'};
    }

    update = async (req, res) => {
        const customer=await this.customerRepository.update(req.body);
        
        return customer;
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

module.exports = cartProductService;