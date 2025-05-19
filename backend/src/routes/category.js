import express from "express";
import {
    getAllCategorys,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/category.js";

const router = express.Router();

router.get("/category/get-all", getAllCategorys);
router.get("/category/get-id/:id", getCategoryById);
router.post("/category/create", createCategory);
router.put("/category/update/", updateCategory);
router.delete("/category/delete/:id", deleteCategory);

export default router;
