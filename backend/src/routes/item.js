import express from "express";
import {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
} from "../controllers/item.js";

const router = express.Router();

router.get("/item/get-all", getAllItems);
router.get("/item/get-id/:id", getItemById);
router.post("/item/create", createItem);
router.put("/item/update/", updateItem);
router.delete("/item/delete/:id", deleteItem);

export default router;
