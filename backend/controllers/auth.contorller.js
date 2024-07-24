const jwt=require('jsonwebtoken');

require('dotenv').config();
const EMAIL=process.env.EMAIL;
const PASSWORD=process.env.PASSWORD;

//  If the email and password are correct, then return a token.
// jwt is stateless
const login=(req,res)=>{
    const {email,password}=req.body;
    
    if(email===EMAIL && password===PASSWORD){
        const token=jwt.sign({email},process.env.TOKEN_KEY,{
            expiresIn:'2h',
        });
        return res.status(200).json({
            statusCode: 200,
            msg: "Login successful",
            token,
        });
    }
    return res.status(401).json({
        statusCode:401,
        msg:"Invalid credentials",
    });
};

module.exports={
    login,
}