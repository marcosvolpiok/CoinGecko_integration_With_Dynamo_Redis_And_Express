class cartProductService {
    constructor(customerRepository, bcrypt, loginHelper) {
        this.customerRepository=customerRepository;
        this.bcrypt = bcrypt;
        this.loginHelper = loginHelper;
    }
      
    list = async (req, res) => {
          const customer=await this.customerRepository.list(req);
          
          return customer;
    }

    listByIdUser = async (req, res) => {
        const customer=await this.customerRepository.listByIdUser(req.params.idUser);
        
        return customer;
    }

    add = async (req) => {
        const existingUser = await this.customerRepository.find({where: {mail:req.body.mail}})
        if(existingUser.length !== 0){
            return {status: "USER_EXISTS", "message": "The User exists"};
        }
        const hashPassword = await this.bcrypt.hash(req.body.password, 10);
        const customer=await this.customerRepository.add({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hashPassword,
            mail: req.body.mail,
            address: req.body.address,
            phone: req.body.phone,
            id_shop: req.body.id_shop
        });
        
        return customer;
    }

    update = async (req, res) => {
        const customer=await this.customerRepository.update(req.body);
        
        return customer;
    }

    login = async (req, res) => {
        const customer = await this.customerRepository.findOne({where: {mail: req.body.mail}});
        let customerLoged;
        if(customer){
            customerLoged = await this.loginHelper.verifyPassword(customer, req);
        } else {
            customerLoged = {status: 'USER_DOESNT_EXIST', message: 'Usuario o contraseña incorrecto'};
        }
        return customerLoged;
    }
}

module.exports = cartProductService;