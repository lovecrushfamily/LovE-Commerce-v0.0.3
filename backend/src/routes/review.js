import express from "express";
import {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
} from "../controllers/review.js";

const router = express.Router();

router.get("/review/get-all", getAllReviews);
router.get("/review/get-id/:id", getReviewById);
router.post("/review/create", createReview);
router.put("/review/update/", updateReview);
router.delete("/review/delete/:id", deleteReview);

export default router;
