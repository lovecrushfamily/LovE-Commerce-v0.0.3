import express from "express";
import {
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount,
} from "../controllers/account.js";

const router = express.Router();

router.get("/account/get-all", getAllAccounts);
router.get("/account/get-id/:id", getAccountById);
router.post("/account/create", createAccount);
router.put("/account/update/", updateAccount);
router.delete("/account/delete/:id", deleteAccount);

export default router;
