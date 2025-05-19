import express from "express";
import {
    getAllCoupons,
    getCouponById,
    createCoupon,
    updateCoupon,
    deleteCoupon,
} from "../controllers/coupon.js";

const router = express.Router();

router.get("/coupon/get-all", getAllCoupons);
router.get("/coupon/get-id/:id", getCouponById);
router.post("/coupon/create", createCoupon);
router.put("/coupon/update/", updateCoupon);
router.delete("/coupon/delete/:id", deleteCoupon);

export default router;
