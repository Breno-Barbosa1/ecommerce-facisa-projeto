import express from 'express';
import dotenv from 'dotenv';
import userRouter from './src/routers/user-router.js';
import productRouter from './src/routers/product-router.js';
import mongoose from 'mongoose';
import cors from 'cors';
import middleware from './src/auth-middleware.js';

dotenv.config();

const app = express();
mongoose.connect("mongodb://localhost:27017/ecommerce-facisa");
app.use(express.json());
app.use(cors());

app.use(middleware);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen(3000, () => console.log("Server running on port 3000"));