const user = require('../Models/User')
const {setUser} = require('../service/auth')
const multer = require('multer')

/** set up for file upload */
const storage = multer.diskStorage({
    destination: (req,res,cb) => {
        return cb(null,"./upload")
    },
    filename: (req,file,cb) => {
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
    
    
})

const upload = multer({storage})


function showSignUp(req,res){
    return res.render('reg')
}
function showLogin(req,res){ 
    return res.render('login')
}


async function signUp(req,res){
    const {username,email,password} = req.body
    await user.create({
        name:username,
        email:email,
        password:password,
        image:req.file.filename,
    })
    return res.redirect("/showLogin")
}

async function login(req,res){
    const {email,password} = req.body
    const result = await user.findOne({email,password})
    
    if(!result){
       return res.render('login')
    }

   const token = setUser(result)
    res.cookie("uid",token)

    return res.redirect("/home")

}

/** LogOut */

async function logout(req,res) {
    res.clearCookie("uid");

    return res.redirect("/showLogin")
}



module.exports = {
    showSignUp,
    signUp,
    showLogin,
    login,
    upload,
    logout
}