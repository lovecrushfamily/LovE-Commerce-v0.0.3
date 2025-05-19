import express from "express";
import {
    getAllDeliverys,
    getDeliveryById,
    createDelivery,
    updateDelivery,
    deleteDelivery,
} from "../controllers/delivery.js";

const router = express.Router();

router.get("/delivery/get-all", getAllDeliverys);
router.get("/delivery/get-id/:id", getDeliveryById);
router.post("/delivery/create", createDelivery);
router.put("/delivery/update/", updateDelivery);
router.delete("/delivery/delete/:id", deleteDelivery);

export default router;
