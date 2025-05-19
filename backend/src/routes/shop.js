import express from "express";
import {
    getAllShops,
    getShopById,
    createShop,
    updateShop,
    deleteShop,
} from "../controllers/shop.js";

const router = express.Router();

router.get("/shop/get-all", getAllShops);
router.get("/shop/get-id/:id", getShopById);
router.post("/shop/create", createShop);
router.put("/shop/update/", updateShop);
router.delete("/shop/delete/:id", deleteShop);

export default router;
