import express from "express";
import {
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount,
} from "../controllers/account.js";
//////////////////////////////////////////////////////////////////

const router = express.Router();

router.get("/account/get-all", getAllAccounts);
router.get("/account/get-id/:id", getAccountById);
router.post("/account/create", createAccount);
router.put("/account/update/", updateAccount);
router.delete("/account/delete/:id", deleteAccount);

export default router;










// ### Code test api
// GET http://localhost:3001/api/account/get-all


// ### Get an account by ID
// GET http://localhost:3001/api/account/get-id/1



// ### Create a new account
// POST http://localhost:3001/api/account/create
// Content-Type: application/json

// {
//   "user_name": "John Doe",
//   "email": "john.doe@example.com",
//   "password_": "securePassword123"
// }


// ### Update an account
// PUT http://localhost:3001/api/account/update
// Content-Type: application/json

// {
//   "account_id": "12",
//   "user_name": "John Doe Updated",
//   "email": "john.doe.updated@example.com"
// }

// ###


// ## Delete an account by ID
// DELETE http://localhost:3001/api/account/delete/13
