import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

////////////////////////////////////////////////////////
import Account from "../models/account.js";
import bcrypt from "bcryptjs";
import { AccountSchema } from "../schemas/account.js";

//
export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.getAllAccounts();
        if (accounts.length === 0) {
            return res.status(404).send("No account founds!");
        }
        return res.status(200).json(accounts);
        // console.log(accounts);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

//
export const getAccountById = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await Account.getAccountById(id);
        if (!account) {
            return res.status(404).send("Account not exist!");
        }
        return res.status(200).json(account);
        // console.log(account[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

//
export const createAccount = async (req, res) => {
    try {
        //
        const { error } = await AccountSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        //
        if (await Account.isDuplicated(req.body.user_name)) {
            return res.status(400).send("Username already exists");
        }

        // req.body.password_ = "forever";
        req.body.password_ = await bcrypt.hash(req.body.password_, 16);

        const result = await Account.createAccount(req.body);
        return res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

//
export const updateAccount = async (req, res) => {
    try {
        //
        const { error } = await AccountSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

		// const { password_update } = req.params;
		// if (password_update) 
        // // // Optionally update password if needed
        // if (validatedData_v1.password_) {
        //     validatedData_v1.password_ = await bcrypt.hash(
        //         validatedData_v1.password_,
        //         10
        //     );
        //     delete validatedData_v1.password_;
        // }

        console.log("LoveYou");
        const affectedRows = await Account.updateAccount(req.body);
        if (affectedRows === 0) {
            return res.status(404).send("Not updated successfully!");
        }
        console.log(`${affectedRows} row affected`);
        return res.status(200).send("Account updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

//
export const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Account.deleteAccount(id);

        if (deleted === 0) {
            return res.status(404).send("Account not found!");
        }
        return res.status(200).send("Account deleted Successfully!!");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

////////////////////////////////////////////////////////////////////////////////////
export const VerifyEmail = async (req, res) => {};
