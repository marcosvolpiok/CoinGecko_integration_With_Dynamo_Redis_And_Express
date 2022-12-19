const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyPassword = async (customer, req)=>{
    const result = await bcrypt.compare(req.body.password, customer.password);
    if(result){
        return getToken(customer);
    }else{
        return {status: 'LOGIN_WRONG', message: 'Password or mail wrong'};
    }
}


const getToken = (user) =>{
    const token = jwt.sign({
            mail: user.mail,
            idCustomer: user.id,
            idShop: user.id_shop
        },
        process.env.JWT_KEY,
        { expiresIn:"5256000h"}
    );
        
    return {
        message: "Auth successful",
        user: user,
        token : token
    };
    
}


module.exports = {verifyPassword, getToken};