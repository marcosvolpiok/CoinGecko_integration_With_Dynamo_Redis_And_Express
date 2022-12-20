const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyPassword = async (customer, req)=>{
    const result = await bcrypt.compare(req.body.password, customer.password.S);
    if(result){
        return getToken(customer);
    }else{
        return {status: 'LOGIN_WRONG', message: 'Password or mail wrong'};
    }
}


const getToken = (user) =>{
    const token = jwt.sign({
            mail: user.username
        },
        process.env.JWT_KEY,
        { expiresIn:"5256000h"}
    );
        
    return {
        message: "Auth successful",
        user: user.username,
        token : token
    };
    
}


module.exports = {verifyPassword, getToken};