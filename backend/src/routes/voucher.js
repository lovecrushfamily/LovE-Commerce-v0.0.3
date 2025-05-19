import express from "express";
import {
    getAllVouchers,
    getVoucherById,
    createVoucher,
    updateVoucher,
    deleteVoucher,
} from "../controllers/voucher.js";

const router = express.Router();

router.get("/voucher/get-all", getAllVouchers);
router.get("/voucher/get-id/:id", getVoucherById);
router.post("/voucher/create", createVoucher);
router.put("/voucher/update/", updateVoucher);
router.delete("/voucher/delete/:id", deleteVoucher);

export default router;
