import express from "express";
import {
    getAllWishlists,
    getWishlistById,
    createWishlist,
    updateWishlist,
    deleteWishlist,
} from "../controllers/wishlist.js";

const router = express.Router();

router.get("/wishlist/get-all", getAllWishlists);
router.get("/wishlist/get-id/:id", getWishlistById);
router.post("/wishlist/create", createWishlist);
router.put("/wishlist/update/", updateWishlist);
router.delete("/wishlist/delete/:id", deleteWishlist);

export default router;
