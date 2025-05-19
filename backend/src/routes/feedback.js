import express from "express";
import {
    getAllFeedbacks,
    getFeedbackById,
    createFeedback,
    updateFeedback,
    deleteFeedback,
} from "../controllers/feedback.js";

const router = express.Router();

router.get("/feedback/get-all", getAllFeedbacks);
router.get("/feedback/get-id/:id", getFeedbackById);
router.post("/feedback/create", createFeedback);
router.put("/feedback/update/", updateFeedback);
router.delete("/feedback/delete/:id", deleteFeedback);

export default router;
