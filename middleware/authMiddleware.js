const {getUser} = require('../service/auth') //for check user is available or not
async function checkUserlogin(req, res, next) {
    const userID = req.cookies?.uid;

    
    
    if(!userID){
        return res.send('id not found')
    }
    
    const user = getUser(userID)
    // console.log(user);
    
    if(!user){
        // return res.redirect('/showLogin')
        return res.send('user not found')
    }
    // console.log(user);
    
    req.user = user; //eplain what happend in this line
    next()

    
}

module.exports={
    checkUserlogin

}