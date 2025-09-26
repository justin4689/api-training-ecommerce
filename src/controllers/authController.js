
const User = require('../models/User');

const bcrypt = require('bcrypt');



exports.register = async (req , res) => {
    try {
    const { name , email , password } = req.body ;
    const userExists = await User.findOne({email});
    if (userExists) {
        return res.status(400).json({message : "User already exists"}) ;
    }

    hashPassword = await bcrypt.hash(password , 10);
        const newUser = new User({name , email , password : hashPassword});
        await newUser.save();
        res.status(201).json({message : "User created successfully"});

        
    } catch (error) {
        console.error("Error in user registration: ", error) ;
        res.status(500).json({message : "Server error"}) ;
        
    }

    
}


 exports.login = async (req , res) => {
    try {
        const { email , password } = req.body ;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message : "User not found"}) ;
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({message : "Invalid credentials"}) ;
        }
        const token = await user.generateToken();
        res.status(200).json({message : "Login successful" , token});
        
    } catch (error) {
        console.error("Error in user login: ", error) ;
        res.status(500).json({message : "Server error"}) ;
    }
}
