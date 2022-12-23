const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try {
        if(req.headers.authorization!=undefined && req.headers.authorization && req.headers.authorization.split(" ").length>1){
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            res.userData = decoded;
        }
        next();
    } catch (error) {
        res.status(401).json({message : "Auth failed ", detail: error.message});
    }
}