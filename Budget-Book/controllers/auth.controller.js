const bcrypt = require('bcrypt')
const userModels = require("../models/user.model")

require('dotenv').config()


exports.register = async (req, res, next)=>{
    // console.log("hello from controller");
    // console.log(req.body);
    // res.status(200).send({
    //     message: "ok"
    // })

    
    const {username, email, password} = req.body;
   
    try{
        const copyUsername = await userModels.findOne({username})
        if(copyUsername){
            return res.json({status : false, message : "Failed! Username already used"})
        }
        const copyEmail = await userModels.findOne({email})
        if(copyEmail){
            return res.json({status : false, message : "Failed! user with same email already exists"})
                
        }

    // 2. Insert the data in the "Users" collection in MongoDB
 
        const hashedPassword = bcrypt.hashSync(password, 8);
        const newUser = await userModels.create({
            username, 
            email,
            password: hashedPassword
        });
        // const newUser = new userModels(req.body);
        // await newUser.save();
        console.log("user created : ")
        console.log(newUser)
        
        
        // 3. return the response
        delete newUser.password
        return res.json({status : true, newUser})    // 201 : successfully created
    }
    catch(ex){
        next(ex)
    }

}




exports.login = async (req, res, next)=>{
    
    const {email, password} = req.body;
    try{
        const user = await userModels.findOne({email})
        if(!user){
            return res.json({status : false, message : "Email not found!"})
        }
        

        if(!bcrypt.compareSync(password, user.password)){
            return res.json({status : false, message : "Incorrect password!"})
        }

        console.log("login user found")
        console.log(user)
        
        // 3. return the response
        delete user.password
        return res.json({status : true, user})    // 201 : successfully created
    }
    catch(ex){
        next(ex)
    }

}
