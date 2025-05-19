import express from "express";
import {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from "../controllers/customer.js";

const router = express.Router();

router.get("/customer/get-all", getAllCustomers);
router.get("/customer/get-id/:id", getCustomerById);
router.post("/customer/create", createCustomer);
router.put("/customer/update/", updateCustomer);
router.delete("/customer/delete/:id", deleteCustomer);

export default router;
