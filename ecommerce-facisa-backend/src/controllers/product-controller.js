import productModel from "../models/product-model.js";

const controller = {
    delete: async function (req, res) {
        try{
            const result = await productModel.findOneAndDelete({_id: req.params.id});

            if (!result) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(204).json(result);
            
        } catch (err) {
            res.status(500).json({message: "Internal Server Error"});
        }  
    },

    get: async function (req, res) {
        try {
            const result = await productModel.findById(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({message: "Product not found"});
        }
    },

    update: async function (req, res) {
        try{
            const result = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

            if (!result) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(result);

        } catch (err) {
            res.status(500).json({message: "Internal Server Error"});
        }
       
    },

    create: async function (req, res) {

        try {
            const product = req.body;
            const result = await productModel.create(product);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    findAll: async function (req, res) {
        try {
            const result = await productModel.find({}, {__v: false});
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({message: "Internal Server Error"});
        }
    }
};

export default controller;