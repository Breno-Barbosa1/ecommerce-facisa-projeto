import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const controller = {
    delete: async function (req, res) {
        try{
            const result = await userModel.findOneAndDelete({email: req.params.email});

            if (!result) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(204).json(result);

        } catch (err) {
            res.status(500).json({message: "Internal Server Error"});
        }       
    },

    getOne: async function (req, res) {
        try {
            const result = await userModel.findOne({email: req.params.email}, {__v: false, _id: false});
            const user = result.toObject();
            res.status(200).json(user);}
        catch (err) {
            res.status(404).json({message: "User not found"});
        }  
    },

    update: async function (req, res) {
        try {
            const result = await userModel.findOneAndUpdate({email: req.params.email}, req.body, { new: true, runValidators: true });

            if (!result) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(result);

        } catch (err) {
            res.status(500).json({message: "Internal Server Error"});
        }       
    },

    create: async function (req, res) {
        try { 
        const user = req.body;
        const encryptedPassword = await bcrypt.hash(user.password, 10);
        user.password = encryptedPassword;
        const result = await userModel.create(user);
        res.status(201).json(result);
        } catch (err) {
            res.status(500).json({message: "Internal Server Error"});
        }
       
    },

    findAll: async function (req, res) {
        const result = await userModel.find({}, {__v: false, _id: false});
        res.status(200).json(result);
    },

    login: async function (req, res) {
    try {
        const result = await userModel.findOne({email: req.body.email}, {__v: false, _id: false});
        const user = result.toObject();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
}

export default controller;