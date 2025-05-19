import Account from "../models/account.js";
import { AccountSchema } from "../schemas/account.js";

// Get all account
export const getAllAccounts = async (req, res) => {
    try {
        const data = await Account.getAll();
        if (data.length === 0) {
            return res.status(404).send("No account found!");
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Get account by ID
export const getAccountById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Account.getById(id);
        if (!item) {
            return res.status(404).send("Account not exist!");
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Create new account
export const createAccount = async (req, res) => {
    try {
        //const { error } = await AccountSchema.validate(req.body);
        //if (error) {
        //    return res.status(400).send(error.details[0].message);
        //}
        const result = await Account.create(req.body);
        return res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Update existing account
export const updateAccount = async (req, res) => {
    try {
        //const { error } = await AccountSchema.validate(req.body);
        //if (error) {
        //   return res.status(400).send(error.details[0].message);
        //}
        const affectedRows = await Account.update(req.body);
        if (affectedRows === 0) {
            return res.status(404).send("Not updated successfully!");
        }
        return res.status(200).send("Account updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Delete account
export const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Account.delete(id);
        if (deleted === 0) {
            return res.status(404).send("Account not found!");
        }
        return res.status(200).send("Account deleted successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};
