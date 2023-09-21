const User = require("../model/user");
const bcrypt = require('bcrypt');

async function loginUser(req, res) {
    try {
        const { Username, Password } = req.body;
        const user = await User.findOne({ Username });
        if (!user) {
            return res.status(201).json({ message: "User not avaliable" });
        }
        const isMatch = await bcrypt.compare(Password, user.Password);

        if(!isMatch){
            return res.status(401).json({message:"Unauthorized"})
        }

        return res.status(200).json({ message: "Authenticated" })

    }
    catch (err) {
        res.status(500).json({ message: "Internal Server error" });
    }
}




async function createUser(req, res) {
    const { Username, Password } = req.body;
    try {
        const user = await User.findOne({ Username });
        if (user) {
            return res.status(201).json({ message: "username  already exists" });
        };
        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new User({
            Username,
            Password: hashedPassword
        })
        await newUser.save();
        return res.status(200).json({ message: "New User Created" });

    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}








module.exports = {
    loginUser,
    createUser
}