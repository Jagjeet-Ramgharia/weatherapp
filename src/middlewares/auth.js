const jwt = require('jsonwebtoken');
const Register = require('../models/register');


const auth = async (req,res,next)=>{
    try{

        const token = req.cookies.userCookie;
        const userVerification = jwt.verify(token, "mynameisjagjeetiamafullstackdeveloper")
        console.log(userVerification)
        const user = await Register.findOne({_id:userVerification._id})
        console.log(user);

        req.token = token;
        req.user = user;

        next()

    }catch(err){
        res.status(401).send(`error page${err}`);
    }
}

module.exports = auth