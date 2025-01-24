const jwt = require('jsonwebtoken');
const key = '$skHan11'

function setUser(user) {
    return jwt.sign({
        _id : user._id,
        email : user.email,
        name : user.name,
        image : user.image,
    },key)

}

function getUser(token) {
    
    try {
        return jwt.verify(token,key)   
        
    } catch (error) {

        console.log(`varification failed ${error}`)
    }
    
}

module.exports={
    setUser,
    getUser
}