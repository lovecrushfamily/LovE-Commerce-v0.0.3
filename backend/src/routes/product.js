import express from "express";
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.js";

const router = express.Router();

router.get("/product/get-all", getAllProducts);
router.get("/product/get-id/:id", getProductById);
router.post("/product/create", createProduct);
router.put("/product/update/", updateProduct);
router.delete("/product/delete/:id", deleteProduct);

export default router;
