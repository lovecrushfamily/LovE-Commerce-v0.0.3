import express from "express";
import {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
} from "../controllers/order.js";

const router = express.Router();

router.get("/order/get-all", getAllOrders);
router.get("/order/get-id/:id", getOrderById);
router.post("/order/create", createOrder);
router.put("/order/update/", updateOrder);
router.delete("/order/delete/:id", deleteOrder);

export default router;
