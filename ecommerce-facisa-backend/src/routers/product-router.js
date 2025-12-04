import express from "express";
import productController from "../controllers/product-controller.js";

const router = express.Router();

router.route("/:id")
.delete(productController.delete)
.get(productController.get)
.put(productController.update);

router.route("/")
.get(productController.findAll)
.post(productController.create);

export default router;