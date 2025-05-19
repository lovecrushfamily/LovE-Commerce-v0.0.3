import express from "express";
import accountRoute from "./account.js";
import categoryRoute from "./category.js";
import couponRoute from "./coupon.js";
import customerRoute from "./customer.js";
import deliveryRoute from "./delivery.js";
import feedbackRoute from "./feedback.js";
import itemRoute from "./item.js";
import orderRoute from "./order.js";
import productRoute from "./product.js";
import reviewRoute from "./review.js";
import shopRoute from "./shop.js";
import voucherRoute from "./voucher.js";
import wishlistRoute from "./wishlist.js";

const router = express.Router();

router.use(accountRoute);
router.use(categoryRoute);
router.use(couponRoute);
router.use(customerRoute);
router.use(deliveryRoute);
router.use(feedbackRoute);
router.use(itemRoute);
router.use(orderRoute);
router.use(productRoute);
router.use(reviewRoute);
router.use(shopRoute);
router.use(voucherRoute);
router.use(wishlistRoute);

export default router;
