const User = require("../model/userModels");
const bcrypt = require("bcrypt");

var functions = {
    register: async function (req,res,next){
        try {
            const {username,email,password} = req.body;
            const usernameCheck = await User.findOne({username});
            if(usernameCheck){
                return res.json({ msg: "Username already exists", status:false});
            }
            const emailCheck = await User.findOne({email});
            if(emailCheck){
                return res.json({ msg: "Email already used", status:false});
            }
            const hashPassword= await bcrypt.hash(password,10);
            const user = await User.create({
                email,username,password:hashPassword
            });
            delete user.password
            return res.json({
                status:true,user
            })
        } catch (error) {
            next(error)
        } 
    },
    login: async function (req,res,next){
        try {
            const {username,password} = req.body;
            const user = await User.findOne({username});
            if(!user){
                return res.json({ msg: "Incorrect username or password.", status:false});
            }
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if(!isPasswordValid){
                return res.json({ msg: "Incorrect username or password.", status:false});
            }
            delete user.password
            return res.json({
                status:true,user
            })
        } catch (error) {
            next(error)
        }
    },
    setAvatar: async function (req,res,next){
        try {
            let userId= req.params.id;
            let avatarImage= req.body.image;
            let userData= await User.findByIdAndUpdate(userId,{
                isAvatarImageSet:true,
                avatarImage,
            },
            { new: true });
            
            return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage})
        } catch (error) {
            next(error)
        }
    },
    getAllUsers: async function (req,res,next){
        try {
            let users = await User.find({_id:{$ne: req.params.id}}).select([
                "email",
                "username",
                "avatarImage",
                "_id"
            ]);
            console.log(users)
            return res.json(users)
        } catch (error) {
            next(error)
        }
    }
}
 var helper = {}

module.exports =functions